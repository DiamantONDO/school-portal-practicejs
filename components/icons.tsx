import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  switch (name) {
    case "overview":
    case "home":
      return (
        <svg {...base} {...props}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9v11h14V9" />
        </svg>
      );
      case "enrollments":
      return (
        <svg {...base} {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="m17 11 2 2 4-4" />
        </svg>
      );
    case "messages":
      return (
        <svg {...base} {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "notifications":
      return (
        <svg {...base} {...props}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a1.9 1.9 0 0 1-3.4 0" />
        </svg>
      );
    case "profile":
      return (
        <svg {...base} {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "classes":
    case "book":
      return (
        <svg {...base} {...props}>
          <path d="M4 5a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v13H6a2 2 0 0 0-2 2z" />
          <path d="M18 17H6a2 2 0 0 0-2 2" />
        </svg>
      );
    case "live":
      return (
        <svg {...base} {...props}>
          <rect x="2" y="6" width="13" height="12" rx="2" />
          <path d="m22 8-5 4 5 4z" />
        </svg>
      );
    case "assignments":
      return (
        <svg {...base} {...props}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3h6v1" />
          <path d="M9 10h6M9 14h4" />
        </svg>
      );
    case "quizzes":
      return (
        <svg {...base} {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "people":
      return (
        <svg {...base} {...props}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.7" />
        </svg>
      );
      case "building":
case "institution":
case "school":
  return (
    <svg {...base} {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="16" />
      <line x1="15" y1="22" x2="15" y2="16" />
      <line x1="9" y1="16" x2="15" y2="16" />
      <path d="M8 6h2v2H8zM14 6h2v2h-2zM8 11h2v2H8zM14 11h2v2h-2z" />
    </svg>
  );

      case "calendar":
case "schedule":
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

      case "email":
    return (
      <svg 
        {...base} 
        {...props} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="gray"
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
    case "announcements":
      return (
        <svg {...base} {...props}>
          <path d="M3 11v2a1 1 0 0 0 1 1h3l4 4V6L7 10H4a1 1 0 0 0-1 1z" />
          <path d="M16 8a5 5 0 0 1 0 8" />
        </svg>
      );
    case "addUser":
      return (
        <svg {...base} {...props}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 11-3.3" />
          <path d="M17 11v6M14 14h6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...base} {...props}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case "chevronLeft":
      return (
        <svg {...base} {...props}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...base} {...props}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    case "logout":
      return (
        <svg {...base} {...props}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      );
      case "home":
  return (
    <svg {...base} {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
  case "help":
  return (
    <svg {...base} {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

case "students":
case "users":
  return (
    <svg {...base} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  case "settings":
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
    default:
      return (
        <svg {...base} {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
