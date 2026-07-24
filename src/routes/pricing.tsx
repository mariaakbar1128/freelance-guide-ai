import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DollarSign, Loader2, Sparkles, TrendingUp, Award } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing Assistant — FreelanceLaunch AI" },
      { name: "description", content: "Get smart pricing suggestions for beginner, intermediate, and expert freelance levels." },
      { property: "og:title", content: "AI Pricing Assistant" },
      { property: "og:description", content: "Never undersell yourself again." },
    ],
  }),
  component: Pricing,
});

type Tier = { name: string; price: string; icon: typeof Sparkles; color: string; why: string };

function Pricing() {
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState("");
  const [tiers, setTiers] = useState<Tier[] | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setTiers([
        { name: "Beginner", price: "$10 – $25", icon: Sparkles, color: "bg-accent text-accent-foreground", why: "Build reviews fast. Price low to attract first 5 orders, then raise." },
        { name: "Intermediate", price: "$40 – $100", icon: TrendingUp, color: "bg-primary/10 text-primary", why: "With 10+ reviews and a niche, charge for value. Add packages." },
        { name: "Expert", price: "$150 – $500+", icon: Award, color: "bg-gradient-primary text-primary-foreground", why: "Position as a specialist. Sell outcomes, not hours. Add retainers." },
      ]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">
      <PageHeader icon={DollarSign} title="Pricing Assistant" description="Get suggested rates at every experience level." />

      <Card className="mb-6 border-border/60 shadow-soft">
        <CardContent className="p-6">
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs">Your service</Label>
              <Input required placeholder="e.g. logo design, blog writing" value={service} onChange={(e) => setService(e.target.value)} />
            </div>
            <Button type="submit" className="bg-gradient-primary" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DollarSign className="mr-2 h-4 w-4" />}
              {loading ? "Calculating..." : "Get Pricing"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {!tiers && !loading && <EmptyState title="Your pricing tiers will appear here" description="Enter a service to see suggested rates." />}
      {loading && (
        <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {tiers && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className="border-border/60 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              <CardHeader>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${t.color}`}>
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-2 text-base">{t.name}</CardTitle>
                <div className="text-2xl font-extrabold">{t.price}</div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.why}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
