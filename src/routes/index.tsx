import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "motion/react";
import {
  Wifi,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Sparkles,
  Car,
  Users,
  Maximize,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Menu,
  X,
  ArrowUpRight,
  Quote,
  Star,
} from "lucide-react";
import { I18nProvider, LanguageSwitcher, useI18n } from "@/lib/i18n";

import hero from "@/assets/hotel/hero.jpg";
import about from "@/assets/hotel/about.jpg";
import room1 from "@/assets/hotel/room1.jpg";
import room2 from "@/assets/hotel/room2.jpg";
import room3 from "@/assets/hotel/room3.jpg";
import g1 from "@/assets/hotel/g1.jpg";
import g2 from "@/assets/hotel/g2.jpg";
import g3 from "@/assets/hotel/g3.jpg";
import g4 from "@/assets/hotel/g4.jpg";
import g5 from "@/assets/hotel/g5.jpg";
import g6 from "@/assets/hotel/g6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Aurelle — Luxury Hotel & Resort" },
      {
        name: "description",
        content:
          "A five-star sanctuary of warm light, gold detail and quiet luxury. Explore signature suites, amenities and curated experiences at Maison Aurelle.",
      },
      { property: "og:title", content: "Maison Aurelle — Luxury Hotel & Resort" },
      {
        property: "og:description",
        content: "Experience luxury beyond expectations. Elegant rooms, premium comfort, unforgettable hospitality.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Index,
});

