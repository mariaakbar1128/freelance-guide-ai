import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Map, Loader2, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap — FreelanceLaunch AI" },
      { name: "description", content: "Personalized 30-day freelancing roadmap with weekly goals, daily tasks, and resources." },
      { property: "og:title", content: "30-Day Freelancing Roadmap" },
      { property: "og:description", content: "A structured path from beginner to first client." },
    ],
  }),
  component: Roadmap,
});

type Week = { title: string; goal: string; days: string[]; resources: string[]; practice: string };

function Roadmap() {
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState("");
  const [plan, setPlan] = useState<Week[] | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const s = skill || "your skill";
      setPlan([
        {
          title: "Week 1 — Foundations",
          goal: `Learn the fundamentals of ${s}`,
          days: ["Intro & tools setup", "Core concept 1", "Core concept 2", "Practice exercise", "Mini project", "Review & notes", "Rest / recap"],
          resources: ["YouTube: freeCodeCamp", "Coursera free audit", "Notion template"],
          practice: "Build 1 small sample project and post it to your portfolio.",
        },
        {
          title: "Week 2 — Portfolio",
          goal: "Create 3 portfolio pieces",
          days: ["Plan projects", "Project 1 build", "Project 1 polish", "Project 2 build", "Project 2 polish", "Project 3", "Publish portfolio"],
          resources: ["Behance / Dribbble", "GitHub Pages", "Notion portfolio"],
          practice: "Publish a Notion or Behance portfolio with 3 works.",
        },
        {
          title: "Week 3 — Fiverr Setup",
          goal: "Launch 3 SEO-optimized gigs",
          days: ["Fiverr research", "Write gig 1", "Write gig 2", "Write gig 3", "Design covers", "Add FAQs & pricing", "Share on social"],
          resources: ["Fiverr Academy", "AI Skill Match tool", "AI Gig Generator"],
          practice: "Publish 3 gigs and share to 3 friends for feedback.",
        },
        {
          title: "Week 4 — Client Outreach",
          goal: "Land your first order",
          days: ["Upwork profile", "10 proposals", "10 proposals", "Refine gigs", "10 proposals", "Follow-up", "Celebrate wins"],
          resources: ["Upwork Academy", "AI Proposal Generator", "AI Reply Assistant"],
          practice: "Send 30+ proposals over the week. Track responses.",
        },
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">
      <PageHeader icon={Map} title="Learning Roadmap" description="A personalized 30-day plan to become hire-ready." />

      <Card className="mb-6 border-border/60 shadow-soft">
        <CardContent className="p-6">
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs">Your target skill</Label>
              <Input required placeholder="e.g. graphic design, content writing" value={skill} onChange={(e) => setSkill(e.target.value)} />
            </div>
            <Button type="submit" className="bg-gradient-primary" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Map className="mr-2 h-4 w-4" />}
              {loading ? "Building..." : "Generate Roadmap"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {!plan && !loading && <EmptyState title="Your 30-day roadmap will appear here" description="Enter the skill you want to master." />}
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {plan && (
        <div className="space-y-4">
          {plan.map((w, idx) => (
            <Card key={w.title} className="border-border/60 shadow-soft">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base">{w.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{w.goal}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">Daily Tasks</h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                    {w.days.map((d, i) => (
                      <div key={i} className="rounded-lg border border-border/60 bg-muted/30 p-2 text-xs">
                        <div className="font-semibold text-primary">Day {idx * 7 + i + 1}</div>
                        <div className="mt-0.5 text-muted-foreground">{d}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">Resources</h4>
                    <div className="flex flex-wrap gap-2">
                      {w.resources.map((r) => (
                        <Badge key={r} variant="secondary">{r}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">Practice</h4>
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{w.practice}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
