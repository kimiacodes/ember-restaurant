import { useEffect, useRef, useState } from "react";

/*
  EMBER Burger Hero
  React + Tailwind CSS
  Images: public/layers/
*/

/* ---------- Fire + smoke background (WebGL) ---------- */

function emberStartFire(canvas) {
  var gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
  });

  if (!gl) return null;

  var VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

  var FS = [
    "precision mediump float;",
    "uniform vec2 uRes;uniform float uTime;uniform float uBoost;uniform float uMobile;",
    "float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",
    "float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);",
    " float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));",
    " return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}",
    "float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);",
    " for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}",
    "void main(){",
    " vec2 uv=gl_FragCoord.xy/uRes;float asp=uRes.x/uRes.y;",
    " vec2 p=vec2(uv.x*asp,uv.y);float t=uTime;",
    " float cx=mix(.71,.5,uMobile);",
    " float env=mix(smoothstep(.18,.62,uv.x),.55+.45*exp(-pow((uv.x-.5)/.42,2.)),uMobile);",
    " vec3 col=vec3(.028,.019,.014);",
    " vec2 q=vec2(fbm(p*1.3+vec2(0.,t*.02)),fbm(p*1.3+vec2(5.2,1.3)-t*.015));",
    " vec2 r=vec2(fbm(p*1.8+3.*q+vec2(1.7,9.2)+t*.03),fbm(p*1.8+3.*q+vec2(8.3,2.8)-t*.02));",
    " float s=fbm(p*1.5+3.5*r+vec2(0.,-t*.04));",
    " float smoke=smoothstep(.30,.80,s);",
    " float lit=pow(1.-uv.y,2.2)*mix(smoothstep(.1,.9,uv.x),1.,uMobile);",
    " vec3 sc=mix(vec3(.30,.27,.25),vec3(.9,.4,.12),clamp(lit*1.7,0.,1.));",
    " float sa=smoke*(.20+.42*lit);",
    " sa*=mix(.7,1.,smoothstep(.15,.6,uv.x));",
    " col+=sc*sa;",
    "float wob=(fbm(vec2(uv.y*2.6,t*.18))-.5)*.10;",
    "float pw=.09+.13*clamp(uv.y-.3,0.,.6);",
    "float px=(uv.x-cx-wob)*mix(1.,.45,uMobile);",
    "float colm=exp(-pow(px/pw,2.));",
    "float sn=fbm(vec2(uv.x*asp*2.4+q.x*1.5,uv.y*2.3-t*.32)+2.2*r);",
    "float steam=colm*smoothstep(.26,.70,sn)*smoothstep(.28,.46,uv.y)*(1.-smoothstep(.72,.97,uv.y));",
    "vec3 stc=mix(vec3(.66,.60,.56),vec3(.95,.58,.30),clamp(1.4-uv.y*1.6,0.,1.));",
    "steam*=mix(1.,1.-smoothstep(.52,.70,uv.y),uMobile);",
    "col+=stc*steam*.62*mix(.8,1.,uBoost);",
    " float d=uv.y-.075;",
    " float h=.045+.09*env;",
    " vec2 fp=vec2(uv.x*asp*3.4,d*5.-t*1.15);",
    " float n=fbm(fp+vec2(0.,fbm(fp*.8-t*.3)));",
    " float fl=clamp(n*1.2-d/h,0.,1.);",
    " fl=pow(fl,1.5)*step(0.,d)*env;",
    " vec3 fc=mix(vec3(.55,.07,0.),vec3(1.,.42,.05),smoothstep(.05,.5,fl));",
    " fc=mix(fc,vec3(1.,.82,.45),smoothstep(.6,1.,fl));",
    " col+=fc*fl*.72*uBoost;",
    " col+=vec3(1.,.38,.06)*exp(-max(d,0.)*6.)*(.09+.30*env)*uBoost;",
    " float bx=exp(-pow((uv.x-cx)/.22,2.));",
    " col+=vec3(1.,.5,.15)*bx*exp(-abs(d)*22.)*.28*uBoost;",
    " if(d<0.){float fd=-d;",
    "  vec3 f=vec3(.03,.02,.016)+vec3(.9,.38,.1)*bx*exp(-fd*30.)*.22*uBoost+vec3(.7,.25,.05)*env*exp(-fd*40.)*.1*uBoost;",
    "  col=f+fbm(vec2(uv.x*40.,fd*80.))*.012;}",
    " col+=vec3(1.,.6,.25)*exp(-abs(d)*220.)*.22*env*uBoost;",
    " vec2 c=uv-.5;col*=1.-.65*dot(c,c);",
    " col+=(hash(gl_FragCoord.xy+t)-.5)/255.;",
    " gl_FragColor=vec4(col,1.);",
    "}",
  ].join("\n");

  function sh(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }

  var vs = sh(gl.VERTEX_SHADER, VS);
  var fs = sh(gl.FRAGMENT_SHADER, FS);

  if (!vs || !fs) return null;

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );

  var loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, "uRes");
  var uTime = gl.getUniformLocation(prog, "uTime");
  var uBoost = gl.getUniformLocation(prog, "uBoost");
  var uMobile = gl.getUniformLocation(prog, "uMobile");

  var still =
    window.matchMedia &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  var t0 = performance.now();
  var raf = 0;
  var onScreen = true;

  function resize() {
    var r = canvas.getBoundingClientRect();
    var k = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;

    var w = Math.max(2, Math.round(r.width * k));
    var h = Math.max(2, Math.round(r.height * k));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    gl.viewport(0, 0, w, h);
  }

  function draw(t) {
    var k = Math.min(t / 2.6, 1);
    var boost = 0.5 + 0.5 * (1 - Math.pow(1 - k, 3));

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uBoost, boost);
    gl.uniform1f(
      uMobile,
      canvas.getBoundingClientRect().width < 860 ? 1 : 0
    );

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);

    if (!onScreen || document.hidden) return;

    draw((now - t0) / 1000);
  }

  var ro = new ResizeObserver(function () {
    resize();
    if (still) draw(7);
  });

  ro.observe(canvas);

  var io = new IntersectionObserver(function (e) {
    onScreen = e[0].isIntersecting;
  });

  io.observe(canvas);

  resize();

  if (still) draw(7);
  else raf = requestAnimationFrame(frame);

  return function stop() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
  };
}

