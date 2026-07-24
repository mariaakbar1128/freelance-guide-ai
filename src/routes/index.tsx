import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  FileText,
  ShoppingBag,
  MessageSquare,
  Map,
  DollarSign,
  Gauge,
  BookOpen,
  ArrowRight,
  Users,
  Briefcase,
  TrendingUp,
  Star,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreelanceLaunch AI" },
      {
        name: "description",
        content:
          "Your AI-powered dashboard to launch and grow a freelancing career. Get matched to skills, write proposals, generate Fiver gigs  and build a personalize roadmap.",
      },
      { property: "og:title", content: "FreelanceLaunch AI" },
      {
        property: "og:description",
        content: "Your AI-powered dashboard to launch and grow a freelancing career. Get matched to skills, write proposals, generate Fiver gigs  and build a personalize roadmap.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  { icon: Sparkles, title: "AI Skill Match", desc: "Find the perfect freelancing skill based on your profile.", to: "/skill-match" },
  { icon: FileText, title: "Proposal Generator", desc: "Write winning proposals that land clients.", to: "/proposal" },
  { icon: ShoppingBag, title: "Fiverr Gig Generator", desc: "SEO-optimized gigs with tags and pricing.", to: "/gig" },
  { icon: MessageSquare, title: "Client Reply Assistant", desc: "Reply to clients in professional tones.", to: "/reply" },
  { icon: Map, title: "Learning Roadmap", desc: "A personalized 30-day path to become hire-ready.", to: "/roadmap" },
  { icon: DollarSign, title: "Pricing Assistant", desc: "Set the right price at every experience level.", to: "/pricing" },
] as const;

const stats = [
  { icon: Users, label: "Active Learners", value: "12,480+" },
  { icon: Briefcase, label: "Proposals Generated", value: "38,120" },
  { icon: TrendingUp, label: "Avg. Skill Match", value: "94%" },
  { icon: Star, label: "User Rating", value: "4.9/5" },
];

const testimonials = [
  { name: "Ayesha K.", role: "Content Writer", text: "I landed my first Fiverr order in 8 days using the AI Skill Match and gig generator!" },
  { name: "Daniel M.", role: "Graphic Designer", text: "The proposal generator saved me hours. My reply rate jumped 3x." },
  { name: "Priya S.", role: "VA Freelancer", text: "The 30-day roadmap kept me consistent. Now I earn $600/mo part-time." },
];

const activity = [
  { text: "AI matched you with 'Content Writing' at 92% confidence", time: "2h ago" },
  { text: "Generated proposal for 'Blog Rewrite Project'", time: "Yesterday" },
  { text: "Completed Day 4 of Learning Roadmap", time: "2 days ago" },
];

function Dashboard() {
  return (
    <div className="min-h-full bg-gradient-subtle">
      <div className="mx-auto max-w-7xl space-y-10 p-4 sm:p-6 lg:p-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 shadow-elegant sm:p-10 lg:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Your AI Freelancing Mentor
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "Sora, Inter, sans-serif" }}>
              Launch Your Freelancing Career with AI Guidance
            </h1>
            <p className="mt-4 text-base opacity-90 sm:text-lg">
              From choosing the right skill to writing winning proposals — FreelanceLaunch AI walks
              you through every step to your first paying client.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/skill-match">
                  Find My Skill <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 font-semibold text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
                <Link to="/readiness">Check Readiness</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="border-border/60 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elegant">
              <CardContent className="flex items-center gap-3 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Quick actions */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Explore Features</h2>
              <p className="text-sm text-muted-foreground">Everything you need to go from zero to freelancer.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link key={f.title} to={f.to} className="group">
                <Card className="h-full border-border/60 shadow-soft transition group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-elegant">
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="flex items-center justify-between gap-2 text-base">
                      {f.title}
                      <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent activity + resources */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="border-border/60 shadow-soft lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Your latest actions on FreelanceLaunch AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-soft">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2 text-base">Free Resources</CardTitle>
              <CardDescription>Curated learning paths across top freelancing skills.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/resources">Browse Library <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Loved by Freelancers</h2>
            <p className="text-sm text-muted-foreground">Real students. Real first-orders.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/60 shadow-soft">
                <CardContent className="p-5">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">"{t.text}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/60 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">FreelanceLaunch AI</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <p className="text-xs text-muted-foreground">Built to help beginners win their first freelance client.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
