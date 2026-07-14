import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Zap, Lock, Star, Quote, DollarSign, ShieldCheck, ArrowRight } from "lucide-react";
import rewardedLogo from "@/assets/rewarded-logo.png.asset.json";
import { EarningsPopups } from "@/components/EarningsPopups";
import { EarningsQuiz } from "@/components/EarningsQuiz";

function TrustpilotRow() {
  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2.5 text-sm">
        <span className="font-bold">Excellent</span>
        <span className="inline-flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="flex h-5 w-5 items-center justify-center bg-success"
              style={{ borderRadius: 2 }}
            >
              <Star className="h-3.5 w-3.5 fill-white text-white" />
            </span>
          ))}
        </span>
        <span className="text-muted-foreground">274,977 reviews on</span>
        <span className="inline-flex items-center gap-1 font-bold text-success">
          <Star className="h-4 w-4 fill-success text-success" />
          Trustpilot
        </span>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

function CtaButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-6 py-4 text-center text-base font-bold tracking-wide text-white shadow-cta transition-transform hover:scale-[1.02] active:scale-[0.99] sm:px-8 sm:py-5 sm:text-lg"
    >
      {children}
    </button>
  );
}

function TimeSaverSlider() {
  const MIN = 0;
  const MAX = 40;
  const STEP = 5;
  const [spend, setSpend] = useState(10);
  const hoursSaved = Math.round(spend * 1.8);
  const pct = ((spend - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-border bg-background/40 p-4 text-center sm:p-5">
          <p className="text-[11px] font-bold tracking-widest text-muted-foreground">YOU SPEND</p>
          <p className="mt-1 text-3xl font-black tabular-nums sm:text-4xl">${spend}</p>
          <p className="mt-1 text-[10px] text-muted-foreground">optional in-app</p>
        </div>
        <div className="rounded-2xl border border-orange/40 bg-orange/5 p-4 text-center sm:p-5">
          <p className="text-[11px] font-bold tracking-widest text-muted-foreground">YOU SKIP</p>
          <p className="text-gradient mt-1 text-3xl font-black tabular-nums sm:text-4xl">~{hoursSaved}h</p>
          <p className="mt-1 text-[10px] text-muted-foreground">of grinding</p>
        </div>
      </div>

      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={spend}
        onChange={(e) => setSpend(Number(e.target.value))}
        aria-label="Optional spend to save time"
        className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full accent-orange"
        style={{
          background: `linear-gradient(to right, var(--brand-orange) 0%, var(--brand-pink) ${pct}%, var(--secondary) ${pct}%, var(--secondary) 100%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>$0 (free path)</span>
        <span>${MAX}</span>
      </div>
      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        Your reward comes from completing offer requirements — spending only speeds up game progression.
      </p>
    </div>
  );
}

function Index() {
  const payouts = [
    { letter: "A", name: "Ashley R. · Atlanta, GA", via: "via PayPal · Just now", amount: "+$142.50" },
    { letter: "D", name: "David K. · Austin, TX", via: "via Venmo · 1m ago", amount: "+$88.00" },
    { letter: "P", name: "Priya S. · Seattle, WA", via: "via Bank · 3m ago", amount: "+$210.25" },
  ];
  const tickerItems = [
    "Jake just cashed out $75",
    "Maria just cashed out $128",
    "Tyler just cashed out $42",
    "Sofia just cashed out $210",
    "Marcus just cashed out $63",
    "Emily just cashed out $95",
    "Devon just cashed out $187",
  ];


  const [earningNow, setEarningNow] = useState(8127);
  useEffect(() => {
    const id = setInterval(() => {
      const change = Math.floor(Math.random() * (92 - 23 + 1)) + 23;
      const direction = Math.random() < 0.5 ? -1 : 1;
      setEarningNow((prev) => {
        const next = prev + change * direction;
        return Math.max(8017, Math.min(9000, next));
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);
  const [quizOpen, setQuizOpen] = useState(false);
  const openQuiz = () => setQuizOpen(true);

  const [bufferOpen, setBufferOpen] = useState(true);

  const [tomorrowStr, setTomorrowStr] = useState("");
  useEffect(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    setTomorrowStr(t.toLocaleDateString("en-US", { month: "long", day: "numeric" }).toUpperCase());
  }, []);

  return (
    <>
      <EarningsPopups />
      <EarningsQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />

      {bufferOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card/60 p-6 text-center shadow-2xl sm:p-10">
            <img src={rewardedLogo.url} alt="RewardedPlay" className="mx-auto h-10 w-10 rounded-2xl border border-border shadow-sm" />

            <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
              Click here to continue
            </h1>

            <button
              type="button"
              onClick={() => setBufferOpen(false)}
              className="group relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-8 py-5 text-center text-lg font-bold tracking-wide text-white shadow-cta transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              Continue
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-[440px] px-4 pb-16 pt-6 sm:max-w-3xl sm:px-5 sm:pt-8">
        {/* Brand + live stacking */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center gap-2">
            <img src={rewardedLogo.url} alt="RewardedPlay" className="h-8 w-8 rounded-2xl border border-border shadow-sm sm:h-9 sm:w-9" />
            <span className="text-lg font-black tracking-tight sm:text-xl">rewarded<span className="text-gradient">play</span></span>
          </a>
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-orange/40 bg-card/60 px-2.5 py-1.5 text-[11px] font-semibold sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-success">Live</span>
            <span className="text-muted-foreground">·</span>
            <span className="tabular-nums">{earningNow.toLocaleString("en-US")}</span>
            <span className="hidden text-muted-foreground sm:inline">earning now</span>
          </span>
        </div>

        {/* Live cashout ticker */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="flex items-center gap-3 border-b border-border/60 px-4 py-2 sm:px-5 sm:py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <p className="text-[11px] font-bold tracking-widest text-muted-foreground">LIVE CASHOUTS</p>
          </div>
          <div className="group relative flex overflow-hidden">
            <div className="flex shrink-0 animate-[ticker_30s_linear_infinite] gap-6 whitespace-nowrap py-2.5 pl-4 pr-6 text-[13px] sm:gap-8 sm:py-3 sm:pl-5 sm:pr-8 sm:text-sm">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <DollarSign className="h-3.5 w-3.5 text-success" />
                  <span className="text-foreground/90">{t}</span>
                  <span className="text-muted-foreground">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-[10px] font-bold tracking-widest text-orange sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs">
            <Zap className="h-3 w-3 fill-orange sm:h-3.5 sm:w-3.5" />
            CLAIM YOUR WELCOME BONUS BEFORE {tomorrowStr}
            <Zap className="h-3 w-3 fill-orange sm:h-3.5 sm:w-3.5" />
          </span>

          <h1 className="mt-5 text-[clamp(2.25rem,10vw,3rem)] font-black leading-[1.05] tracking-tight sm:mt-6 sm:text-6xl">
            STOP GRINDING.
            <br />
            <span className="text-gradient">GET PAID.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:mt-5 sm:text-lg">
            Real cash for playing games, testing apps and killing 10 minutes on your phone.
            Cash out on demand to PayPal, Venmo or your bank — no waiting weeks.
          </p>
        </section>


        {/* Trustpilot + Stats */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-b border-border/60 bg-background/30 px-4 py-3 text-[13px] sm:px-5 sm:py-4 sm:text-sm">
            <span className="font-extrabold tracking-tight">Excellent</span>
            <span className="inline-flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="flex h-4 w-4 items-center justify-center bg-success sm:h-5 sm:w-5"
                  style={{ borderRadius: 2 }}
                >
                  <Star className="h-3 w-3 fill-white text-white sm:h-3.5 sm:w-3.5" />
                </span>
              ))}
            </span>
            <span className="text-muted-foreground">
              <span className="font-bold text-foreground tabular-nums">274,977</span> reviews on
            </span>
            <span className="inline-flex items-center gap-1 font-extrabold text-success">
              <Star className="h-4 w-4 fill-success text-success" />
              Trustpilot
            </span>
          </div>

          <div className="grid grid-cols-3 divide-x divide-border/60">
            {[
              { value: "2M+", label: "Active members" },
              { value: "200+", label: "Reward options" },
              { value: "4.6★", label: "Member rating" },
            ].map((s) => (
              <div key={s.label} className="px-2 py-4 text-center sm:px-3 sm:py-6">
                <p className="text-gradient text-xl font-black tracking-tight sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-10 rounded-3xl border border-orange/30 bg-card/40 p-5 sm:p-8">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-widest text-orange sm:text-xs">HOW IT WORKS</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">3 steps. First payout in days.</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-3">
            {[
              { n: "1", title: "Sign up in 60 seconds", desc: "No card. No commitment. Welcome bonus hits your account instantly." },
              { n: "2", title: "Smash offers", desc: "Play games, test apps, take surveys. Every reward is 100% earnable free.", boost: "Pro move: drop a couple bucks in-game to skip hours of grinding and hit the payout milestone way sooner." },
              { n: "3", title: "Cash out — fast", desc: "PayPal, Venmo or bank. Days, not weeks. No hoops." },
            ].map((s) => (
              <div key={s.n} className="relative flex items-start gap-3 rounded-2xl border border-border bg-card/50 p-4 sm:block sm:p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-black text-white shadow-glow sm:h-10 sm:w-10 sm:text-base">
                  {s.n}
                </div>
                <div className="min-w-0 sm:mt-4">
                  <p className="text-base font-bold sm:text-lg">{s.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{s.desc}</p>
                  {s.boost && (
                    <p className="mt-2 text-xs font-semibold text-orange sm:text-sm">{s.boost}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaButton onClick={openQuiz}>CLAIM MY WELCOME BONUS NOW</CtaButton>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] text-muted-foreground sm:text-xs">
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" /> Encrypted
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-success" /> No credit card
              </span>
              <span>· Cancel anytime</span>
            </p>
          </div>
        </section>

        {/* Time-saver simulator */}
        <section className="mt-10 rounded-3xl border border-border bg-card/40 p-5 sm:p-8">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-widest text-orange sm:text-xs">TIME-SAVER SIMULATOR</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              See how many <span className="text-gradient font-bold">hours you can skip</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every reward is 100% earnable free. A few bucks in-game just deletes the grind and drops you at the payout faster.
            </p>
          </div>

          <TimeSaverSlider />
        </section>

        {/* Top earner today */}
        <section className="mt-8 rounded-3xl border border-orange/30 bg-gradient-to-br from-card/80 to-card/40 p-5 sm:p-8">
          <p className="text-[11px] font-bold tracking-widest text-orange sm:text-xs">FASTEST TO PAYOUT TODAY</p>
          <div className="mt-4 flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-lg font-black text-white shadow-glow sm:h-14 sm:w-14 sm:text-xl">
              A
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold sm:text-lg">Alex R.</p>
              <p className="text-xs text-muted-foreground sm:text-sm">San Diego, CA · Verified</p>
              <p className="mt-1 text-[10px] font-bold tracking-widest text-orange">DELETED 26 HOURS OF GRINDING</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-gradient text-xl font-black sm:text-3xl">2 days</p>
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground">TO PAYOUT</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Same reward. Same payout. Alex just spent a few bucks in-game to skip the grind and cash out sooner.
          </p>
        </section>

        {/* Mid CTA */}
        <section className="mt-10 rounded-3xl border border-border bg-card/60 p-6 text-center sm:p-8">
          <span className="inline-block rounded-full bg-orange/15 px-3 py-1 text-[11px] font-bold tracking-widest text-orange sm:text-xs">
            ⚡ WELCOME BONUS · TODAY ONLY
          </span>
          <h3 className="mx-auto mt-4 max-w-md text-2xl font-extrabold sm:text-3xl">
            Your first payout is <span className="text-gradient font-bold">days away — not weeks.</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {earningNow.toLocaleString("en-US")} people are cashing in right now. Don't be the one still scrolling.
          </p>
          <div className="mt-6">
            <CtaButton onClick={openQuiz}>GET ME IN</CtaButton>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground sm:text-xs">Instant access · No card · Welcome bonus auto-credited</p>
        </section>

        {/* Testimonial */}
        <section className="mt-8 rounded-3xl border border-orange/30 bg-gradient-to-br from-card/80 to-card/40 p-5 sm:p-8">
          <Quote className="h-7 w-7 text-orange sm:h-8 sm:w-8" />
          <p className="mt-4 text-lg font-semibold leading-snug sm:text-2xl">
            "First <span className="text-gradient font-bold">$700</span> came 100% free. Then I dropped <span className="text-gradient font-bold">$11</span> in-game to skip the grind and hit the exact same payout in <span className="text-gradient font-bold">2 days instead of a week</span>. Best time-for-money trade I've ever made."
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand font-bold text-white sm:h-11 sm:w-11">
              M
            </div>
            <div className="min-w-0">
              <p className="font-semibold">Marcus T.</p>
              <p className="text-xs text-muted-foreground">Verified user · Phoenix, AZ</p>
            </div>
            <div className="ml-auto flex">
              {[0,1,2,3,4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-orange text-orange" />
              ))}
            </div>
          </div>
        </section>

        {/* Tester level */}
        <section className="mt-10 rounded-3xl border border-border bg-card/60 p-5 sm:p-8">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-widest text-orange sm:text-xs">TESTER LEVELS</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              How much can you pull from your <span className="text-gradient font-bold">phone?</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              More offers cleared = bigger daily bag. Simple math.
            </p>
            <span className="mt-3 inline-flex rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-[10px] font-bold tracking-widest text-orange">
              YOU · BRONZE
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {[
              { tier: "Bronze", emoji: "🥉", note: "Rookie tier. First payout hits fast.", avg: "$15–$40", pct: 22, active: true },
              { tier: "Silver", emoji: "🥈", note: "You've got the rhythm. Steady daily cash.", avg: "$60–$120", pct: 45 },
              { tier: "Gold", emoji: "🥇", note: "Serious money. Consistent payouts every day.", avg: "$150–$280", pct: 72 },
              { tier: "Diamond", emoji: "💎", note: "VIP tier. Highest-payout offers unlocked.", avg: "$400–$800", pct: 95, tip: "Insider move: Diamond users drop a few bucks in-game to nuke the grind and cash out same-day." },
            ].map((t) => (
              <div
                key={t.tier}
                className={`rounded-2xl border bg-background/30 p-4 sm:p-5 ${t.active ? "border-orange/60" : "border-border"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center text-2xl leading-none">
                    {t.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="min-w-0 truncate text-base font-bold sm:text-lg">
                        {t.tier}
                      </p>
                      <p className="text-gradient whitespace-nowrap text-sm font-black sm:text-lg">{t.avg}<span className="ml-1 text-[9px] font-bold tracking-widest text-muted-foreground">/DAY</span></p>
                    </div>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{t.note}</p>
                    {t.tip && (
                      <p className="mt-1 text-xs leading-snug text-orange sm:text-sm">{t.tip}</p>
                    )}
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${t.pct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New user challenge */}
        <section className="mt-10 rounded-3xl border border-orange/30 bg-card/60 p-6 text-center sm:p-8">
          <p className="text-[11px] font-bold tracking-widest text-orange sm:text-xs">NEW USER CHALLENGE</p>
          <h3 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
            Complete 3 offers in 24h → <span className="text-gradient">FREE $250</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">Auto-credited when you hit the offer milestones. No purchase required.</p>
        </section>

        {/* Top offer today */}
        <section className="mt-10 rounded-3xl border border-border bg-card/60 p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold tracking-widest text-orange sm:text-xs">TOP OFFER TODAY</p>
              <h3 className="mt-1 truncate text-xl font-extrabold sm:text-3xl">Mobile Game #115</h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">sign-up to unlock the game</p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-lg font-black text-white shadow-glow">
              ?
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {[
              { task: "Play for 15 minutes", reward: "$15", note: "Free milestone" },
              { task: "Reach Level 10", reward: "$25", note: "Free milestone" },
              { task: "Reach Level 25", reward: "$55", note: "Insider move: skip ~4h grind with a small in-game purchase" },
            ].map((deal, i) => (
              <div key={deal.task} className="relative">
                <span className="absolute -top-2 left-3 z-10 rounded-full bg-orange px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Milestone {i + 1}
                </span>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/40 px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="text-sm font-bold sm:text-base">{deal.task}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{deal.note}</p>
                  </div>
                  <p className="text-gradient shrink-0 text-base font-black sm:text-lg">{deal.reward}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground">
            You get paid when the milestone hits — not for spending. Purchases just kill the grind.
          </p>
        </section>

        {/* Recent payouts */}
        <section className="mt-8">
          <p className="text-[11px] font-bold tracking-widest text-muted-foreground sm:text-xs">RECENT PAYOUTS</p>
          <div className="mt-4 space-y-3">
            {payouts.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-3 sm:gap-4 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-bold sm:h-11 sm:w-11">
                  {p.letter}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">{p.via}</p>
                </div>
                <p className="text-base font-bold text-success sm:text-lg">{p.amount}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-orange text-orange" />
                ))}
              </div>
              <p className="text-sm font-semibold">
                4.8<span className="text-muted-foreground"> · 12,400 reviews</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-gradient text-2xl font-black">$2.48M+</p>
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground">PAID OUT</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 text-center sm:mt-20">
          <h2 className="text-3xl font-black sm:text-4xl">60 seconds to your first bonus.</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Every minute you scroll is money someone else is cashing out.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <CtaButton onClick={openQuiz}>CLAIM MY SPOT NOW</CtaButton>
          </div>
          <div className="mt-6">
            <TrustpilotRow />
          </div>
          <p className="mx-auto mt-8 max-w-md text-[11px] text-muted-foreground sm:text-xs">
            18+ only. Rewards & payouts subject to T&Cs. Not affiliated with Apple, Google or any
            advertised brand.
          </p>
        </section>
      </main>
    </>
  );
}
