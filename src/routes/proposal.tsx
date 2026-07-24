import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState, ResultCard } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/proposal")({
  head: () => ({
    meta: [
      { title: "Proposal Generator — FreelanceLaunch AI" },
      { name: "description", content: "Generate winning freelance proposals tailored to your client project, budget, and deadline." },
      { property: "og:title", content: "AI Proposal Generator" },
      { property: "og:description", content: "Write high-converting proposals in seconds." },
    ],
  }),
  component: Proposal,
});

function Proposal() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ intro: string; why: string; body: string; close: string } | null>(null);
  const [form, setForm] = useState({ details: "", budget: "", deadline: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult({
        intro:
          "Hi there! I read your project brief carefully and I'm genuinely excited about it. You need a reliable freelancer who can deliver quality work within your budget and timeline — and that's exactly what I do.",
        why:
          "I've helped clients like you achieve clear, measurable results with a focus on communication, on-time delivery, and revisions until you're 100% happy. My process is simple: understand your goals → deliver a first draft fast → refine together.",
        body:
          `Based on your requirements, I can deliver the full scope within your ${form.deadline || "requested"} timeline and ${form.budget ? `$${form.budget}` : "budget"}. I'll break the work into clear milestones so you always know what's next.`,
        close:
          "I'd love to jump on a quick chat to align on details. Please send me a message and I'll get started right away.\n\nThanks for considering my proposal!",
      });
      setLoading(false);
    }, 800);
  };

  const fullText = result
    ? [result.intro, "\n\nWhy Hire Me:\n" + result.why, "\n\n" + result.body, "\n\n" + result.close].join("")
    : "";

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">
      <PageHeader icon={FileText} title="Proposal Generator" description="Turn a client brief into a persuasive, ready-to-send proposal." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="border-border/60 shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Client Project Details</Label>
                <Textarea required rows={6} placeholder="Paste the job description here..." value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Budget (USD)</Label>
                  <Input type="number" placeholder="200" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Deadline</Label>
                  <Input placeholder="7 days" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                {loading ? "Writing..." : "Generate Proposal"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-3">
          {!result && !loading && <EmptyState title="Your proposal will appear here" description="Fill in the project details and generate." />}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-border/60 bg-card">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {result && (
            <ResultCard title="Generated Proposal" copyText={fullText}>
              <div>
                <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">Introduction</h4>
                <p className="whitespace-pre-line">{result.intro}</p>
              </div>
              <div>
                <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">Why Hire Me</h4>
                <p className="whitespace-pre-line">{result.why}</p>
              </div>
              <div>
                <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">Approach</h4>
                <p className="whitespace-pre-line">{result.body}</p>
              </div>
              <div>
                <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">Closing</h4>
                <p className="whitespace-pre-line">{result.close}</p>
              </div>
            </ResultCard>
          )}
        </div>
      </div>
    </div>
  );
}
