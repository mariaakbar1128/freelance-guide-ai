import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Loader2, Target, TrendingUp, CheckCircle2, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/skill-match")({
  head: () => ({
    meta: [
      { title: "AI Skill Match — FreelanceLaunch AI" },
      { name: "description", content: "Get matched to the freelancing skill that fits your background, interests, and goals." },
      { property: "og:title", content: "AI Skill Match" },
      { property: "og:description", content: "Discover your ideal freelancing skill in seconds." },
    ],
  }),
  component: SkillMatch,
});

type Result = {
  skill: string;
  confidence: number;
  reason: string;
  platform: string;
  learn: string[];
  plan: string[];
};

function SkillMatch() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [form, setForm] = useState({
    education: "",
    interests: "",
    skills: "",
    english: "",
    freeTime: "",
    device: "",
    experience: "",
    income: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult({
        skill: "Content Writing & Blog Copywriting",
        confidence: 92,
        reason:
          "Your English level, interest in reading/writing, and low-equipment requirement (mobile-friendly) align strongly with content writing. It has high demand, quick learning curve, and consistent monthly income potential for beginners.",
        platform: "Fiverr (primary) + Upwork (secondary)",
        learn: [
          "SEO Fundamentals (Ahrefs free course)",
          "Copywriting Basics (Copyhackers)",
          "Grammar & Editing (Grammarly, Hemingway)",
          "Niche Research (finance, tech, wellness)",
        ],
        plan: [
          "Week 1: Learn SEO basics + write 3 sample blogs",
          "Week 2: Build a portfolio on Notion or Medium",
          "Week 3: Create 3 Fiverr gigs and optimize SEO tags",
          "Week 4: Send 10 Upwork proposals daily, refine gigs",
        ],
      });
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-10">
      <PageHeader
        icon={Sparkles}
        title="AI Skill Match"
        description="Answer a few questions and get matched to the freelancing skill built for you."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="border-border/60 shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Tell us about you</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <Field label="Education">
                <Input required value={form.education} onChange={(e) => set("education")(e.target.value)} placeholder="e.g. BSc Computer Science" />
              </Field>
              <Field label="Interests">
                <Input required value={form.interests} onChange={(e) => set("interests")(e.target.value)} placeholder="Design, writing, coding..." />
              </Field>
              <Field label="Current Skills">
                <Textarea required value={form.skills} onChange={(e) => set("skills")(e.target.value)} placeholder="What can you do today?" rows={2} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="English Level">
                  <SelectField value={form.english} onChange={set("english")} options={["Basic", "Intermediate", "Advanced", "Native"]} />
                </Field>
                <Field label="Free Time / Day">
                  <SelectField value={form.freeTime} onChange={set("freeTime")} options={["1 hour", "2-3 hours", "4-5 hours", "6+ hours"]} />
                </Field>
                <Field label="Device">
                  <SelectField value={form.device} onChange={set("device")} options={["Laptop", "Mobile", "Both"]} />
                </Field>
                <Field label="Experience">
                  <SelectField value={form.experience} onChange={set("experience")} options={["None", "Beginner", "Some", "Experienced"]} />
                </Field>
              </div>
              <Field label="Monthly Income Goal (USD)">
                <Input required type="number" value={form.income} onChange={(e) => set("income")(e.target.value)} placeholder="500" />
              </Field>
              <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {loading ? "Analyzing..." : "Get My Skill Match"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {!result && !loading && (
            <EmptyState
              title="Your recommendation will appear here"
              description="Fill in the form and let the AI find your best-fit freelancing skill."
            />
          )}
          {loading && (
            <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-border/60 bg-card">
              <div className="text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">Analyzing your profile...</p>
              </div>
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <Card className="border-primary/30 bg-gradient-primary text-primary-foreground shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide opacity-80">
                    <Target className="h-4 w-4" />
                    Your best-fit skill
                  </div>
                  <h2 className="mt-2 text-2xl font-bold">{result.skill}</h2>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs opacity-90">
                      <span>Confidence Score</span>
                      <span className="font-semibold">{result.confidence}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full bg-white" style={{ width: `${result.confidence}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">Why this matches you</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">{result.reason}</CardContent>
              </Card>

              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ExternalLink className="h-4 w-4 text-primary" /> Recommended Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-accent text-accent-foreground">{result.platform}</Badge>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="border-border/60 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrendingUp className="h-4 w-4 text-primary" /> Skills to Learn First
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.learn.map((s) => (
                        <li key={s} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/60 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-base">Beginner Action Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-sm">
                      {result.plan.map((p, i) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {i + 1}
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