/* ---------- Rising sparks (2D canvas) ---------- */

function emberStartSparks(canvas) {
  if (
    window.matchMedia &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  var ctx = canvas.getContext("2d");
  if (!ctx) return null;

  var sprite = document.createElement("canvas");
  sprite.width = sprite.height = 32;

  var sg = sprite.getContext("2d");
  var g = sg.createRadialGradient(16, 16, 0, 16, 16, 16);

  g.addColorStop(0, "rgba(255,226,170,1)");
  g.addColorStop(0.28, "rgba(255,150,50,.85)");
  g.addColorStop(0.65, "rgba(255,90,10,.25)");
  g.addColorStop(1, "rgba(255,90,10,0)");

  sg.fillStyle = g;
  sg.fillRect(0, 0, 32, 32);

  var puffSprite = document.createElement("canvas");
  puffSprite.width = puffSprite.height = 64;

  var pg = puffSprite.getContext("2d");
  var pgr = pg.createRadialGradient(32, 32, 0, 32, 32, 32);

  pgr.addColorStop(0, "rgba(240,228,218,.6)");
  pgr.addColorStop(0.45, "rgba(225,210,200,.26)");
  pgr.addColorStop(1, "rgba(220,205,196,0)");

  pg.fillStyle = pgr;
  pg.fillRect(0, 0, 64, 64);

  var W = 0;
  var H = 0;
  var dpr = 1;
  var K = 1;
  var mobile = false;
  var parts = [];
  var puffs = [];
  var raf = 0;
  var last = 0;
  var onScreen = true;

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function spawn(p, initial) {
    p.x = (mobile ? rand(0.08, 0.92) : rand(0.34, 1.0)) * W;
    p.y = H * (initial ? rand(0.25, 0.93) : 0.93 + rand(0, 0.015));
    p.vx = rand(-6, 24) * K;
    p.vy = -rand(26, 84) * K;
    p.age = initial ? rand(0, 3) : 0;
    p.max = rand(3.2, 7.5);
    p.size = rand(1.4, 4.6) * K * dpr;
    p.ph = rand(0, 6.28);
    p.fr = rand(2, 6);

    return p;
  }

  function spawnPuff(p, initial) {
    var cxf = mobile ? 0.5 : 0.715;

    p.x =
      W * (cxf + (mobile ? rand(-0.2, 0.2) : rand(-0.075, 0.075)));

    p.y = H * (mobile ? rand(0.66, 0.76) : rand(0.5, 0.64));
    p.vy = -H * rand(0.04, 0.07);
    p.vx = rand(-5, 9) * K;
    p.age = initial ? rand(0, 6) : 0;
    p.max = rand(7, 11);
    p.size = W * rand(0.06, 0.1) * (mobile ? 1.7 : 1);
    p.peak = rand(0.14, 0.24) * (mobile ? 0.55 : 1);
    p.ph = rand(0, 6.28);

    if (initial) {
      p.y += p.vy * p.age;
    }

    return p;
  }

  function resize() {
    var r = canvas.getBoundingClientRect();

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.max(2, Math.round(r.width * dpr));
    H = canvas.height = Math.max(2, Math.round(r.height * dpr));

    K = (r.width / 1672) * dpr * 1.25;
    K = Math.max(K, 0.45 * dpr);

    mobile = r.width < 860;

    var n = mobile ? 12 : 28;

    parts = [];

    for (var i = 0; i < n; i++) {
      parts.push(spawn({}, true));
    }

    puffs = [];

    for (var j = 0; j < (mobile ? 8 : 13); j++) {
      puffs.push(spawnPuff({}, true));
    }
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);

    var dt = Math.min((now - last) / 1000 || 0.016, 0.05);
    last = now;

    if (!onScreen || document.hidden) return;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";

    for (var k = 0; k < puffs.length; k++) {
      var f = puffs[k];

      f.age += dt;

      if (f.age > f.max || f.y < -f.size) {
        spawnPuff(f, false);
        continue;
      }

      f.x += (f.vx + Math.sin(f.age * 0.7 + f.ph) * 9 * K) * dt;
      f.y += f.vy * dt;

      var fl = f.age / f.max;
      var fs = f.size * (1 + fl * 1.5);

      ctx.globalAlpha = Math.sin(Math.PI * fl) * f.peak;
      ctx.drawImage(puffSprite, f.x - fs / 2, f.y - fs / 2, fs, fs);
    }

    ctx.globalCompositeOperation = "lighter";

    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];

      p.age += dt;

      if (p.age > p.max || p.y < -20) {
        spawn(p, false);
        continue;
      }

      p.vx += Math.sin(p.age * 1.7 + p.ph) * 14 * K * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      var life = p.age / p.max;

      var a =
        Math.sin(Math.PI * Math.min(life * 1.15, 1)) *
        (0.65 + 0.35 * Math.sin(p.age * p.fr + p.ph));

      ctx.globalAlpha = Math.max(0, a) * 0.75;

      var s = p.size * (1 - life * 0.45) * 2.2;

      ctx.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s);
    }

    ctx.globalAlpha = 1;
  }

  var ro = new ResizeObserver(resize);
  ro.observe(canvas);

  var io = new IntersectionObserver(function (e) {
    onScreen = e[0].isIntersecting;
  });

  io.observe(canvas);

  resize();
  raf = requestAnimationFrame(frame);

  return function stop() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
  };
}

