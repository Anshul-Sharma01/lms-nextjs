import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Cpu,
  Palette,
  Globe,
  Zap,
  Trophy,
  Flame,
  BookOpen,
  Target,
  Users,
  Star
} from "lucide-react";
import React from "react";

export default function HomePage() {
  return (
    <main className="bg-bg text-text-primary overflow-hidden">
      {/* 1️⃣ HERO SECTION */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary-light/10 rounded-full blur-[100px] -z-10" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/10 border border-primary-light/20 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Skill-first learning platform
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">structure</span>.
              <br />
              Progress with clarity.
            </h1>

            <p className="text-xl text-text-secondary max-w-xl leading-relaxed">
              Master skills through structured paths, real-world projects, and measurable progress. No fluff, just results.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/40 transition-all transform hover:-translate-y-1"
              >
                View Learning Paths
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl border border-border bg-white hover:bg-bg-muted font-medium transition-colors"
              >
                Start for Free
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-text-muted">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden`}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Joined by 50,000+ developers</p>
            </div>
          </div>

          {/* Hero Visuals */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/20 to-transparent blur-3xl -z-10" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <StatCard
                  icon={<Target className="w-5 h-5 text-primary" />}
                  label="Goal Completion"
                  value="94%"
                  trend="+12%"
                />
                <StatCard
                  icon={<Zap className="w-5 h-5 text-warning" />}
                  label="Learning Streak"
                  value="12 Days"
                  sub="Keep it up!"
                />
              </div>
              <div className="space-y-4">
                <StatCard
                  icon={<Trophy className="w-5 h-5 text-yellow-500" />}
                  label="Current Rank"
                  value="Top 5%"
                  sub="Global Leaderboard"
                />
                <div className="p-6 rounded-2xl bg-white border border-border shadow-xl hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Daily Progress</span>
                    <span className="text-primary font-bold">80%</span>
                  </div>
                  <div className="h-2 w-full bg-bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ TRUST STRIP */}
      <section className="border-y border-border bg-bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"].map((tech) => (
              <span key={tech} className="text-xl font-bold text-text-muted">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ LEARNING TRACKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Structured Career Tracks</h2>
            <p className="text-text-secondary text-lg">Choose a specialization and follow a proven curriculum designed by industry experts.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrackCard
              icon={<Globe className="w-6 h-6" />}
              title="Frontend Dev"
              desc="Master React, Next.js, and modern UI engineering."
              color="text-blue-500"
              bg="bg-blue-50"
            />
            <TrackCard
              icon={<Terminal className="w-6 h-6" />}
              title="Backend Dev"
              desc="Build scalable APIs with Node, Go, and Python."
              color="text-emerald-500"
              bg="bg-emerald-50"
            />
            <TrackCard
              icon={<Palette className="w-6 h-6" />}
              title="UI/UX Design"
              desc="Craft beautiful interfaces and user experiences."
              color="text-purple-500"
              bg="bg-purple-50"
            />
            <TrackCard
              icon={<Cpu className="w-6 h-6" />}
              title="DevOps"
              desc="Master CI/CD, Docker, and Cloud Infrastructure."
              color="text-orange-500"
              bg="bg-orange-50"
            />
          </div>
        </div>
      </section>

      {/* 4️⃣ FEATURES / BENEFITS */}
      <section className="py-24 bg-bg-muted relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why learners choose EduFlux</h2>
            <div className="space-y-8">
              <FeatureRow
                icon={<BookOpen className="w-5 h-5 text-white" />}
                title="Project-based Learning"
                desc="Stop watching, start building. Every module includes a real-world project."
                color="bg-blue-500"
              />
              <FeatureRow
                icon={<ArrowRight className="w-5 h-5 text-white" />}
                title="Structured Roadmap"
                desc="No more tutorial hell. Follow a clear step-by-step path to mastery."
                color="bg-purple-500"
              />
              <FeatureRow
                icon={<Users className="w-5 h-5 text-white" />}
                title="Community & Code Reviews"
                desc="Get feedback from mentors and peers to improve your code quality."
                color="bg-emerald-500"
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light/30 to-purple-500/10 rounded-2xl blur-2xl transform rotate-3" />
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Weekly Leaderboard</h3>
                  <p className="text-text-muted text-sm">Top performers this week</p>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-text-muted w-4">#{i}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <span className="font-medium">Developer {i}</span>
                    </div>
                    <span className="font-mono text-primary font-bold">{1000 - (i * 50)} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ POPULAR COURSES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Popular Courses</h2>
              <p className="text-text-secondary mt-2">Start with our highest-rated learning paths</p>
            </div>
            <Link href="/courses" className="text-primary font-medium hover:text-primary-dark flex items-center gap-1">
              All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <CourseCard
              title="Fullstack React Masterclass"
              students="12.5k"
              rating="4.9"
              image="from-blue-500 to-indigo-600"
              tags={["React", "Node.js", "Postgres"]}
            />
            <CourseCard
              title="Advanced System Design"
              students="8.2k"
              rating="4.8"
              image="from-emerald-500 to-teal-600"
              tags={["Architecture", "Scaling", "Cloud"]}
            />
            <CourseCard
              title="UI/UX for Developers"
              students="5.1k"
              rating="4.9"
              image="from-purple-500 to-pink-600"
              tags={["Figma", "Design Systems", "CSS"]}
            />
          </div>
        </div>
      </section>

      {/* 6️⃣ CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-primary overflow-hidden relative text-white text-center py-20 px-6">
          {/* Abstract Shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to level up your career?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of developers building real skills. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg">
                Get Started for Free
              </Link>
              <Link href="/courses" className="px-8 py-4 bg-primary-dark/50 text-white border border-white/20 rounded-xl font-medium hover:bg-primary-dark transition-colors">
                Explore Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  sub?: string;
}

function StatCard({ icon, label, value, trend, sub }: StatCardProps) {
  return (
    <div className="p-5 rounded-xl bg-white border border-border shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-lg bg-bg-muted">{icon}</div>
        {trend && <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <div>
        <p className="text-text-muted text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
        {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
      </div>
    </div>
  )
}

interface TrackCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  bg: string;
}

function TrackCard({ icon, title, desc, color, bg }: TrackCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
      <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

interface FeatureRowProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

function FeatureRow({ icon, title, desc, color }: FeatureRowProps) {
  return (
    <div className="flex gap-4">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0 mt-1 shadow-md`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg text-text-primary">{title}</h3>
        <p className="text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

interface CourseCardProps {
  title: string;
  students: string;
  rating: string;
  image: string;
  tags: string[];
}

function CourseCard({ title, students, rating, image, tags }: CourseCardProps) {
  return (
    <div className="group rounded-2xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all">
      <div className={`h-48 bg-gradient-to-br ${image} relative p-6 flex flex-col justify-end`}>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {rating}
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {tags.map((t: string) => (
            <span key={t} className="text-xs font-medium px-2 py-1 rounded-md bg-bg-muted text-text-secondary border border-border">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Users className="w-4 h-4" />
          <span>{students} students</span>
        </div>
      </div>
    </div>
  )
}
