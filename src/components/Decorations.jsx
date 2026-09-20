// Decorative vector shapes used across the hero and process sections.
// Reproduced as inline SVG (rather than rasterized) so they stay crisp at
// any size and can inherit color via currentColor where useful.

export function StarBurst({ className = "" }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#FF4AD8"
        d="M78 2c3 27 8 45 15 54 10 5 27 9 51 12-24 4-41 9-51 15-7 9-12 26-15 53-3-27-8-44-16-53-9-6-26-11-50-15 24-3 41-7 50-12 8-9 13-27 16-54Z"
      />
    </svg>
  );
}

export function CircleOutline({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="160" cy="160" r="158" stroke="#202020" strokeWidth="1" />
    </svg>
  );
}

export function Triangle({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 110"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fill="#FFBB00" d="M32 0 118 62 0 110 32 0Z" />
    </svg>
  );
}

export function Blob({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#42D392"
        d="M46.8 4.3c5.6-2 11.7 1.4 13.3 7.1l14.6 51.1c3.5 12.2-6 24.2-18.7 23.5L13.4 83c-13.2-.7-20.7-15.6-13.3-26.5L34.3 15C37.4 10.4 41.7 6.1 46.8 4.3Z"
        transform="translate(4 4) scale(0.95)"
      />
    </svg>
  );
}

export function ArrowDown({ className = "" }) {
  return (
    <svg
      viewBox="0 0 16 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 1v16m0 0 6-6M8 17l-6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({ direction = "right", className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M4 12h16m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