/* ---------- Burger layers ---------- */

const LAYERS = [
  {
    src: "/layers/bottombun.webp",
    i: 0,
    fd: 7.5,
    fl: 0.0,
    pos: {
      left: "18.676%",
      top: "74.198%",
      width: "66.324%",
      height: "16.296%",
    },
  },
  {
    src: "/layers/meat.webp",
    i: 1,
    fd: 8.0,
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
      top: "40.617%",
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
      top: "26.79%",
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
      top: "6.667%",
      width: "64.118%",
      height: "23.951%",
    },
  },
  {
    src: "/layers/particles.webp",
    i: 5,
    fd: 9.0,
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

/* ---------- CSS animations ---------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,700;0,800;1,800&display=swap');

.ember-hero {
  font-family: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
}

@keyframes ember-rise {
  0% {
    opacity: 0;
    transform: translate3d(0,-7cqw,0) scale(.985);
    filter: blur(10px) brightness(.55);
    animation-timing-function: cubic-bezier(.16,.84,.3,1);
  }
  62% {
    opacity: 1;
    transform: translate3d(0,.35cqw,0) scale(1);
    filter: blur(0) brightness(1.08);
    animation-timing-function: cubic-bezier(.33,0,.2,1);
  }
  100% {
    opacity: 1;
    transform: none;
    filter: blur(0) brightness(1);
  }
}

@keyframes ember-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ember-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-.3cqw); }
}

@keyframes ember-drift {
  from { transform: translate3d(-1.5%,0,0); }
  to { transform: translate3d(1.5%,-1%,0); }
}

.ember-layer {
  animation: ember-rise 1.15s both;
  animation-delay: calc(.3s + var(--i) * .17s);
  will-change: transform, opacity, filter;
}

.ember-layer.is-soft {
  animation: ember-fade 1.6s ease both;
  animation-delay: 1.5s;
}

.ember-layer img {
  animation: ember-float var(--fd,7s) ease-in-out infinite;
  animation-delay: var(--fl,0s);
}

.ember-heat {
  opacity: 0;
  animation: ember-fade 2.4s ease both;
  animation-delay: .6s;
}

.ember-smoke {
  animation: ember-drift 26s ease-in-out infinite alternate;
}

@media (max-width: 859px) {
  @keyframes ember-rise {
    0% {
      opacity: 0;
      transform: translate3d(0,-34px,0) scale(.985);
      filter: blur(8px) brightness(.55);
      animation-timing-function: cubic-bezier(.16,.84,.3,1);
    }
    62% {
      opacity: 1;
      transform: translate3d(0,2px,0) scale(1);
      filter: blur(0) brightness(1.08);
      animation-timing-function: cubic-bezier(.33,0,.2,1);
    }
    100% {
      opacity: 1;
      transform: none;
      filter: blur(0) brightness(1);
    }
  }

  @keyframes ember-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .ember-layer,
  .ember-layer img,
  .ember-heat,
  .ember-smoke {
    animation: none !important;
  }

  .ember-heat {
    opacity: 1;
  }
}
`;

/* ---------- Small components ---------- */

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

/* ---------- Main Hero component ---------- */

export default function Hero() {
  const [run, setRun] = useState(0);
  const [fx, setFx] = useState(false);

  const fxRef = useRef(null);
  const sparksRef = useRef(null);

  useEffect(() => {
    const stopFire = emberStartFire(fxRef.current);
    setFx(!!stopFire);

    const stopSparks = emberStartSparks(sparksRef.current);

    return () => {
      if (stopFire) stopFire();
      if (stopSparks) stopSparks();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070504] text-white">
      <style>{CSS}</style>

      <main className="ember-hero relative overflow-hidden bg-[#070504] [container-type:inline-size] max-md:flex max-md:flex-col max-md:pb-10 md:aspect-[1672/941]">

        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <canvas
            ref={fxRef}
            className="absolute inset-0 block h-full w-full"
          />

          <span
            className="ember-heat absolute left-[38%] top-[8%] block h-[90%] w-[62%] max-md:left-0 max-md:top-[30%] max-md:h-[60%] max-md:w-full"
            style={{
              background:
                "radial-gradient(ellipse 45% 45% at 52% 55%, rgba(255,110,20,.16), transparent 70%)",
            }}
          />

          {!fx && (
            <>
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
            </>
          )}

          
        </div>

        {/* Content */}
        <div className="relative z-[2] w-full p-6">

          

          {/* Hero text */}
          <section className="mt-[8.6cqw] max-w-[54cqw] max-md:mt-9 max-md:max-w-none">
            <p className="mb-[1.5cqw] flex items-center gap-[1.6cqw] text-[clamp(11px,1.05cqw,19px)] font-extrabold tracking-[.3em] text-[#FF6A0D] after:h-px after:w-[12.5cqw] after:bg-gradient-to-r after:from-[rgba(255,106,13,.55)] after:to-transparent max-md:mb-3.5 max-md:gap-3 max-md:text-[11px] max-md:after:w-16">
              BOLD FLAVORS. REAL FIRE.
            </p>

            <h1 className="m-0 text-[clamp(44px,7.25cqw,140px)] font-extrabold italic leading-[.9] tracking-[-.035em] [text-wrap:balance] max-md:text-[clamp(46px,15vw,84px)]">
              Made for the
              <span className="block text-[#FF6A0D]">
                Hungry.
              </span>
            </h1>

            <p className="mt-[1.9cqw] max-w-[24em] text-[clamp(15px,1.45cqw,26px)] leading-[1.42] text-[#B7B0A9] max-md:mt-4 max-md:text-base">
              Big burgers, bold flavors, and the kind of food that brings
              people together.
            </p>

            <div className="mt-[2.9cqw] flex flex-wrap gap-[1.2cqw] max-md:mt-6 max-md:gap-3">
              <a
                href="#menu"
                className="inline-flex h-[clamp(48px,4cqw,72px)] items-center justify-center gap-[.55em] whitespace-nowrap rounded-full bg-[#FF6A0D] px-[clamp(22px,2.6cqw,48px)] text-[clamp(14px,1.3cqw,24px)] font-bold leading-none text-[#170b04] transition hover:-translate-y-0.5 hover:bg-[#ff8133]"
              >
                Explore Menu
                <Arrow />
              </a>

              <a
                href="#story"
                className="inline-flex h-[clamp(48px,4cqw,72px)] items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-white/40 px-[clamp(22px,2.6cqw,48px)] text-[clamp(14px,1.3cqw,24px)] font-bold leading-none transition hover:-translate-y-0.5 hover:border-[#FF6A0D] hover:text-[#FF6A0D]"
              >
                Our Story
              </a>
            </div>
          </section>
        </div>

        {/* Exploded burger */}
        <div
          key={run}
          role="img"
          aria-label="An exploded cheeseburger: bottom bun, grilled patty with melted cheese, lettuce, tomato, onion and pickles, and a sesame bun"
          className="relative z-[1] aspect-[680/810] w-[40.67cqw] md:absolute md:right-[9.09cqw] md:top-[5.38cqw] max-md:mx-auto max-md:mt-7 max-md:w-[min(440px,calc(100%-32px))]"
        >
          {LAYERS.map((l) => (
            <div
              key={l.src}
              className={`ember-layer absolute ${l.soft ? "is-soft pointer-events-none" : ""}`}
              style={{ ...l.pos, "--i": l.i }}
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

        {/* Sparks */}
        <canvas
          ref={sparksRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] block h-full w-full"
        />

        
      
      </main>
    </div>
  );
}