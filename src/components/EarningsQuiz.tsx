import { useEffect, useState } from "react";
import { X, Smartphone, Clock, Sparkles, ArrowRight, Check, Cake } from "lucide-react";
import { CTA_URL, UNDER_21_URL } from "@/lib/constants";

type Answers = {
  age: "21+" | "Under 21" | null;
  platform: "iPhone" | "Android" | "Other" | null;
  time: "<1h" | "1-3h" | "3h+" | null;
  serious: "Yes" | "Maybe" | null;
};

export function EarningsQuiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ age: null, platform: null, time: null, serious: null });
  const [ineligible, setIneligible] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setAnswers({ age: null, platform: null, time: null, serious: null });
      setIneligible(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  // Generous ranges based on answers
  const timeMult = answers.time === "3h+" ? 1.5 : answers.time === "1-3h" ? 1.2 : 1;
  const seriousMult = answers.serious === "Yes" ? 1.25 : 1;
  const baseLow = 90;
  const baseHigh = 320;
  const estLow = Math.round(baseLow * timeMult * seriousMult);
  const estHigh = Math.round(baseHigh * timeMult * seriousMult);
  const boostLow = Math.round(estLow * 2.2);
  const boostHigh = Math.round(estHigh * 2.4);

  const totalSteps = 5; // age + 3 questions + result

  const canNext =
    (step === 0 && answers.age) ||
    (step === 1 && answers.platform) ||
    (step === 2 && answers.time) ||
    (step === 3 && answers.serious);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-cta animate-in zoom-in-95 duration-200 max-h-[95dvh] sm:max-h-[90vh] sm:min-h-[640px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 shrink-0">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground">
              EARNINGS QUIZ
            </p>
            <p className="text-sm font-extrabold">
              {ineligible ? "Not eligible" : step < 4 ? `Step ${step + 1} of 4` : "Your estimate"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quiz"
            className="rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 w-full bg-secondary shrink-0">
          <div
            className="h-full bg-gradient-brand transition-all duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
          {!ineligible && step < 4 && (
            <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Answer the below questions to see what you can earn today
            </p>
          )}

          {ineligible && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Cake className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">
                Redirecting you to a better match…
              </h3>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Hang tight — we're taking you to an offer available for your age.
              </p>
              <a
                href={UNDER_21_URL}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-8 py-4 text-base font-bold tracking-wide text-white shadow-cta transition hover:scale-[1.02] active:scale-[0.99]"
              >
                Continue
              </a>
            </div>
          )}

          {!ineligible && step === 0 && (
            <Question
              icon={<Cake className="h-5 w-5" />}
              title="Are you 21 or older?"
              options={["21+", "Under 21"]}
              labels={["Yes, I'm 21 or older", "No, I'm under 21"]}
              emojis={["✅", "🚫"]}
              selected={answers.age}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, age: v as Answers["age"] }));
                setStep(1);
              }}
            />
          )}

          {!ineligible && step === 1 && (
            <Question
              icon={<Smartphone className="h-5 w-5" />}
              title="What phone do you use?"
              options={["iPhone", "Android", "Other"]}
              emojis={["🍎", "🤖", "📱"]}
              selected={answers.platform}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, platform: v as Answers["platform"] }));
                setStep(2);
              }}
            />
          )}

          {!ineligible && step === 2 && (
            <Question
              icon={<Clock className="h-5 w-5" />}
              title="How much time can you spend per day?"
              options={["<1h", "1-3h", "3h+"]}
              labels={["Less than 1 hour", "1 to 3 hours", "More than 3 hours"]}
              emojis={["⏱️", "⏰", "🔥"]}
              selected={answers.time}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, time: v as Answers["time"] }));
                setStep(3);
              }}
            />
          )}

          {!ineligible && step === 3 && (
            <Question
              icon={<Sparkles className="h-5 w-5" />}
              title="Are you serious about earning money from your phone?"
              options={["Yes", "Maybe"]}
              labels={["Yes, I'm ready to start", "I'm just exploring"]}
              emojis={["💪", "🤔"]}
              selected={answers.serious}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, serious: v as Answers["serious"] }));
                setStep(4);
              }}
            />
          )}

          {!ineligible && step === 4 && (
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-[11px] font-bold tracking-widest text-success">
                <Check className="h-3.5 w-3.5" /> ESTIMATE READY
              </span>
              <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                Here's what you can earn
              </h3>

              <div className="mt-5 rounded-2xl border border-border bg-background/40 p-5">
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground">
                  YOUR ESTIMATE
                </p>
                <p className="text-gradient mt-1 text-3xl font-black tabular-nums sm:text-4xl">
                  ${estLow}–${estHigh}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">daily</p>
              </div>

              <div className="mt-3 rounded-2xl border border-orange/40 bg-orange/5 p-5">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <p className="text-[11px] font-bold tracking-widest text-orange">
                    YOU'RE ELIGIBLE FOR BOOSTED EARNINGS
                  </p>
                  <span className="rounded-full bg-orange px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                    DAILY
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-orange/40 bg-orange/15 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-orange">
                    <Clock className="h-3 w-3" /> LIMITED TIME
                  </span>
                </div>
                <p className="text-gradient mt-1 text-3xl font-black tabular-nums sm:text-4xl">
                  ${boostLow}–${boostHigh}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="h-px w-6 bg-orange/30" />
                  <p className="text-[10px] font-bold tracking-widest text-orange">
                    HOW TO PARTICIPATE
                  </p>
                  <span className="h-px w-6 bg-orange/30" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  if you wish to participate, simply spend $10 on an app of your choice, make $100 back
                </p>
              </div>

              <p className="mt-6 text-sm font-extrabold tracking-wide text-orange">
                START NOW — LIMITED SPOTS
              </p>
              <a
                href={CTA_URL}
                className="group relative mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-8 py-5 text-center text-lg font-bold tracking-wide text-white shadow-cta transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                CLAIM MY SPOT
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="mt-3 text-[11px] text-muted-foreground">
                No credit card · Instant welcome bonus
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!ineligible && step < 4 && (
          <div className="shrink-0 border-t border-border/60 px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => canNext && setStep((s) => s + 1)}
                disabled={!canNext}
                className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-gradient-brand px-8 py-5 text-lg font-bold tracking-wide text-white shadow-cta transition disabled:opacity-40 hover:scale-[1.02] active:scale-[0.99]"
              >
                {step === 3 ? "See my estimate" : "Next"}
                <ArrowRight className="h-5 w-5" />
              </button>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
                >
                  Back
                </button>
              )}
            </div>
            <div className="mt-4 text-center">
              <a
                href={CTA_URL}
                className="text-xs font-bold tracking-widest text-muted-foreground underline underline-offset-2 transition hover:text-orange"
              >
                Skip quiz & start now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Question({
  icon,
  title,
  options,
  labels,
  emojis,
  selected,
  onSelect,
}: {
  icon: React.ReactNode;
  title: string;
  options: string[];
  labels?: string[];
  emojis?: string[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 text-orange">{icon}</div>
      <h3 className="mt-3 text-center text-xl font-extrabold sm:text-2xl">{title}</h3>
      <div className="mt-5 grid gap-3">
        {options.map((opt, i) => {
          const active = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={`flex items-center justify-between rounded-2xl border px-5 py-5 text-left text-base font-bold transition ${
                active
                  ? "border-orange bg-orange/10 text-foreground shadow-cta"
                  : "border-border bg-background/40 hover:border-orange/60 hover:bg-orange/5"
              }`}
            >
              <span className="flex items-center gap-3">
                {emojis?.[i] && <span className="text-xl">{emojis[i]}</span>}
                <span>{labels?.[i] ?? opt}</span>
              </span>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  active ? "border-orange bg-orange" : "border-border"
                }`}
              >
                {active && <Check className="h-3.5 w-3.5 text-white" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
