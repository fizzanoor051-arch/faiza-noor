"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock3,
  FileSearch,
  Fingerprint,
  Search,
  ShieldAlert,
  Skull,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type CaseData = {
  title: string;
  crime: string;
  clues: string[];
  suspects: {
    name: string;
    statement: string;
  }[];
  answer: number;
  explanation: string;
};

const CASES: CaseData[] = [
  {
    title: "THE VANISHED KEY",
    crime: "A secure room was opened at 21:40 without a forced entry.",
    clues: [
      "The electronic lock records exactly one valid access.",
      "The keycard owner claims she left at 21:10.",
      "A security camera shows the hallway was empty at 21:40.",
      "The room's internal clock is 17 minutes slow.",
    ],
    suspects: [
      {
        name: "Mira",
        statement: "I left before 21:15.",
      },
      {
        name: "Arman",
        statement: "I never had access to the room.",
      },
      {
        name: "Zoya",
        statement: "The hallway camera was working normally.",
      },
    ],
    answer: 2,
    explanation:
      "The internal clock being 17 minutes slow means the recorded 21:40 event happened at approximately 21:23. Zoya's claim that the camera was working normally conflicts with the empty hallway footage during the actual access window.",
  },
  {
    title: "THE FAKE ALIBI",
    crime: "A confidential file disappeared between 18:00 and 18:30.",
    clues: [
      "The office door opened at 18:12.",
      "Rain started at exactly 18:05.",
      "One suspect says she walked outside at 18:10.",
      "The outdoor floor has no footprints after 18:05.",
    ],
    suspects: [
      {
        name: "Hina",
        statement: "I stayed inside the whole time.",
      },
      {
        name: "Daniyal",
        statement: "I went outside around 18:10.",
      },
      {
        name: "Sara",
        statement: "I was in the meeting room.",
      },
    ],
    answer: 1,
    explanation:
      "Daniyal claims he went outside after the rain began, but there are no footprints after 18:05. His alibi is physically impossible.",
  },
  {
    title: "THE SILENT TERMINAL",
    crime: "Someone accessed the server at 03:15.",
    clues: [
      "The server requires a physical security token.",
      "The night guard says nobody entered.",
      "The maintenance log shows a power reset at 03:05.",
      "Only one suspect knew the backup token location.",
    ],
    suspects: [
      {
        name: "Omar",
        statement: "I don't know where the backup token is.",
      },
      {
        name: "Nora",
        statement: "I was asleep at home.",
      },
      {
        name: "Ray",
        statement: "The power reset could have triggered the access.",
      },
    ],
    answer: 2,
    explanation:
      "A power reset cannot create a valid physical token authentication. Ray's explanation contradicts the security system's requirements.",
  },
];

export default function SixtySecondDetective({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [time, setTime] = useState(60);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentCase = CASES[caseIndex];

  useEffect(() => {
    if (finished) return;

    const timer = window.setInterval(() => {
      setTime((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setFinished(true);
          onFail?.();
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [finished, onFail]);

  const progress = useMemo(
    () => ((caseIndex + (selected !== null ? 1 : 0)) / CASES.length) * 100,
    [caseIndex, selected]
  );

  const chooseSuspect = (index: number) => {
    if (selected !== null || finished) return;

    setSelected(index);

    if (index === currentCase.answer) {
      setSolved((value) => value + 1);

      if (caseIndex === CASES.length - 1) {
        setFinished(true);
        const reward = Math.max(350, time * 8 + 500);
        onComplete?.(reward);
      } else {
        window.setTimeout(() => {
          setCaseIndex((value) => value + 1);
          setSelected(null);
        }, 1400);
      }
    } else {
      onFail?.();
      setFinished(true);
    }
  };

  if (finished) {
    const success = solved === CASES.length;

    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl rounded-[30px] border border-white/10 bg-white/[0.035] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
            {success ? (
              <Fingerprint className="h-9 w-9 text-violet-300" />
            ) : (
              <Skull className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            Case File Closed
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white">
            {success ? "Detective Level: Dangerous." : "The Case Escaped."}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/45">
            {success
              ? `You solved all ${CASES.length} cases with ${time}s remaining.`
              : "One wrong assumption was enough to collapse the investigation."}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/25">
                Solved
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {solved}/{CASES.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/25">
                Time
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {time}s
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-full border border-violet-300/20 bg-violet-500/10 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-violet-200 transition hover:bg-violet-500/20"
          >
            Back to Mind Lab
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[80vh] w-full max-w-5xl px-4 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-violet-300">
            <FileSearch className="h-3.5 w-3.5" />
            Mind Lab / Detective
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            60 Second Detective
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Find the contradiction. Trust evidence, not confidence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-violet-300" />
              <span className="font-mono text-xl text-white">{time}s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-violet-400"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.025] p-5 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <Search className="h-5 w-5 text-violet-300" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
              Case {caseIndex + 1}/{CASES.length}
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {currentCase.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/55">
              {currentCase.crime}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {currentCase.clues.map((clue) => (
            <div
              key={clue}
              className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 text-sm leading-6 text-white/45"
            >
              {clue}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-violet-300" />
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
            Who is lying?
          </p>
        </div>

        <div className="mt-4 grid gap-3">
          {currentCase.suspects.map((suspect, index) => {
            const isSelected = selected === index;
            const isCorrect = index === currentCase.answer;

            return (
              <motion.button
                key={suspect.name}
                type="button"
                onClick={() => chooseSuspect(index)}
                whileHover={selected === null ? { x: 4 } : undefined}
                className={`rounded-2xl border p-5 text-left transition ${
                  isSelected
                    ? isCorrect
                      ? "border-emerald-400/30 bg-emerald-400/[0.08]"
                      : "border-red-400/30 bg-red-400/[0.08]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-violet-300/20 hover:bg-white/[0.045]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white">
                    {suspect.name}
                  </span>

                  <span className="font-mono text-[10px] text-white/20">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/40">
                  “{suspect.statement}”
                </p>

                <AnimatePresence>
                  {isSelected && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`mt-4 border-t border-white/10 pt-4 text-xs leading-5 ${
                        isCorrect ? "text-emerald-200/70" : "text-red-200/70"
                      }`}
                    >
                      {isCorrect
                        ? currentCase.explanation
                        : "Incorrect. The evidence does not support this conclusion."}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}