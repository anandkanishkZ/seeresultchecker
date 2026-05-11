import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SEEResultChecker } from "@/components/SEEResultChecker";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEE Result 2082/83 Online Check | Newsbureau Nepal" },
      {
        name: "description",
        content:
          "Check SEE Result 2082/83 online with symbol number. Get instant SEE result notification from Newsbureau Nepal — Nepal's trusted news portal.",
      },
      { property: "og:title", content: "SEE Result 2082/83 Online | Newsbureau Nepal" },
      {
        property: "og:description",
        content:
          "Check your SEE 2082/83 result instantly. Enter your symbol number and get notified by Newsbureau Nepal.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "canonical", href: "https://enewsbureau.com/see-result-2082-83" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[image:var(--gradient-hero)]">
      <SiteHeader />
      <main>
        <SEEResultChecker />
        <Footer />
      </main>
      <Toaster richColors position="top-center" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-muted-foreground sm:text-sm md:flex-row md:gap-3 md:text-left">
        <p>© {new Date().getFullYear()} Newsbureau Nepal. All rights reserved.</p>
        <p>तराई–मधेसको नं.१ डिजिटल समाचार पोर्टल</p>
        <p>
          Developed by{" "}
          <a
            href="https://zwickytechnology.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Zwicky Technology
          </a>
        </p>
      </div>
    </footer>
  );
}
