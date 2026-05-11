import logo from "@/assets/nb-logo.jpg";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        <a href="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 md:static md:translate-x-0">
          <img
            src={logo}
            alt="Newsbureau Nepal logo"
            width={200}
            height={70}
            className="h-12 w-auto object-contain sm:h-14 md:h-16"
          />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="https://enewsbureau.com" className="hover:text-foreground">Home</a>
          <a href="#check" className="hover:text-foreground">Check Result</a>
          <a href="https://enewsbureau.com" className="hover:text-foreground">News</a>
        </nav>
        <a
          href="#check"
          className="whitespace-nowrap rounded-full bg-gradient-to-r from-[color:var(--brand-red)] to-[oklch(0.62_0.2_30)] px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 sm:px-4 sm:py-2 sm:text-xs"
        >
          Check Result
        </a>
      </div>
    </header>
  );
}
