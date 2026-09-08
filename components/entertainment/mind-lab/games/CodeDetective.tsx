"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug,
  Check,
  Code2,
  FileWarning,
  Terminal,
  X,
  Zap,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type CodeCase = {
  title: string;
  description: string;
  lines: string[];
  bugLine: number;
  explanation: string;
};

const CASES: CodeCase[] = [
  {
    title: "THE BROKEN LOGIN",
    description: "One line is silently destroying the authentication flow.",
    lines: [
      "const user = await getUser(email);",
      "if (!user) return error('User not found');",
      "const valid = await verifyPassword(password, user.hash);",
      "if (valid) return createSession(user.id);",
      "return error('Invalid credentials');",
    ],
    bugLine: 2,
    explanation:
      "The password verification is asynchronous. The result must be awaited before it can be treated as a boolean.",
  },
  {
    title: "THE INVISIBLE BUG",
    description: "The component renders, but the state never updates correctly.",
    lines: [
      "const [count, setCount] = useState(0);",
      "",
      "function increment() {",
      "  setCount(count++);",
      "}",
      "",
      "return <button onClick={increment}>{count}</button>;",
    ],
    bugLine: 3,
    explanation:
      "React state must not be mutated directly. Use setCount(count + 1) instead.",
  },
  {
    title: "THE API TRAP",
    description: "The API works. The frontend doesn't.",
    lines: [
      "const response = await fetch('/api/projects');",
      "const data = response.json();",
      "setProjects(data);",
      "",
      "return <ProjectGrid projects={projects} />;",
    ],
    bugLine: 1,
    explanation:
      "response.json() returns a Promise. The JSON body must be awaited before passing it to state.",
  },
];

export default function CodeDetective({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [solved, setSolved] = useState(0);
  const [failed, setFailed] = useState(false);
  const [complete, setComplete] = useState(false);

  const current = CASES[caseIndex];

  const progress = useMemo(
    () => ((caseIndex + (selectedLine !== null ? 1 : 0)) / CASES.length) * 100,
    [caseIndex, selectedLine]
  );

  const inspectLine = (line: number) => {
    if (selectedLine !== null || failed || complete) return;

    setSelectedLine(line);

    if (line !== current.bugLine) {
      window.setTimeout(() => {
        setFailed(true);
        onFail?.();
      }, 700);
      return;
    }

    const nextSolved = solved + 1;
    setSolved(nextSolved);

    if (caseIndex === CASES.length - 1) {
      window.setTimeout(() => {
        setComplete(true);
        onComplete?.(900 + nextSolved * 200);
      }, 900);
      return;
    }

    window.setTimeout(() => {
      setCaseIndex((value) => value + 1);
      setSelectedLine(null);
    }, 1300);
  };

  if (complete || failed) {
    const success = complete;

    return (
      <div className="flex min-h-[82vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-2xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.045]">
            {success ? (
              <Check className="h-9 w-9 text-emerald-300" />
            ) : (
              <Bug className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            Code Investigation
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {success ? "Debugger Clearance Granted." : "The Bug Got You."}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
            {success
              ? "Three bugs. Three correct calls. Your debugging instincts are dangerous."
              : "You clicked the wrong line. In production, that tiny mistake could survive for months."}
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              Cases solved
            </p>
            <p className="mt-2 font-mono text-3xl text-white">
              {solved}/{CASES.length}
            </p>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-full border border-white/10 bg-white/[0.05] px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-white/55 transition hover:bg-white/10 hover:text-white"
          >
            Back to Mind Lab
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[82vh] w-full max-w-5xl px-4 py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-violet-300">
            <Terminal className="h-4 w-4" />
            Developer Forensics
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Code Detective
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Find the one line that is lying to the entire application.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
          <Zap className="h-3.5 w-3.5 text-violet-300" />
          <span className="font-mono text-xs text-white/50">
            {solved}/{CASES.length}
          </span>
        </div>
      </div>

      <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-violet-400"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        key={caseIndex}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-[#09090d] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <Code2 className="h-4 w-4 text-violet-300" />

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Case {caseIndex + 1}
              </p>
              <p className="mt-1 text-xs font-medium text-white/70">
                {current.title}
              </p>
            </div>
          </div>

          <FileWarning className="h-4 w-4 text-white/20" />
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-sm text-white/45">{current.description}</p>
        </div>

        <div className="p-3 sm:p-5">
          {current.lines.map((line, index) => {
            const selected = selectedLine === index;
            const correct = index === current.bugLine;

            return (
              <button
                key={`${caseIndex}-${index}`}
                type="button"
                onClick={() => inspectLine(index)}
                className={`group flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left font-mono text-xs transition ${
                  selected
                    ? correct
                      ? "bg-emerald-400/[0.08] text-emerald-200"
                      : "bg-red-400/[0.08] text-red-200"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/75"
                }`}
              >
                <span className="w-6 shrink-0 select-none text-right text-white/15">
                  {index + 1}
                </span>

                <span className="min-w-0 whitespace-pre-wrap">
                  {line || " "}
                </span>

                <AnimatePresence>
                  {selected &&
                    (correct ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <Check className="ml-auto h-4 w-4 shrink-0 text-emerald-300" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <X className="ml-auto h-4 w-4 shrink-0 text-red-300" />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedLine !== null && selectedLine === current.bugLine && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-white/10 px-5 py-5"
            >
              <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300">
                Bug Analysis
              </p>

              <p className="mt-2 text-xs leading-6 text-white/45">
                {current.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}