/* --------------------------- Reusable motion --------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="gold-line" />
        <span className="eyebrow">{eyebrow}</span>
        <span className="gold-line" />
      </div>
      <h2
        className={`mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl ${
          light ? "text-background" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed ${center ? "mx-auto" : ""} ${
            light ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

/* --------------------------- Navbar --------------------------- */

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 py-4 md:grid-cols-3 md:py-5">
        <a
          href="#home"
          className={`flex min-w-0 items-center gap-2 font-display text-xl tracking-wide ${
            scrolled ? "text-foreground" : "text-background"
          }`}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-xs font-semibold">
            M
          </span>
          <span className="truncate">Maison Aurelle</span>
        </a>

        <ul className="hidden items-center justify-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`text-xs uppercase tracking-[0.22em] transition-colors hover:text-[var(--color-gold)] ${
                  scrolled ? "text-foreground/80" : "text-background/85"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden justify-end md:flex">
          <a
            href="tel:+18005550199"
            className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] transition-colors hover:text-[var(--color-gold)] ${
              scrolled ? "text-foreground" : "text-background"
            }`}
          >
            <Phone size={14} /> +1 800 555 0199
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`justify-self-end md:hidden ${scrolled ? "text-foreground" : "text-background"}`}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden bg-background/95 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm uppercase tracking-[0.22em] text-foreground/80 hover:text-[var(--color-gold)]"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="tel:+18005550199"
              className="inline-flex items-center gap-2 py-3 text-sm uppercase tracking-[0.22em] text-[var(--color-gold)]"
            >
              <Phone size={14} /> +1 800 555 0199
            </a>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}

/* --------------------------- Hero --------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={hero}
          alt="Maison Aurelle hotel exterior at golden hour"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/80" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="gold-line" />
          <span className="eyebrow">Five-Star Sanctuary · Est. 2014</span>
          <span className="gold-line" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 max-w-4xl text-5xl leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Experience Luxury <em className="italic text-[var(--color-gold-soft)]">Beyond</em> Expectations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-background/80 sm:text-lg"
        >
          Discover elegant rooms, premium comfort, and unforgettable hospitality at the heart of a city that never sleeps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#rooms" className="btn-gold">
            Explore Rooms <ArrowUpRight size={14} />
          </a>
          <a href="#contact" className="btn-outline-gold">
            Contact Us
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-background/70">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-8 w-px bg-[var(--color-gold)]"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------- About --------------------------- */

function About() {
  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="relative">
            <img
              src={about}
              alt="Maison Aurelle marble lobby with crystal chandelier"
              loading="lazy"
              width={1280}
              height={1280}
              className="aspect-[4/5] w-full object-cover shadow-[var(--shadow-luxe)]"
            />
            <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 border border-[var(--color-gold)] md:block" />
            <div className="absolute -left-6 -top-6 hidden h-32 w-32 bg-[var(--color-gold)]/15 md:block" />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Our Story"
            title="A sanctuary where heritage meets quiet modernity."
            description="Set within a restored Belle Époque landmark, Maison Aurelle is a love letter to slow luxury — soft warm light, hand-finished marble, and a service philosophy passed down through generations of hoteliers."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              { t: "Hand-crafted Interiors", d: "Bespoke furnishings sourced from European ateliers." },
              { t: "Michelin-trained Kitchen", d: "Seasonal menus by a two-star executive chef." },
              { t: "Personal Concierge", d: "A dedicated guest host across your entire stay." },
              { t: "Wellness Sanctuary", d: "A subterranean spa with mineral hammam & cold plunge." },
            ].map((it, i) => (
              <Reveal key={it.t} delay={0.05 * i}>
                <div className="border-t border-border pt-5">
                  <h3 className="text-xl">{it.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Rooms --------------------------- */

const ROOMS = [
  {
    img: room1,
    name: "Deluxe King",
    description: "A serene retreat with panoramic skyline windows and warm silk linens.",
    capacity: "2 Guests",
    size: "48 m²",
    price: 480,
  },
  {
    img: room2,
    name: "Executive Suite",
    description: "A private living room with hand-stitched leather and bespoke joinery.",
    capacity: "3 Guests",
    size: "72 m²",
    price: 720,
  },
  {
    img: room3,
    name: "Aurelle Penthouse",
    description: "Our signature top-floor residence with private terrace and butler.",
    capacity: "4 Guests",
    size: "140 m²",
    price: 1480,
  },
];

function Rooms() {
  return (
    <section id="rooms" className="bg-muted/50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Signature Stays"
          title="Featured Rooms & Suites"
          description="Each space is composed as a private retreat — a deliberate balance of warm white, charcoal stone and quiet gold detail."
        />

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {ROOMS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col bg-card shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-luxe)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={r.img}
                    alt={`${r.name} at Maison Aurelle`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute right-0 top-0 bg-background/95 px-5 py-3 text-right">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">From</div>
                    <div className="font-display text-2xl text-foreground">
                      ${r.price}
                      <span className="text-xs text-muted-foreground"> /night</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl">{r.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                  <div className="mt-6 flex items-center gap-5 text-xs uppercase tracking-[0.18em] text-foreground/70">
                    <span className="inline-flex items-center gap-2">
                      <Users size={14} className="text-[var(--color-gold)]" /> {r.capacity}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Maximize size={14} className="text-[var(--color-gold)]" /> {r.size}
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center justify-between border-t border-border pt-5 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-[var(--color-gold)]"
                  >
                    View Details
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Amenities --------------------------- */

const AMENITIES = [
  { icon: Wifi, t: "Free Wi-Fi", d: "Lightning-fast fibre across every suite." },
  { icon: UtensilsCrossed, t: "Restaurant", d: "Seasonal tasting menu by Chef Lemaire." },
  { icon: Waves, t: "Swimming Pool", d: "Heated rooftop infinity pool with city view." },
  { icon: Dumbbell, t: "Fitness Studio", d: "24/7 strength & cardio with Technogym." },
  { icon: Sparkles, t: "Aurelle Spa", d: "Hammam, sauna and signature gold facials." },
  { icon: Car, t: "Valet Parking", d: "Discreet underground parking with concierge." },
];

function Amenities() {
  return (
    <section id="amenities" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="Hotel Amenities"
          title="Curated comforts, refined to the smallest detail."
        />
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.t} delay={i * 0.05}>
                <div className="group flex h-full flex-col items-start gap-5 bg-background p-10 transition-colors duration-500 hover:bg-muted/60">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] transition-transform duration-500 group-hover:-translate-y-1">
                    <Icon size={22} strokeWidth={1.4} />
                  </div>
                  <div>
                    <h3 className="text-2xl">{a.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Gallery --------------------------- */

const GALLERY = [
  { src: g1, cat: "Exterior", alt: "Infinity pool at dusk", span: "row-span-2" },
  { src: g2, cat: "Interior", alt: "Fine dining restaurant", span: "" },
  { src: room1, cat: "Rooms", alt: "Deluxe king suite", span: "" },
  { src: g5, cat: "Experience", alt: "Rooftop terrace bar", span: "" },
  { src: g3, cat: "Experience", alt: "Spa room with candles", span: "row-span-2" },
  { src: g6, cat: "Interior", alt: "Marble bathroom", span: "" },
  { src: g4, cat: "Exterior", alt: "Illuminated facade at night", span: "" },
  { src: room3, cat: "Rooms", alt: "Penthouse living area", span: "" },
];

const CATS = ["All", "Rooms", "Interior", "Exterior", "Experience"] as const;

function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const filtered = GALLERY.filter((g) => cat === "All" || g.cat === cat);

  return (
    <section id="gallery" className="bg-muted/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading center eyebrow="The Gallery" title="A visual journey through Aurelle." />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.22em] transition-all ${
                cat === c
                  ? "bg-foreground text-background"
                  : "border border-border bg-transparent text-foreground/70 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {filtered.map((g, i) => (
            <motion.figure
              key={g.src + cat}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
              className={`group relative overflow-hidden ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)]">{g.cat}</div>
                <div className="font-display text-lg">{g.alt}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Testimonials --------------------------- */

