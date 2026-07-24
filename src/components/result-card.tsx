import { Copy, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function ResultCard({
  title,
  children,
  copyText,
}: {
  title: string;
  children: ReactNode;
  copyText?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (!copyText) return;
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <Card className="border-border/60 shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {copyText && (
          <Button variant="outline" size="sm" onClick={onCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed">{children}</CardContent>
    </Card>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-10 text-center">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
