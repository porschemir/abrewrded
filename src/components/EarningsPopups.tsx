import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

const NAMES = [
  "Jake", "Maria", "Tyler", "Sofia", "Marcus", "Emily", "Devon", "Ashley",
  "David", "Priya", "Liam", "Olivia", "Noah", "Emma", "Ethan", "Ava",
  "Mason", "Isabella", "Logan", "Mia", "Lucas", "Zoe", "Carlos", "Aisha",
  "Jamal", "Chloe", "Ben", "Hannah", "Ryan", "Grace",
];

const LOCATIONS = [
  "Atlanta, GA", "Austin, TX", "Seattle, WA", "Denver, CO", "Miami, FL",
  "Chicago, IL", "Phoenix, AZ", "Boston, MA", "Portland, OR", "Dallas, TX",
];

type Popup = { id: number; name: string; location: string; amount: number; spent?: number };

const SHOW_MS = 3000;
const ANIM_MS = 400;
const GAP_MS = 600;

export function EarningsPopups() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let id = 1;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const cycle = () => {
      const currentId = id++;
      const p: Popup = {
        id: currentId,
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        amount: Math.floor(10 + Math.random() * 141),
        spent: currentId % 3 === 0 ? Math.floor(5 + Math.random() * 8) : undefined,
      };
      setPopup(p);
      // next frame: slide up
      timers.push(setTimeout(() => setVisible(true), 20));
      // after fully shown for SHOW_MS, slide down
      timers.push(setTimeout(() => setVisible(false), 20 + ANIM_MS + SHOW_MS));
      // after slide-down completes + gap, clear and spawn next
      timers.push(
        setTimeout(() => {
          setPopup(null);
          cycle();
        }, 20 + ANIM_MS + SHOW_MS + ANIM_MS + GAP_MS)
      );
    };

    cycle();
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-50">
      {popup && (
        <div
          className="flex items-center gap-2 rounded-lg border border-border bg-card/95 px-2.5 py-1.5 text-xs shadow-lg backdrop-blur max-w-[230px]"
          style={{
            transform: visible ? "translateY(0)" : "translateY(120%)",
            opacity: visible ? 1 : 0,
            transition: `transform ${ANIM_MS}ms ease-out, opacity ${ANIM_MS}ms ease-out`,
          }}
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
            <DollarSign className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate font-semibold">
              {popup.name} earned <span className="text-success">${popup.amount}</span>
            </div>
            <div className="truncate text-[10px] text-muted-foreground">
              {popup.location} · just now
            </div>
            {popup.spent !== undefined && (
              <div className="truncate text-[9px] text-muted-foreground/80">
                Total spent in-apps: ${popup.spent}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
