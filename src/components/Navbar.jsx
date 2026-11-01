// src/components/Navbar.jsx

function Flame() {
  return (
    <svg
      className="h-auto w-[clamp(28px,3.5cqw,64px)] flex-none"
      viewBox="0 0 56 68"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="ember-flame"
          x1="0"
          y1="1"
          x2="0"
          y2="0"
        >
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

export default function Navbar() {
  return (
    // src/components/Navbar.jsx

<header className="relative flex min-h-[30px] items-center justify-between gap-4 ">
      <a
        href="#top"
        aria-label="Ember home"
        className="flex items-center gap-[clamp(8px,1cqw,18px)]"
      >
        <Flame />

        <b className="text-[clamp(20px,2.35cqw,42px)] font-extrabold leading-none tracking-[.2em]">
          EMBER
          <i className="not-italic text-[#FF6A0D]">.</i>
        </b>
      </a>

      <nav
        aria-label="Main"
        className="absolute left-1/2 hidden -translate-x-1/2 gap-[clamp(24px,4.7cqw,90px)] text-[clamp(14px,1.3cqw,24px)] font-medium md:flex"
      >
        <a
          href="#menu"
          aria-current="page"
          className="relative py-[.6em] transition-colors hover:text-[#FF6A0D] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#FF6A0D]"
        >
          Menu
        </a>

        <a
          href="#story"
          className="py-[.6em] transition-colors hover:text-[#FF6A0D]"
        >
          Our Story
        </a>

        <a
          href="#contact"
          className="py-[.6em] transition-colors hover:text-[#FF6A0D]"
        >
          Contact
        </a>
      </nav>

      <a
        href="#order"
        className="inline-flex items-center justify-center gap-[.55em] whitespace-nowrap rounded-full border-[1.5px] border-[#FF6A0D] px-[clamp(18px,1.9cqw,34px)] py-[clamp(10px,1.1cqw,18px)] text-[clamp(13px,1.15cqw,21px)] font-medium leading-none text-[#FF6A0D] transition hover:-translate-y-0.5 hover:bg-[#FF6A0D] hover:text-[#140a04]"
      >
        Order Now

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
      </a>
    </header>
  );
}