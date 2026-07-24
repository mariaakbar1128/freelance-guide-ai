import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState, ResultCard } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/gig")({
  head: () => ({
    meta: [
      { title: "Fiverr Gig Generator — FreelanceLaunch AI" },
      { name: "description", content: "Create SEO-optimized Fiverr gigs with titles, descriptions, tags, pricing, and FAQs." },
      { property: "og:title", content: "AI Fiverr Gig Generator" },
      { property: "og:description", content: "Rank higher and convert better on Fiverr." },
    ],
  }),
  component: Gig,
});

type Result = {
  title: string;
  description: string;
  tags: string[];
  pricing: { tier: string; price: string; includes: string }[];
  faqs: { q: string; a: string }[];
};

function Gig() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [service, setService] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult({
        title: `I will write SEO-optimized ${service || "blog articles"} that rank on Google`,
        description: `Are you looking for high-quality ${service || "content"} that drives real traffic and conversions? You're in the right place! I craft engaging, well-researched, plagiarism-free ${service || "content"} tailored to your audience. Every piece is optimized for SEO, formatted for readability, and delivered on time.\n\nWhat you get:\n• 100% original, human-written content\n• Keyword-optimized structure\n• Fast delivery + free revisions\n\nMessage me before ordering so we can align on scope.`,
        tags: ["seo writing", "blog articles", "content writing", "copywriter", "article writing"],
        pricing: [
          { tier: "Basic", price: "$15", includes: "500 words • 1 keyword • 2-day delivery" },
          { tier: "Standard", price: "$35", includes: "1200 words • 3 keywords • 3-day delivery" },
          { tier: "Premium", price: "$75", includes: "2500 words • SEO audit • 5-day delivery" },
        ],
        faqs: [
          { q: "Will the content be plagiarism-free?", a: "Yes, 100%. Every piece is written from scratch and checked with Copyscape." },
          { q: "Do you offer revisions?", a: "Absolutely — up to 2 free revisions on every order." },
          { q: "How fast can you deliver?", a: "Standard delivery is 2–5 days depending on the tier. Rush available." },
        ],
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">
      <PageHeader icon={ShoppingBag} title="Fiverr Gig Generator" description="Generate SEO-optimized gigs that get clicks and orders." />

      <Card className="mb-6 border-border/60 shadow-soft">
        <CardContent className="p-6">
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs">What service do you want to offer?</Label>
              <Input required placeholder="e.g. logo design, SEO blog writing, video editing" value={service} onChange={(e) => setService(e.target.value)} />
            </div>
            <Button type="submit" className="bg-gradient-primary" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
              {loading ? "Generating..." : "Generate Gig"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {!result && !loading && <EmptyState title="Your gig will appear here" description="Enter a service and let AI build a full Fiverr gig." />}
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <ResultCard title="SEO-Optimized Gig Title" copyText={result.title}>
            <p className="text-base font-semibold">{result.title}</p>
          </ResultCard>

          <ResultCard title="Gig Description" copyText={result.description}>
            <p className="whitespace-pre-line">{result.description}</p>
          </ResultCard>

          <ResultCard title="Search Tags" copyText={result.tags.join(", ")}>
            <div className="flex flex-wrap gap-2">
              {result.tags.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          </ResultCard>

          <Card className="border-border/60 shadow-soft">
            <CardHeader><CardTitle className="text-base">Pricing Packages</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {result.pricing.map((p) => (
                  <div key={p.tier} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                    <div className="text-xs font-semibold uppercase text-primary">{p.tier}</div>
                    <div className="mt-1 text-2xl font-bold">{p.price}</div>
                    <p className="mt-2 text-xs text-muted-foreground">{p.includes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-soft">
            <CardHeader><CardTitle className="text-base">FAQs</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {result.faqs.map((f) => (
                <div key={f.q} className="rounded-lg border border-border/50 p-3">
                  <p className="font-semibold">{f.q}</p>
                  <p className="mt-1 text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