const REVIEWS = [
  {
    quote:
      "Every detail at Maison Aurelle felt considered — the way morning light fell across the marble, the perfectly chilled champagne on arrival. Unforgettable.",
    name: "Isabelle Moreau",
    role: "Travel Editor, Maison & Voyage",
  },
  {
    quote:
      "We've stayed in many five-stars; few feel this personal. The concierge remembered every preference from our first night.",
    name: "James & Eloise Park",
    role: "Returning Guests",
  },
  {
    quote:
      "The rooftop pool at dusk is reason enough. The spa is reason to extend your stay. We did both.",
    name: "Andrés Vela",
    role: "Architect, Lisbon",
  },
];

function Testimonials() {
  return (
    <section className="bg-foreground px-6 py-24 text-background md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          light
          eyebrow="Guest Words"
          title="Stories from those who have stayed with us."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col border border-background/15 bg-background/[0.03] p-8 backdrop-blur-sm">
                <Quote size={28} className="text-[var(--color-gold)]" strokeWidth={1.2} />
                <blockquote className="mt-6 flex-1 font-display text-xl leading-relaxed text-background/90">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-1 text-[var(--color-gold)]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <figcaption className="mt-4 border-t border-background/15 pt-4">
                  <div className="text-sm font-medium text-background">{r.name}</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-background/55">{r.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Stats --------------------------- */

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  { v: 5000, suffix: "+", label: "Happy Guests" },
  { v: 50, suffix: "", label: "Signature Rooms" },
  { v: 10, suffix: "+", label: "Years of Hospitality" },
  { v: 4.9, suffix: "", label: "Guest Rating", decimals: 1 },
];

function Stats() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-y-12 border-y border-border py-16 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="font-display text-5xl text-foreground md:text-6xl">
                  <Counter to={s.v} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Contact --------------------------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-muted/40 px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading eyebrow="Get in Touch" title="We would be delighted to welcome you." />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Our concierge team is available around the clock to arrange your stay, recommend experiences, or simply answer a question.
          </p>

          <ul className="mt-10 space-y-6">
            <li>
              <a
                href="tel:+18005550199"
                className="group flex items-start gap-5 border-b border-border pb-6 transition-colors hover:text-[var(--color-gold)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]">
                  <Phone size={16} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Telephone</span>
                  <span className="mt-1 block font-display text-2xl text-foreground group-hover:text-[var(--color-gold)]">
                    +1 800 555 0199
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:concierge@maisonaurelle.com"
                className="group flex items-start gap-5 border-b border-border pb-6 transition-colors hover:text-[var(--color-gold)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]">
                  <Mail size={16} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Email</span>
                  <span className="mt-1 block font-display text-2xl text-foreground group-hover:text-[var(--color-gold)]">
                    concierge@maisonaurelle.com
                  </span>
                </span>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-5 border-b border-border pb-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]">
                  <MapPin size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Location</span>
                  <span className="mt-1 block font-display text-2xl text-foreground">
                    24 Rue de l'Aurore
                  </span>
                  <span className="text-sm text-muted-foreground">75008 Paris, France</span>
                </span>
              </div>
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center border border-border text-foreground transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center border border-border text-foreground transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <Reveal>
          <div className="relative">
            <img
              src={g4}
              alt="Maison Aurelle illuminated facade at night"
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/5] w-full object-cover shadow-[var(--shadow-luxe)]"
            />
            <div className="absolute inset-x-6 bottom-6 bg-background/95 p-6 backdrop-blur-sm sm:inset-x-10">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">Reception Hours</div>
              <div className="mt-2 font-display text-2xl text-foreground">Open 24 hours, every day</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Check-in from 3:00 pm · Check-out by 12:00 pm
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Footer --------------------------- */

function Footer() {
  return (
    <footer className="bg-foreground px-6 pt-20 pb-8 text-background">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-sm font-semibold">
              M
            </span>
            <span className="font-display text-2xl">Maison Aurelle</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/65">
            A five-star sanctuary of warm light, gold detail and quiet luxury — set within a restored Belle Époque landmark.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="text-background/70 hover:text-[var(--color-gold)]"><Instagram size={18} /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="text-background/70 hover:text-[var(--color-gold)]"><Facebook size={18} /></a>
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">Explore</div>
          <ul className="mt-5 space-y-3 text-sm text-background/75">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-[var(--color-gold)]">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-background/75">
            <li><a href="tel:+18005550199" className="hover:text-[var(--color-gold)]">+1 800 555 0199</a></li>
            <li><a href="mailto:concierge@maisonaurelle.com" className="hover:text-[var(--color-gold)] break-all">concierge@maisonaurelle.com</a></li>
            <li>24 Rue de l'Aurore<br />75008 Paris, France</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-background/15 pt-6 text-xs text-background/55 sm:flex-row">
        <div>© {new Date().getFullYear()} Maison Aurelle. All rights reserved.</div>
        <div className="uppercase tracking-[0.22em]">Crafted with care · Paris</div>
      </div>
    </footer>
  );
}

/* --------------------------- Page --------------------------- */

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Gallery />
      <Testimonials />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
