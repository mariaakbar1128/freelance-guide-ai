import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Gauge, Loader2, CheckCircle2, AlertTriangle, XCircle, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/readiness")({
  head: () => ({
    meta: [
      { title: "Readiness Score — FreelanceLaunch AI" },
      { name: "description", content: "Analyze your freelancing readiness with a personalized score, strengths, weaknesses, and improvement tips." },
      { property: "og:title", content: "Freelancing Readiness Score" },
      { property: "og:description", content: "Know exactly what to improve before pitching clients." },
    ],
  }),
  component: Readiness,
});

type Result = {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missing: string[];
  tips: string[];
};

function Readiness() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult({
        score: 72,
        strengths: ["Clear skill focus", "Strong English communication", "Consistent daily availability"],
        weaknesses: ["Portfolio has only 1 sample", "No client testimonials yet"],
        missing: ["SEO basics", "Client onboarding process", "Case study writing"],
        tips: [
          "Add 2 more portfolio samples this week",
          "Offer 1 free project to a friend and collect a testimonial",
          "Take a free 2-hour SEO course",
          "Draft an onboarding checklist for future clients",
        ],
      });
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">
      <PageHeader icon={Gauge} title="Freelancing Readiness Score" description="See how close you are to landing your first client — and what to fix." />

      <Card className="mb-6 border-border/60 shadow-soft">
        <CardHeader><CardTitle className="text-base">Describe your current profile</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Your background, skills, portfolio, tools, and experience</Label>
              <Textarea required rows={5} placeholder="Tell us about your current skills, portfolio, and any experience..." value={profile} onChange={(e) => setProfile(e.target.value)} />
            </div>
            <Button type="submit" className="bg-gradient-primary" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Gauge className="mr-2 h-4 w-4" />}
              {loading ? "Analyzing..." : "Analyze My Readiness"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {!result && !loading && <EmptyState title="Your readiness report will appear here" description="Describe your profile to get analyzed." />}
      {loading && (
        <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <Card className="border-primary/30 bg-gradient-primary text-primary-foreground shadow-elegant">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide opacity-80">Readiness Score</div>
                  <div className="mt-1 text-5xl font-extrabold">{result.score}<span className="text-2xl opacity-70">/100</span></div>
                </div>
                <div className="text-right text-sm opacity-90">
                  {result.score >= 80 ? "Ready to pitch!" : result.score >= 60 ? "Almost there — polish a few areas." : "Focus on the fundamentals first."}
                </div>
              </div>
              <div className="mt-4">
                <Progress value={result.score} className="h-3 bg-white/20 [&>div]:bg-white" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <AnalyticsCard icon={CheckCircle2} title="Strengths" items={result.strengths} tone="text-success" />
            <AnalyticsCard icon={AlertTriangle} title="Weaknesses" items={result.weaknesses} tone="text-amber-500" />
            <AnalyticsCard icon={XCircle} title="Missing Skills" items={result.missing} tone="text-destructive" />
          </div>

          <Card className="border-border/60 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Lightbulb className="h-4 w-4 text-primary" /> Improvement Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {result.tips.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function AnalyticsCard({ icon: Icon, title, items, tone }: { icon: typeof CheckCircle2; title: string; items: string[]; tone: string }) {
  return (
    <Card className="border-border/60 shadow-soft">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 text-base`}>
          <Icon className={`h-4 w-4 ${tone}`} /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {items.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone.replace("text-", "bg-")}`} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
