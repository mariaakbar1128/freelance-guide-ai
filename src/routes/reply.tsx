import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, Loader2, Briefcase, Smile, ScrollText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState, ResultCard } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/reply")({
  head: () => ({
    meta: [
      { title: "Client Reply Assistant — FreelanceLaunch AI" },
      { name: "description", content: "Reply to client messages in professional, friendly, or formal tones instantly." },
      { property: "og:title", content: "AI Client Reply Assistant" },
      { property: "og:description", content: "Craft the perfect client reply in three tones." },
    ],
  }),
  component: Reply,
});

function Reply() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [replies, setReplies] = useState<{ professional: string; friendly: string; formal: string } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setReplies({
        professional:
          "Hi there,\n\nThank you for reaching out. I've reviewed your message and I'd be happy to help. Based on what you've shared, I can deliver this within the required timeline. Could you confirm a few details so I can send over an accurate scope? Looking forward to working together.\n\nBest regards.",
        friendly:
          "Hey! Thanks so much for the message — this sounds like a fun project 😊 I'd love to jump in. Could you share a couple more details so I can put together a plan you'll love? Talk soon!",
        formal:
          "Dear Client,\n\nI acknowledge receipt of your inquiry and appreciate your consideration. I have reviewed the requirements and would be pleased to proceed. Kindly provide the additional information requested at your earliest convenience so I may prepare a formal proposal.\n\nSincerely.",
      });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">
      <PageHeader icon={MessageSquare} title="Client Reply Assistant" description="Turn any client message into a polished reply in three tones." />

      <Card className="mb-6 border-border/60 shadow-soft">
        <CardHeader><CardTitle className="text-base">Paste client message</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Client Message</Label>
              <Textarea required rows={5} placeholder="Paste what the client wrote..." value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <Button type="submit" className="bg-gradient-primary" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
              {loading ? "Generating..." : "Generate Replies"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {!replies && !loading && <EmptyState title="Your replies will appear here" description="Paste a client message and generate three tones." />}
      {loading && (
        <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {replies && (
        <Tabs defaultValue="professional">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="professional"><Briefcase className="mr-1.5 h-4 w-4" />Professional</TabsTrigger>
            <TabsTrigger value="friendly"><Smile className="mr-1.5 h-4 w-4" />Friendly</TabsTrigger>
            <TabsTrigger value="formal"><ScrollText className="mr-1.5 h-4 w-4" />Formal</TabsTrigger>
          </TabsList>
          <TabsContent value="professional" className="mt-4">
            <ResultCard title="Professional Reply" copyText={replies.professional}>
              <p className="whitespace-pre-line">{replies.professional}</p>
            </ResultCard>
          </TabsContent>
          <TabsContent value="friendly" className="mt-4">
            <ResultCard title="Friendly Reply" copyText={replies.friendly}>
              <p className="whitespace-pre-line">{replies.friendly}</p>
            </ResultCard>
          </TabsContent>
          <TabsContent value="formal" className="mt-4">
            <ResultCard title="Formal Reply" copyText={replies.formal}>
              <p className="whitespace-pre-line">{replies.formal}</p>
            </ResultCard>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
