import { useState } from "react";

function Arrow() {
  return (
    <svg
      className="h-[1.05em] w-[1.05em] flex-none"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}

function Flame() {
  return (
    <svg
      className="h-auto w-[clamp(28px,3.5cqw,64px)] flex-none"
      viewBox="0 0 56 68"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ember-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FF5A00" />
          <stop offset="1" stopColor="#FFA34A" />
        </linearGradient>
      </defs>

      <path
        d="M30 2c2 11-4 15-9 22-4 5-6 10-5 16 0-5 3-8 6-10-1 6 2 9 5 11 4 2 7-1 7-5 0-3-2-5-2-8 6 4 11 10 10 18-1 9-8 18-18 18C12 64 3 56 3 44c0-8 4-13 9-19 0 4 2 6 4 7C14 20 22 10 30 2z"
        fill="url(#ember-flame)"
      />

      <path
        d="M29 66c6-1 10-6 10-11 0-5-4-8-7-12 1 5-3 7-5 9-2-3-2-6-1-9-4 3-8 7-8 12 0 6 5 11 11 11z"
        fill="#140A04"
        opacity=".28"
      />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {isOpen ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-white/5 bg-[#140A04]/95 px-4 py-4 backdrop-blur-md sm:px-6">
      <a
        href="#top"
        aria-label="Ember home"
        className="flex shrink-0 items-center gap-[clamp(8px,1cqw,18px)]"
      >
        <Flame />

        <b className="text-[clamp(20px,2.35cqw,42px)] font-extrabold leading-none tracking-[.2em]">
          EMBER<i className="not-italic text-[#FF6A0D]">.</i>
        </b>
      </a>

      {/* Desktop navigation */}
      <nav
        aria-label="Main"
        className="hidden flex-1 items-center justify-center gap-[clamp(24px,4.7cqw,90px)] text-[clamp(14px,1.3cqw,24px)] font-medium md:flex"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="py-[.6em] transition-colors hover:text-[#FF6A0D]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Desktop order button */}
      <a
        href="#order"
        className="btn-17 hidden shrink-0 items-center justify-center gap-1.5 px-4 py-2 text-xs md:inline-flex md:px-5 md:py-2.5 md:text-sm"
      >
        <span className="text-container">
          <span className="text">Order Now</span>
        </span>

        <span className="text-container">
          <span className="text">
            <Arrow />
          </span>
        </span>
      </a>

      {/* Mobile controls */}
      <div className="flex shrink-0 items-center gap-3 md:hidden">
        <a
          href="#order"
          className="btn-17 inline-flex shrink-0 items-center justify-center gap-1.5 px-4 py-3 text-xs"
        >
          <span className="text-container">
            <span className="text">Order</span>
          </span>

          <span className="text-container">
            <span className="text">
              <Arrow />
            </span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#FF6A0D] hover:text-[#FF6A0D]"
        >
          <MenuIcon isOpen={isOpen} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute right-4 top-full z-50 flex w-[35%] flex-col gap-1 rounded-2xl border border-white/10 bg-[#140A04] p-3 shadow-xl md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5 hover:text-[#FF6A0D]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}