"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-bg text-text-primary overflow-hidden">

      {/* 1️⃣ HERO — PRODUCT BENTO */}
      <section className="relative py-32">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-light/50 rounded-full blur-3xl" />
        <div className="absolute top-32 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-light text-primary text-sm font-medium">
              Skill-first learning platform
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-tight">
              Learn with structure.
              <br />
              <span className="text-primary">Progress with clarity.</span>
            </h1>

            <p className="mt-6 text-text-secondary max-w-xl">
              EduFlux helps you master skills through structured paths,
              real-world projects, and measurable progress — not endless videos.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="/courses" className="px-6 py-3 rounded-lg bg-primary text-white font-medium shadow-md hover:bg-primary-dark transition">
                View Learning Paths
              </Link>
              <Link href="/signup" className="px-6 py-3 rounded-lg border border-border hover:bg-bg-muted transition">
                Start Free
              </Link>
            </div>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-2 gap-4">
            <ProgressRingCard />
            <ModuleStackCard />
            <StreakCard />
          </div>
        </div>
      </section>

      {/* 2️⃣ TRUST STRIP */}
      <section className="bg-bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm text-text-secondary">
          <span>50k+ active learners</span>
          <span>Project-based curriculum</span>
          <span>Career-aligned skills</span>
          <span>Self-paced mastery</span>
        </div>
      </section>

      {/* 3️⃣ LEARNING OUTCOMES — REAL UI */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Outcome title="Structured mastery" value="92%" />
          <Outcome title="Project completion" value="4.8★" />
          <Outcome title="Skill confidence" value="10x" />
        </div>
      </section>

      {/* 4️⃣ TRACKS — SEGMENTED */}
      <section className="bg-bg-muted py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Career learning tracks</h2>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
            {["Frontend", "Backend", "UI/UX", "DevOps"].map(track => (
              <TrackCard key={track} title={track} />
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ LEARNING FLOW */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {[
            "Choose a learning path",
            "Complete focused modules",
            "Build real projects",
            "Track skill growth"
          ].map((step, i) => (
            <FlowStep key={step} step={i + 1} title={step} />
          ))}
        </div>
      </section>

      {/* 6️⃣ STATS — SIGNAL */}
      <section className="bg-primary py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-10 text-center">
          <Stat value="95%" label="Completion rate" />
          <Stat value="4.9 / 5" label="Learner satisfaction" />
          <Stat value="3x faster" label="Skill acquisition" />
        </div>
      </section>

      {/* 7️⃣ PHILOSOPHY — PRODUCT */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-2xl bg-card-bg border border-border shadow-lg">
            <h2 className="text-3xl font-bold">Designed for focus</h2>
            <p className="mt-6 text-text-secondary">
              Every lesson is intentional. No noise, no filler — only what moves you forward.
            </p>
          </div>
        </div>
      </section>

      {/* 8️⃣ COURSES */}
      <section className="bg-bg-muted py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {["Modern Web Dev", "Advanced React", "System Design"].map(course => (
            <CourseCard key={course} title={course} />
          ))}
        </div>
      </section>

      {/* 9️⃣ TESTIMONIAL */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-10 rounded-2xl bg-card-bg border border-border shadow-lg">
            <p className="text-xl font-medium">
              “EduFlux gave me structure I couldn’t find anywhere else.”
            </p>
            <p className="mt-6 text-text-muted">— Frontend Engineer</p>
          </div>
        </div>
      </section>

      {/* 🔟 PERKS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Perk title="Zero distractions" />
          <Perk title="Progress visibility" />
          <Perk title="Mobile-first design" />
        </div>
      </section>

      {/* 1️⃣1️⃣ FINAL CTA */}
      <section className="bg-primary py-28 text-center text-white">
        <h2 className="text-4xl font-bold">Build skills that compound</h2>
        <p className="mt-4 text-white/80">Start learning with clarity today.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/signup" className="px-8 py-3 bg-white text-primary rounded-lg font-semibold">
            Join Free
          </Link>
          <Link href="/courses" className="px-8 py-3 border border-white/40 rounded-lg">
            Browse Courses
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function ProgressRingCard() {
  return (
    <div className="p-6 rounded-xl bg-card-bg border border-border shadow-sm">
      <p className="font-semibold">Overall Progress</p>
      <div className="mt-6 w-24 h-24 rounded-full border-4 border-primary-light flex items-center justify-center mx-auto">
        <span className="text-primary font-bold">72%</span>
      </div>
    </div>
  );
}

function ModuleStackCard() {
  return (
    <div className="p-6 rounded-xl bg-card-bg border border-border shadow-sm">
      <p className="font-semibold">Course Structure</p>
      <div className="mt-4 space-y-2">
        <div className="h-2 bg-primary rounded" />
        <div className="h-2 bg-primary-light rounded" />
        <div className="h-2 bg-bg-muted rounded" />
      </div>
    </div>
  );
}

function StreakCard() {
  return (
    <div className="col-span-2 p-6 rounded-xl bg-card-bg border border-border shadow-sm">
      <p className="font-semibold">Learning Streak</p>
      <div className="mt-4 flex gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-8 h-8 rounded bg-primary-light" />
        ))}
      </div>
    </div>
  );
}

function Outcome({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card-bg border border-border shadow-md text-center">
      <p className="text-4xl font-bold text-primary">{value}</p>
      <p className="mt-4 font-semibold">{title}</p>
    </div>
  );
}

function TrackCard({ title }: { title: string }) {
  return (
    <div className="p-6 rounded-xl bg-card-bg border border-border">
      <h3 className="font-semibold">{title} Engineer</h3>
      <div className="mt-4 flex gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-2 flex-1 rounded bg-primary-light" />
        ))}
      </div>
    </div>
  );
}

function FlowStep({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
        {step}
      </div>
      <div className="p-6 rounded-xl bg-card-bg border border-border flex-1">
        <p className="font-semibold">{title}</p>
      </div>
    </div>
  );
}

function CourseCard({ title }: { title: string }) {
  return (
    <div className="rounded-xl bg-card-bg border border-border overflow-hidden shadow-sm">
      <div className="h-44 bg-gradient-to-br from-primary-light to-bg-muted" />
      <div className="p-6">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-2 text-text-secondary text-sm">
          Hands-on, project-driven learning
        </p>
      </div>
    </div>
  );
}

function Perk({ title }: { title: string }) {
  return (
    <div className="p-6 rounded-xl bg-bg-muted border border-border text-center">
      <div className="w-10 h-10 rounded-full bg-primary-light mx-auto mb-4" />
      <p className="font-semibold">{title}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="mt-2 text-white/80">{label}</p>
    </div>
  );
}
