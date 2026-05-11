import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { GraduationCap, Search, Phone, User, MapPin, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import resultHero from "@/assets/result-hero.png";
import { getDistricts } from "nepali-geo-pro-max";

const DISTRICTS = getDistricts().map((district) => district.nameEn);

const schema = z.object({
  symbol: z
    .string()
    .trim()
    .min(4, "Enter a valid symbol number")
    .max(20, "Too long")
    .regex(/^[A-Za-z0-9]+$/, "Only letters and numbers allowed"),
  name: z.string().trim().min(2, "Enter your full name").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^9\d{9}$/, "Enter a valid 10-digit Nepali mobile number"),
  district: z.string().min(1, "Please select your district"),
});

export function SEEResultChecker() {
  const [form, setForm] = useState({ symbol: "", name: "", mobile: "", district: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Result Coming Soon", {
      description:
        "Thank you! We'll notify you on " + form.mobile + " as soon as SEE 2082/83 results are published.",
    });
    setForm({ symbol: "", name: "", mobile: "", district: "" });
  };

  return (
    <section id="check" className="relative mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-20">
      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10">
        {/* Left: Heading + illustration */}
        <div className="order-2 md:order-1">
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            CHECK <span className="text-[color:var(--brand-red)]">SEE RESULT</span>
            <br />
            <span className="bg-gradient-to-r from-[color:var(--brand-teal)] to-[color:var(--primary-glow)] bg-clip-text text-transparent">
              2082 / 83
            </span>
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Get your Secondary Education Examination result the moment it is
            published. Enter your symbol number to register for instant
            notification.
          </p>

          <img
            src={resultHero}
            alt="Student celebrating SEE result"
            width={500}
            height={500}
            loading="lazy"
            className="mt-6 hidden h-auto w-full max-w-md md:block"
          />
        </div>

        {/* Right: Form card */}
        <div className="order-1 md:order-2">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[color:var(--brand-teal)]/30 to-[color:var(--brand-red)]/30 blur-2xl" />
            <form
              onSubmit={onSubmit}
              className="relative rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:rounded-3xl sm:p-6 md:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--brand-teal)] to-[color:var(--primary-glow)] text-primary-foreground shadow-md">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Check SEE Result 2082/83
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Register for instant result notification
                  </p>
                </div>
              </div>

              {/* Coming soon banner */}
              <div
                aria-live="polite"
                className="mb-5 overflow-hidden rounded-xl border border-[color:var(--brand-teal)]/30 bg-[color:var(--brand-teal)]/10 px-4 py-3 text-center"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0 12px, oklch(0.52 0.13 220 / 0.08) 12px 24px)",
                }}
              >
                <span className="text-sm font-semibold text-[color:var(--brand-teal)]">
                  Result Coming Soon
                </span>
              </div>

              <div className="space-y-4">
                <Field
                  id="symbol"
                  icon={<Hash className="h-4 w-4" />}
                  label="Symbol Number"
                  placeholder="Eg. 0284685K"
                  value={form.symbol}
                  onChange={(v) => setForm({ ...form, symbol: v.toUpperCase() })}
                  maxLength={20}
                />
                <Field
                  id="name"
                  icon={<User className="h-4 w-4" />}
                  label="Full Name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  maxLength={80}
                />
                <Field
                  id="mobile"
                  icon={<Phone className="h-4 w-4" />}
                  label="Mobile Number"
                  placeholder="98XXXXXXXX"
                  value={form.mobile}
                  onChange={(v) => setForm({ ...form, mobile: v.replace(/\D/g, "") })}
                  maxLength={10}
                  inputMode="numeric"
                />

                <div className="space-y-1.5">
                  <Label htmlFor="district" className="text-sm font-medium">
                    Select District
                  </Label>
                  <Select
                    value={form.district}
                    onValueChange={(v) => setForm({ ...form, district: v })}
                  >
                    <SelectTrigger id="district" className="h-12 rounded-xl">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="-- Select District --" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {DISTRICTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-[color:var(--brand-red)] to-[oklch(0.62_0.2_30)] text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:shadow-lg hover:brightness-110"
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" /> Check My Result
                  </>
                )}
              </Button>

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                By submitting, you agree to receive SEE result updates from
                Newsbureau Nepal.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  icon,
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  inputMode,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          className="h-12 rounded-xl pl-10"
        />
      </div>
    </div>
  );
}
