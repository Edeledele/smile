export default function CategoryIcon({ icon, active }) {
  const strokeColor = active ? "#ffffff" : "#2d231b";
  const fillColor = active ? "#ffffff" : "none";

  switch (icon) {
    case "plate":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12 2C8.69 2 6 4.69 6 8h12c0-3.31-2.69-6-6-6zm-8 8v2h16v-2H4zm1 4c0 3.31 3.13 6 7 6s7-2.69 7-6H5z" opacity="0.9" />
          <path d="M12 2a1 1 0 0 1 1 1v1h-2V3a1 1 0 0 1 1-1z" />
          <path d="M3 13a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2H3z" />
        </svg>
      );
    case "bowl":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11h16a8 8 0 0 1-16 0z"></path>
          <path d="M8 19h8"></path>
          <path d="M8 6c0-1.5 1-2.5 1-2.5"></path>
          <path d="M12 6c0-1.5 1-2.5 1-2.5"></path>
          <path d="M16 6c0-1.5 1-2.5 1-2.5"></path>
        </svg>
      );
    case "chicken":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="15.5" cy="8.5" r="5.5"></circle>
          <path d="M11 13l-6 6a2 2 0 1 1-2.83-2.83l6-6"></path>
          <circle cx="3" cy="20" r="1.5" fill="currentColor"></circle>
          <circle cx="5" cy="22" r="1.5" fill="currentColor"></circle>
        </svg>
      );
    case "beef":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="8" width="14" height="9" rx="2"></rect>
          <path d="M5 11l-2-2"></path>
          <path d="M19 11l2-2"></path>
          <path d="M7 17v4"></path>
          <path d="M10 17v4"></path>
          <path d="M14 17v4"></path>
          <path d="M17 17v4"></path>
          <circle cx="9" cy="11" r="1" fill="currentColor"></circle>
          <circle cx="15" cy="11" r="1" fill="currentColor"></circle>
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 16-9 17z"></path>
          <path d="M11 20c0-5 3-8 9-11"></path>
        </svg>
      );
    case "fish":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16s5.5-8 15-4c0 0-4-6.5 5-9-1.5 5.5-1.5 8.5 0 14-9-2.5-5 9-5 9s-9.5 4-15-10z"></path>
          <circle cx="16" cy="11" r="1" fill="currentColor"></circle>
        </svg>
      );
    case "drink":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7l1.5 13a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8L18 7H6z"></path>
          <path d="M5 7h14"></path>
          <path d="M12 2v5"></path>
          <line x1="10" y1="2" x2="14" y2="2"></line>
        </svg>
      );
    default:
      return null;
  }
}
