
import { useState } from "react";

const LAYERS = [
  {
    src: "/layers/bottombun.webp",
    i: 0,
    fd: 7.5,
    fl: 0,
    pos: {
      left: "18.676%",
      top: "77.16%",
      width: "66.324%",
      height: "16.296%",
    },
  },
  {
    src: "/layers/meat.webp",
    i: 1,
    fd: 8,
    fl: 0.7,
    pos: {
      left: "16.912%",
      top: "50.494%",
      width: "72.353%",
      height: "23.21%",
    },
  },
  {
    src: "/layers/lettuce.webp",
    i: 2,
    fd: 6.6,
    fl: 1.3,
    pos: {
      left: "8.235%",
      top: "39.383%",
      width: "81.618%",
      height: "18.642%",
    },
  },
  {
    src: "/layers/veggies.webp",
    i: 3,
    fd: 6.6,
    fl: 1.1,
    pos: {
      left: "21.176%",
      top: "23.58%",
      width: "65.882%",
      height: "22.84%",
    },
  },
  {
    src: "/layers/topbun.webp",
    i: 4,
    fd: 8.4,
    fl: 0.2,
    pos: {
      left: "21.324%",
      top: "2.963%",
      width: "64.118%",
      height: "23.951%",
    },
  },
  {
    src: "/layers/particles.webp",
    i: 5,
    fd: 9,
    fl: 0.4,
    pos: {
      left: "0.882%",
      top: "0.617%",
      width: "97.059%",
      height: "73.086%",
    },
    soft: true,
  },
];

const EMBERS = [
  { x: "57%", y: "63%", s: ".5cqw", dx: "1.5cqw", t: "7s", d: "0s" },
  { x: "63%", y: "80%", s: ".4cqw", dx: "-1cqw", t: "9s", d: "1.2s" },
  { x: "79%", y: "84%", s: ".55cqw", dx: "2cqw", t: "8s", d: "2.1s" },
  { x: "88%", y: "72%", s: ".4cqw", dx: "-1.6cqw", t: "10s", d: ".6s" },
  { x: "93%", y: "56%", s: ".45cqw", dx: "1cqw", t: "7.5s", d: "3.2s" },
  { x: "67%", y: "88%", s: ".35cqw", dx: "1.2cqw", t: "8.5s", d: "4s" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,700;0,800;1,800&display=swap');

.ember-hero {
  font-family: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
}

@keyframes ember-rise {
  from {
    opacity: 0;
    transform: translateY(-5.5cqw) scale(.97);
    filter: blur(7px);
  }
  60% {
    opacity: 1;
    filter: blur(0);
  }
  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

@keyframes ember-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ember-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-.55cqw); }
}

@keyframes ember-spark {
  0% {
    opacity: 0;
    transform: translate(0,0);
  }
  18% { opacity: .85; }
  100% {
    opacity: 0;
    transform: translate(var(--dx,2cqw), -12cqw);
  }
}

@keyframes ember-drift {
  from { transform: translate3d(-1.5%,0,0); }
  to { transform: translate3d(1.5%,-1%,0); }
}

.ember-layer {
  animation: ember-rise .7s cubic-bezier(.2,.8,.2,1) both;
  animation-delay: calc(.25s + var(--i) * .2s);
}

.ember-layer.is-soft {
  animation: ember-fade 1s ease both;
  animation-delay: 1.4s;
}

.ember-layer img {
  animation: ember-float var(--fd,7s) ease-in-out infinite;
  animation-delay: var(--fl,0s);
}

.ember-spark {
  animation: ember-spark var(--t,8s) ease-in infinite;
  animation-delay: calc(2s + var(--d,0s));
}

.ember-smoke {
  animation: ember-drift 26s ease-in-out infinite alternate;
}

