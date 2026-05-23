import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap, Wrench, Cpu, Zap, Users, Award, Target, Building2,
  Phone, MapPin, ArrowRight, CheckCircle2, Sparkles, ChevronDown,
  BookOpen, Briefcase, Star, Menu, X
} from "lucide-react";
import campus1 from "@/assets/campus-1.png";
import campus2 from "@/assets/campus-2.png";
import campus3 from "@/assets/campus-3.png";
import campus4 from "@/assets/campus-4.png";
import campus5 from "@/assets/campus-5.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vertex Industrial Training Institute — Solan, HP" },
      { name: "description", content: "Vertex ITI Solan offers practical, industry-ready training in Electrician, Fitter, COPA and more. Build your future with experienced faculty and modern infrastructure." },
      { property: "og:title", content: "Vertex Industrial Training Institute — Solan" },
      { property: "og:description", content: "Practical learning, industry-ready training, career-focused education in Solan, Himachal Pradesh." },
      { property: "og:image", content: campus2 },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

const galleryImages = [campus1, campus2, campus3, campus4, campus5];

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <WhyChooseUs />
      <Courses />
      <Gallery />
      <Journey />
      <Achievements />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 gradient-royal z-[100] origin-left"
    />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#about", label: "About" },
    { href: "#courses", label: "Courses" },
    { href: "#gallery", label: "Campus" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3 glass shadow-premium" : "py-5 bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl gradient-royal grid place-items-center shadow-glow group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className={`font-display font-bold leading-tight ${scrolled ? "text-foreground" : "text-white"}`}>
            <div className="text-base">Vertex ITI</div>
            <div className="text-[10px] opacity-70 -mt-0.5">SOLAN • HP</div>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`text-sm font-medium hover:opacity-100 transition relative group ${scrolled ? "text-foreground/80" : "text-white/85"}`}>
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-royal group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#cta" className="px-5 py-2.5 rounded-full gradient-royal text-white text-sm font-semibold shadow-glow hover:scale-105 transition-transform">
            Apply Now
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-6 mt-3 rounded-2xl glass p-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-foreground font-medium py-2">{l.label}</a>
          ))}
          <a href="#cta" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-full gradient-royal text-white text-sm font-semibold text-center">Apply Now</a>
        </motion.div>
      )}
    </motion.nav>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen gradient-hero overflow-hidden">
      <Particles />
      {/* Glow orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-royal/30 blur-3xl animate-float-slow" />
      <div className="absolute bottom-10 right-0 w-[28rem] h-[28rem] rounded-full bg-royal-light/20 blur-3xl animate-float" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div className="text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-royal-light" />
              Transforming Skills Into Careers
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
              Vertex <span className="gradient-text">Industrial</span> Training Institute
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-5 text-lg text-white/80 font-medium">
              Practical Learning • Industry Ready Training • Build Your Future
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-4 text-white/65 max-w-xl leading-relaxed">
              Vertex Industrial Training Institute empowers students with practical skills, innovation, and
              career-focused education to shape tomorrow's professionals.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="mt-8 flex flex-wrap gap-4">
              <a href="#courses" className="group px-7 py-4 rounded-full gradient-royal text-white font-semibold shadow-glow hover:scale-105 transition-transform flex items-center gap-2">
                Explore Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              <a href="#cta" className="px-7 py-4 rounded-full glass text-white font-semibold hover:bg-white/15 transition">
                Admission Open
              </a>
            </motion.div>
          </div>

          {/* Right: Stacked floating images */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="relative h-[500px] hidden lg:block">
            <motion.div className="absolute top-0 right-0 w-72 h-96 rounded-3xl overflow-hidden shadow-premium border-2 border-white/20"
              animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }}>
              <img src={campus2} alt="Vertex ITI Faculty" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="absolute top-32 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-premium border-2 border-white/20"
              animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity }}>
              <img src={campus4} alt="Computer Lab" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="absolute bottom-0 right-20 glass rounded-2xl p-4 w-56 shadow-glow"
              animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-royal grid place-items-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold leading-none">1000+</div>
                  <div className="text-xs text-white/70">Students Trained</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="absolute top-8 left-20 glass rounded-2xl p-4 shadow-glow"
              animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 grid place-items-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold leading-none">95%</div>
                  <div className="text-xs text-white/70">Career Growth</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % galleryImages.length), 3500);
    return () => clearInterval(t);
  }, []);
  const points = ["Experienced Faculty", "Practical Training", "Career Focus", "Modern Infrastructure"];
  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative h-[520px] rounded-3xl overflow-hidden shadow-premium">
          {galleryImages.map((img, i) => (
            <motion.img key={i} src={img} alt="Vertex ITI campus" loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: idx === i ? 1 : 0, scale: idx === i ? 1 : 1.05 }}
              transition={{ duration: 1.2 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex gap-2">
            {galleryImages.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all ${idx === i ? "bg-white flex-1" : "bg-white/40 w-6"}`} />
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-5">
            ABOUT VERTEX ITI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
            Building <span className="text-royal">Future</span> Professionals
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            At Vertex ITI we blend rigorous practical training with innovation and industry exposure.
            Our mission is to transform motivated learners into confident, employable professionals
            through hands-on workshops, expert mentorship, and modern infrastructure tailored for
            real-world demands.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            From day one, every student joins a culture of discipline, curiosity and craftsmanship —
            where skills are built, careers are launched and futures are shaped.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {points.map((p, i) => (
              <motion.div key={p} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:shadow-premium transition">
                <CheckCircle2 className="w-5 h-5 text-royal flex-shrink-0" />
                <span className="font-medium">{p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { icon: Wrench, title: "Practical Training", desc: "Hands-on workshops with real industry tools and live projects." },
    { icon: Building2, title: "Modern Infrastructure", desc: "Equipped labs, classrooms and workshops designed for active learning." },
    { icon: Users, title: "Expert Faculty", desc: "Mentors with decades of industry and academic experience." },
    { icon: Briefcase, title: "Career Guidance", desc: "Dedicated placement support, interview prep and industry network." },
    { icon: Target, title: "Skill Development", desc: "Curriculum aligned to NCVT/SCVT standards and modern demand." },
    { icon: Cpu, title: "Industry Exposure", desc: "Field visits, internships and live exposure to working environments." },
  ];
  return (
    <section className="py-28 px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-royal/5 blur-3xl" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-5">
            WHY CHOOSE US
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">A premier institute built on <span className="text-royal">excellence</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div key={it.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl bg-card border border-border hover:border-royal/40 transition-all duration-500 hover:shadow-premium overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full gradient-royal opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl gradient-royal grid place-items-center shadow-glow mb-5 group-hover:scale-110 transition-transform">
                  <it.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courses() {
  const courses = [
    { icon: Zap, title: "Electrician", duration: "2 Years", desc: "Wiring, motors, control circuits and electrical installations.", color: "from-amber-500 to-orange-600" },
    { icon: Wrench, title: "Fitter", duration: "2 Years", desc: "Precision fitting, machining and mechanical assembly skills.", color: "from-blue-500 to-indigo-600" },
    { icon: Cpu, title: "COPA / Computer Operator", duration: "1 Year", desc: "Office tools, programming basics, internet and accounting.", color: "from-violet-500 to-purple-600" },
    { icon: BookOpen, title: "Industrial Training", duration: "Custom", desc: "Specialized industry-aligned modules for working professionals.", color: "from-emerald-500 to-teal-600" },
  ];
  return (
    <section id="courses" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-5">
              COURSES OFFERED
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-balance max-w-2xl">Programs crafted for <span className="text-royal">real careers</span></h2>
          </div>
          <p className="text-muted-foreground max-w-md">NCVT/SCVT-aligned programs combining classroom rigor with hands-on workshops.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl bg-navy-deep p-8 text-white shadow-premium">
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`} />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl glass grid place-items-center">
                    <c.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full glass">{c.duration}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{c.title}</h3>
                <p className="text-white/75 text-sm mb-6 leading-relaxed">{c.desc}</p>
                <a href="#cta" className="inline-flex items-center gap-2 text-sm font-semibold group/btn">
                  Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-28 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-5">
            CAMPUS GALLERY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Experience <span className="text-royal">Campus Life</span></h2>
          <p className="mt-4 text-muted-foreground">Moments from classrooms, workshops, cultural events and faculty achievements.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {[
            { src: campus2, span: "md:col-span-2 md:row-span-2" },
            { src: campus3, span: "" },
            { src: campus4, span: "md:col-span-2" },
            { src: campus5, span: "md:col-span-2 md:row-span-1" },
            { src: campus1, span: "" },
          ].map((g, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl shadow-premium group cursor-pointer ${g.span}`}>
              <img src={g.src} alt={`Vertex ITI campus ${i + 1}`} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    { title: "Join Vertex", desc: "Begin your journey with admission and orientation." },
    { title: "Learn Skills", desc: "Foundation courses with expert faculty and structured curriculum." },
    { title: "Hands-On Training", desc: "Practical workshops and live industrial projects." },
    { title: "Build Confidence", desc: "Mock interviews, soft skills and project showcases." },
    { title: "Start Career", desc: "Placement support and entry into industry roles." },
  ];
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-5">
            STUDENT JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">From <span className="text-royal">enrollment</span> to <span className="text-royal">employment</span></h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px gradient-royal opacity-30" />
          {steps.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="md:w-1/2 pl-16 md:px-12">
                <div className="p-6 rounded-2xl bg-card border border-border shadow-premium hover:border-royal/40 transition">
                  <div className="text-xs font-semibold text-royal mb-1">STEP 0{i + 1}</div>
                  <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full gradient-royal ring-4 ring-background shadow-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Achievements() {
  const stats = [
    { value: 1000, suffix: "+", label: "Students Trained" },
    { value: 95, suffix: "%", label: "Career Focus" },
    { value: 10, suffix: "+", label: "Years Excellence" },
    { value: 100, suffix: "%", label: "Practical Exposure" },
  ];
  return (
    <section id="achievements" className="py-28 px-6 gradient-hero relative overflow-hidden">
      <Particles />
      <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-royal/30 blur-3xl animate-float-slow" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold mb-5">
            OUR ACHIEVEMENTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Numbers that <span className="gradient-text">define excellence</span></h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-8 text-center text-white hover:shadow-glow transition">
              <div className="text-5xl md:text-6xl font-bold gradient-text">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-white/70 font-medium uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Rohit Kumar", role: "Electrician Graduate", text: "Vertex ITI gave me the practical skills and confidence I needed. The faculty truly care about every student's growth.", img: campus3 },
    { name: "Priya Sharma", role: "COPA Student", text: "The computer lab and teaching quality are excellent. I built real skills here that helped me land my first job quickly.", img: campus4 },
    { name: "Amit Verma", role: "Fitter Graduate", text: "From day one, hands-on workshops made learning exciting. The placement support team was incredibly helpful.", img: campus5 },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-28 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-5">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Voices of our <span className="text-royal">students</span></h2>
        </motion.div>
        <div className="relative h-72">
          {items.map((t, i) => (
            <motion.div key={i}
              animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 glass-light rounded-3xl p-8 md:p-12 shadow-premium flex flex-col justify-center"
              style={{ pointerEvents: idx === i ? "auto" : "none" }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed italic">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-royal/30">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "bg-royal w-8" : "bg-border w-2"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="py-28 px-6">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[2rem] gradient-hero shadow-premium">
        <Particles />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-royal/40 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-royal-light/30 blur-3xl animate-float" />
        <img src={campus5} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="relative px-8 md:px-16 py-20 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4" /> ADMISSIONS OPEN 2025
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-balance max-w-3xl mx-auto leading-tight">
            Start Building Your <span className="gradient-text">Future</span> Today
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-5 text-white/75 max-w-xl mx-auto">
            Join Vertex ITI and gain the skills, confidence and industry exposure to launch a successful career.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="px-8 py-4 rounded-full bg-white text-navy-deep font-bold hover:scale-105 transition-transform shadow-glow">
              Apply Now
            </a>
            <a href="tel:+919418048022" className="px-8 py-4 rounded-full glass text-white font-bold hover:bg-white/15 transition flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Institute
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-5">
            GET IN TOUCH
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Visit <span className="text-royal">Vertex ITI</span></h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-4">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-premium flex gap-4 hover:border-royal/40 transition">
              <div className="w-12 h-12 rounded-xl gradient-royal grid place-items-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold mb-1">Address</div>
                <p className="text-sm text-muted-foreground">Rajgarh Rd, near post office, Kotla Nala, Solan, Himachal Pradesh 173212</p>
              </div>
            </div>
            <a href="tel:+919418048022" className="p-6 rounded-2xl bg-card border border-border shadow-premium flex gap-4 hover:border-royal/40 transition block">
              <div className="w-12 h-12 rounded-xl gradient-royal grid place-items-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold mb-1">Phone</div>
                <p className="text-sm text-muted-foreground">+91 94180 48022</p>
              </div>
            </a>
            <div className="p-6 rounded-2xl gradient-hero shadow-premium text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-royal/40 blur-3xl" />
              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">Quick Contact</div>
                <h3 className="text-2xl font-bold mb-2">Talk to our admissions team</h3>
                <p className="text-sm text-white/75 mb-4">Get guidance on courses, fees and the admission process.</p>
                <a href="tel:+919418048022" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-navy-deep font-semibold text-sm hover:scale-105 transition">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-premium min-h-[480px] border border-border">
            <iframe
              title="Vertex ITI Location"
              src="https://www.google.com/maps?q=Vertex+Industrial+Training+Institute+Solan&output=embed"
              className="w-full h-full min-h-[480px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep text-white pt-20 pb-8 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-40 bg-royal/20 blur-3xl" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-royal grid place-items-center shadow-glow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="font-display font-bold">
                <div>Vertex ITI</div>
                <div className="text-[10px] opacity-60 -mt-0.5">SOLAN • HP</div>
              </div>
            </div>
            <p className="text-sm text-white/65 max-w-md leading-relaxed">
              Vertex Industrial Training Institute — practical learning, industry-ready training and a launchpad for tomorrow's professionals.
            </p>
          </div>
          <div>
            <div className="font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</div>
            <ul className="space-y-2 text-sm text-white/65">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#courses" className="hover:text-white transition">Courses</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Campus</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-4 text-sm uppercase tracking-wider">Contact</div>
            <ul className="space-y-2 text-sm text-white/65">
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 flex-shrink-0" /> +91 94180 48022</li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Rajgarh Rd, Kotla Nala, Solan, HP 173212</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Vertex Industrial Training Institute. All rights reserved.</div>
          <div>Crafted with precision for Solan's future professionals.</div>
        </div>
      </div>
    </footer>
  );
}
