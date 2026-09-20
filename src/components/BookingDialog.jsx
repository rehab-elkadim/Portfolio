import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { contact } from "../data/contact";

let widgetPromise;
function loadCalendly() {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (widgetPromise) return widgetPromise;
  widgetPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    const timeout = setTimeout(() => fail(), 15000);
    const fail = () => {
      clearTimeout(timeout);
      script.remove();
      widgetPromise = undefined;
      reject(new Error("Scheduling could not load."));
    };
    script.onerror = fail;
    script.onload = () => {
      clearTimeout(timeout);
      if (window.Calendly) resolve(window.Calendly);
      else fail();
    };
    document.head.appendChild(script);
  });
  return widgetPromise;
}

export default function BookingDialog({ onClose }) {
  const dialog = useRef(null);
  const container = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(Boolean(contact.bookingUrl));

  useEffect(() => {
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!contact.bookingUrl) return;
    let cancelled = false;
    loadCalendly().then((Calendly) => {
      if (cancelled) return;
      Calendly.initInlineWidget({
        url: contact.bookingUrl,
        parentElement: container.current,
      });
      setLoading(false);
    }).catch(() => {
      if (!cancelled) { setLoading(false); setError(true); }
    });
    return () => { cancelled = true; };
  }, []);

  return createPortal(
    <dialog ref={dialog} className="booking-dialog" aria-labelledby="booking-title"
      onCancel={onClose} onClick={(event) => { if (event.target === dialog.current) onClose(); }}>
      <div className="booking-panel">
        <header className="booking-header">
          <div><p className="eyebrow">Let's make something good</p><h2 id="booking-title">Book a 15-minute call</h2></div>
          <button type="button" onClick={onClose} aria-label="Close booking" autoFocus>×</button>
        </header>
        {contact.bookingUrl ? <>
          {loading && <p className="booking-message" role="status">Loading available times…</p>}
          {error && <div className="booking-message" role="alert"><p>The calendar couldn't load. You can try the booking page directly.</p><a className="text-link" href={contact.bookingUrl} target="_blank" rel="noreferrer">Open Calendly ↗</a></div>}
          <div ref={container} className="booking-calendar" hidden={error} />
        </> : <div className="booking-message"><p>Online scheduling is coming soon. Email me to arrange a 15-minute call.</p><a className="text-link" href={"mailto:" + contact.email + "?subject=15-minute%20intro%20call"}>{contact.email}</a></div>}
      </div>
    </dialog>,
    document.body
  );
}