@media (max-width: 859px) {
  @keyframes ember-rise {
    from {
      opacity: 0;
      transform: translateY(-28px) scale(.97);
      filter: blur(6px);
    }
    60% {
      opacity: 1;
      filter: blur(0);
    }
    to {
      opacity: 1;
      transform: none;
      filter: blur(0);
    }
  }

  @keyframes ember-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .ember-layer,
  .ember-layer img,
  .ember-spark,
  .ember-smoke {
    animation: none !important;
  }
}
`;

function Arrow({ className = "" }) {
  return (
    <svg
      className={`h-[1.05em] w-[1.05em] flex-none ${className}`}
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

export default function Hero() {
  const [run, setRun] = useState(0);

  return (
    <>
      <style>{CSS}</style>

      <section
        id="top"
        className="ember-hero relative overflow-hidden bg-[#070504] [container-type:inline-size] max-md:flex max-md:flex-col max-md:pb-10 md:aspect-[1672/941]"
      >
        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <span
            className="ember-smoke absolute -inset-[10%] block opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 28% 24% at 36% 44%, rgba(255,255,255,.055), transparent 70%), radial-gradient(ellipse 22% 20% at 52% 72%, rgba(255,255,255,.045), transparent 70%), radial-gradient(ellipse 18% 26% at 93% 38%, rgba(255,255,255,.05), transparent 70%), radial-gradient(ellipse 24% 18% at 58% 22%, rgba(255,255,255,.035), transparent 70%)",
            }}
          />

          <span
            className="absolute inset-0 block max-md:hidden"
            style={{
              background:
                "radial-gradient(ellipse 30% 14% at 71.3% 92.5%, rgba(255,150,50,.95) 0%, rgba(255,100,10,.45) 40%, transparent 72%), radial-gradient(ellipse 58% 32% at 71.3% 100%, rgba(255,90,0,.4), transparent 70%), radial-gradient(ellipse 38% 55% at 70% 58%, rgba(255,106,13,.08), transparent 70%)",
            }}
          />

          <span
            className="absolute inset-0 block md:hidden"
            style={{
              background:
                "radial-gradient(ellipse 80% 20% at 50% 100%, rgba(255,130,30,.7), transparent 72%), radial-gradient(ellipse 70% 30% at 50% 78%, rgba(255,106,13,.12), transparent 70%)",
            }}
          />

          <span
            className="absolute inset-x-0 bottom-0 block h-[7.5%] border-t border-[rgba(255,170,80,.28)] max-md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,150,60,.38) 0, rgba(34,18,9,.96) 9%, #050302 100%)",
            }}
          />

          <span
            className="absolute left-[97%] top-[73.5%] block aspect-square w-[4.6cqw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[3px] max-md:hidden"
            style={{
              background:
                "radial-gradient(circle, rgba(255,130,20,.95) 0 22%, rgba(255,100,10,.35) 50%, transparent 72%)",
            }}
          />

          <span className="absolute inset-x-0 top-[6.46cqw] block h-px bg-white/10 max-md:top-16" />
        </div>

        {/* Ember particles */}
        {EMBERS.map((e, n) => (
          <span
            key={`${run}-${n}`}
            aria-hidden="true"
            className="ember-spark absolute z-[1] aspect-square rounded-full opacity-[.55] max-md:hidden"
            style={{
              left: e.x,
              top: e.y,
              width: e.s,
              "--dx": e.dx,
              "--t": e.t,
              "--d": e.d,
              background:
                "radial-gradient(circle,#ffb36b,#ff6a0d 60%,transparent 72%)",
              boxShadow: "0 0 .8cqw rgba(255,106,13,.8)",
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-[2] w-full px-[max(16px,5.5cqw)] max-md:px-4">
          <div className="relative flex h-[6.46cqw] min-h-16 items-center justify-between gap-4">
            <div className="flex-1" />
            <div className="flex-1" />
          </div>

          <div className="mt-[8.6cqw] max-w-[54cqw] max-md:mt-9 max-md:max-w-none">
            <p className="mb-[1.5cqw] flex items-center gap-[1.6cqw] text-[clamp(11px,1.05cqw,19px)] font-extrabold tracking-[.3em] text-[#FF6A0D] after:h-px after:w-[12.5cqw] after:bg-gradient-to-r after:from-[rgba(255,106,13,.55)] after:to-transparent max-md:mb-3.5 max-md:gap-3 max-md:text-[11px] max-md:after:w-16">
              BOLD FLAVORS. REAL FIRE.
            </p>

            <h1 className="m-0 text-[clamp(44px,7.25cqw,140px)] font-extrabold italic leading-[.9] tracking-[-.035em] [text-wrap:balance] max-md:text-[clamp(46px,15vw,84px)]">
              Made for the{" "}
              <span className="block text-[#FF6A0D]">
                Hungry.
              </span>
            </h1>

            <p className="mt-[1.9cqw] max-w-[24em] text-[clamp(15px,1.45cqw,26px)] leading-[1.42] text-[#B7B0A9] max-md:mt-4 max-md:text-base">
              Big burgers, bold flavors, and the kind of food that brings people together.
            </p>

            <div className="mt-[2.9cqw] flex flex-wrap gap-[1.2cqw] max-md:mt-6 max-md:gap-3">
              <a
                href="#menu"
                className="inline-flex h-[clamp(48px,4cqw,72px)] items-center justify-center gap-[.55em] whitespace-nowrap rounded-full bg-[#FF6A0D] px-[clamp(22px,2.6cqw,48px)] text-[clamp(14px,1.3cqw,24px)] font-bold leading-none text-[#170b04] transition hover:-translate-y-0.5 hover:bg-[#ff8133]"
              >
                Explore Menu <Arrow />
              </a>

              <a
                href="#story"
                className="inline-flex h-[clamp(48px,4cqw,72px)] items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-white/40 px-[clamp(22px,2.6cqw,48px)] text-[clamp(14px,1.3cqw,24px)] font-bold leading-none transition hover:-translate-y-0.5 hover:border-[#FF6A0D] hover:text-[#FF6A0D]"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>

        {/* Burger */}
        <div
          key={run}
          role="img"
          aria-label="An exploded cheeseburger"
          className="relative z-[1] aspect-[680/810] w-[40.67cqw] md:absolute md:right-[9.09cqw] md:top-[5.38cqw] max-md:mx-auto max-md:mt-7 max-md:w-[min(440px,calc(100%-32px))]"
        >
          {LAYERS.map((l) => (
            <div
              key={l.src}
              className={`ember-layer absolute ${l.soft ? "is-soft pointer-events-none" : ""}`}
              style={{
                ...l.pos,
                "--i": l.i,
              }}
            >
              <img
                src={l.src}
                alt=""
                decoding="async"
                draggable={false}
                className="block h-full w-full select-none"
                style={{
                  "--fd": `${l.fd}s`,
                  "--fl": `${l.fl}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Replay */}
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="absolute bottom-[2.1cqw] right-[max(16px,5.5cqw)] z-[3] inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent px-0.5 py-1.5 text-[clamp(11px,1cqw,17px)] font-medium text-[#B7B0A9] transition-colors hover:text-[#FF6A0D] max-md:static max-md:mx-auto max-md:mt-[18px] max-md:text-[13px]"
        >
          <Arrow />
          Replay
        </button>
      </section>
    </>
  );
}
