import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, PenTool, Palette, Headphones, Code, Megaphone, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Free Learning Resources — FreelanceLaunch AI" },
      { name: "description", content: "Curated free learning resources for content writing, design, VA, web dev, and marketing." },
      { property: "og:title", content: "Free Freelancing Resources" },
      { property: "og:description", content: "Handpicked free courses to level up your freelancing skills." },
    ],
  }),
  component: Resources,
});

const categories = [
  {
    title: "Content Writing",
    icon: PenTool,
    items: [
      { name: "HubSpot Content Marketing", url: "https://academy.hubspot.com/courses/content-marketing" },
      { name: "Copyhackers Blog", url: "https://copyhackers.com/" },
      { name: "Grammarly Handbook", url: "https://www.grammarly.com/handbook" },
    ],
  },
  {
    title: "Graphic Design",
    icon: Palette,
    items: [
      { name: "Canva Design School", url: "https://www.canva.com/designschool/" },
      { name: "Figma Learn", url: "https://help.figma.com/hc/en-us/categories/360002051613" },
      { name: "Adobe Express Tutorials", url: "https://www.adobe.com/express/learn" },
    ],
  },
  {
    title: "Virtual Assistance",
    icon: Headphones,
    items: [
      { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage" },
      { name: "Notion Fundamentals", url: "https://www.notion.so/help/guides" },
      { name: "Trello Guides", url: "https://trello.com/guide" },
    ],
  },
  {
    title: "Web Development",
    icon: Code,
    items: [
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
      { name: "The Odin Project", url: "https://www.theodinproject.com/" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
    ],
  },
  {
    title: "Digital Marketing",
    icon: Megaphone,
    items: [
      { name: "Google Skillshop", url: "https://skillshop.withgoogle.com/" },
      { name: "Meta Blueprint", url: "https://www.facebook.com/business/learn" },
      { name: "Ahrefs SEO Course", url: "https://ahrefs.com/academy" },
    ],
  },
];

function Resources() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-10">
      <PageHeader icon={BookOpen} title="Free Learning Resources" description="Handpicked, high-quality free resources for every top freelancing skill." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.title} className="border-border/60 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
            <CardHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <c.icon className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2 text-base">{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {c.items.map((r) => (
                  <li key={r.name}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-muted/30 p-3 text-sm transition hover:border-primary/40 hover:bg-accent"
                    >
                      <span className="truncate">{r.name}</span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
