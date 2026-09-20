import { useState } from "react";
import BookingDialog from "./BookingDialog";
import { StarBurst } from "./Decorations";
import Reveal from "./Reveal";

export default function CTASection() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <footer id="contact" className="contact-footer" aria-label="Contact and copyright">
      <Reveal>
        <div className="contact-invitation">
          <div className="footer-geometry" aria-hidden="true">
            <svg className="footer-quarter" viewBox="0 0 90 90"><path d="M0 90V0a90 90 0 0 1 90 90Z" fill="#42d392" /></svg>
            <svg className="footer-diamond" viewBox="0 0 60 60" fill="none"><path d="M30 4 56 30 30 56 4 30Z" stroke="#ff4ad8" strokeWidth="1.5" /></svg>
          </div>
          <div className="contact-copy">
            <p className="eyebrow">Let's make something good</p>
            <h2>Your idea.<br />My next project<span>.</span></h2>
            <p className="contact-description">Let’s schedule a 15-minute call to kickstart it!</p>
          </div>
          <div className="contact-booking">
            <StarBurst className="contact-star" />

            <button type="button" onClick={() => setBookingOpen(true)} className="contact-book-button">Book 1:1 Call <span aria-hidden="true">↗</span></button>
          </div>
          <p className="contact-copyright">© {new Date().getFullYear()} Rehab E. All rights reserved.</p>
        </div>
      </Reveal>
      {bookingOpen && <BookingDialog onClose={() => setBookingOpen(false)} />}
    </footer>
  );
}
