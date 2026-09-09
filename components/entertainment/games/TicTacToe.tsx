
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RotateCcw,
  Trophy,
  Cpu,
  User,
  X as CloseIcon,
} from "lucide-react";

type Cell = "X" | "O" | null;
type Winner = "X" | "O" | "draw" | null;

type TicTacToeProps = {
  onClose?: () => void;
};

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function getWinner(board: Cell[]): Winner {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every(Boolean) ? "draw" : null;
}

function getWinningLine(board: Cell[]) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }

  return [];
}

function minimax(board: Cell[], maximizing: boolean): number {
  const result = getWinner(board);

  if (result === "O") return 10;
  if (result === "X") return -10;
  if (result === "draw") return 0;

  const empty = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);

  if (maximizing) {
    let best = -Infinity;

    for (const index of empty) {
      board[index] = "O";
      best = Math.max(best, minimax(board, false));
      board[index] = null;
    }

    return best;
  }

  let best = Infinity;

  for (const index of empty) {
    board[index] = "X";
    best = Math.min(best, minimax(board, true));
    board[index] = null;
  }

  return best;
}

function getComputerMove(board: Cell[]) {
  const empty = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);

  if (!empty.length) return -1;

  let bestScore = -Infinity;
  let bestMove = empty[0];

  for (const index of empty) {
    board[index] = "O";
    const score = minimax(board, false);
    board[index] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

export default function TicTacToe({ onClose }: TicTacToeProps) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<Winner>(null);
  const [thinking, setThinking] = useState(false);

  const [score, setScore] = useState({
    player: 0,
    computer: 0,
    draws: 0,
  });

  const winningLine = useMemo(() => getWinningLine(board), [board]);

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setThinking(false);
  };

  const resetAll = () => {
    resetRound();

    setScore({
      player: 0,
      computer: 0,
      draws: 0,
    });
  };

  const handleClose = () => {
    if (thinking) {
      setThinking(false);
    }

    onClose?.();
  };

  /*
   * Escape key closes the game.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [thinking]);

  /*
   * Player move.
   */
  const handlePlayerMove = (index: number) => {
    if (board[index] || winner || thinking) return;

    const nextBoard = [...board];
    nextBoard[index] = "X";

    const result = getWinner(nextBoard);

    setBoard(nextBoard);

    if (result) {
      setWinner(result);

      setScore((current) => ({
        player: current.player + (result === "X" ? 1 : 0),
        computer: current.computer + (result === "O" ? 1 : 0),
        draws: current.draws + (result === "draw" ? 1 : 0),
      }));

      return;
    }

    setThinking(true);
  };

  /*
   * Computer move.
   */
  useEffect(() => {
    if (!thinking || winner) return;

    const timer = window.setTimeout(() => {
      setBoard((currentBoard) => {
        const nextBoard = [...currentBoard];
        const move = getComputerMove(nextBoard);

        if (move !== -1) {
          nextBoard[move] = "O";
        }

        const result = getWinner(nextBoard);

        if (result) {
          setWinner(result);

          setScore((current) => ({
            player: current.player + (result === "X" ? 1 : 0),
            computer: current.computer + (result === "O" ? 1 : 0),
            draws: current.draws + (result === "draw" ? 1 : 0),
          }));
        }

        return nextBoard;
      });

      setThinking(false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [thinking, winner]);

  const status = winner
    ? winner === "X"
      ? "You won the round"
      : winner === "O"
        ? "Computer wins"
        : "Round ended in a draw"
    : thinking
      ? "Computer is thinking..."
      : "Your turn";

  return (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen items-start justify-center overflow-y-auto bg-black/80 px-3 py-4 backdrop-blur-md sm:px-6 sm:py-8"
      onDoubleClick={(event) => {
        /*
         * Double-click ONLY on the outside backdrop closes the game.
         * Double-clicking the actual game card does nothing.
         */
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Tic-Tac-Toe game"
    >
      <section className="my-auto w-full max-w-5xl">
        <div className="relative max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[30px] border border-white/10 bg-[#09090d] shadow-[0_30px_100px_rgba(0,0,0,0.7)] sm:max-h-[calc(100vh-4rem)]">
          {/* =========================================================
              CLOSE BUTTON
              ========================================================= */}

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close Tic-Tac-Toe"
            title="Close game"
            className="group absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/45 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-300/30 hover:bg-fuchsia-300/10 hover:text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.18)] sm:right-5 sm:top-5"
          >
            <CloseIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>

          {/* =========================================================
              HEADER
              ========================================================= */}

          <div className="border-b border-white/[0.08] px-5 py-6 pr-16 sm:px-8 sm:py-7 sm:pr-20">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-violet-300">
                  <Trophy className="h-3.5 w-3.5" />
                  Entertainment Game
                </div>

                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Tic-Tac-Toe
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                  You are X. The computer is O. Get three in a row before the
                  AI does.
                </p>
              </div>

              <button
                type="button"
                onClick={resetAll}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/45 transition hover:border-violet-300/25 hover:bg-violet-300/[0.06] hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset score
              </button>
            </div>
          </div>

          {/* =========================================================
              GAME CONTENT
              ========================================================= */}

          <div className="grid gap-7 p-4 sm:gap-8 sm:p-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
            <div className="mx-auto w-full max-w-[500px]">
              {/* Status bar */}

              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2">
                  {winner === "X" ? (
                    <Trophy className="h-4 w-4 shrink-0 text-violet-300" />
                  ) : thinking ? (
                    <Cpu className="h-4 w-4 shrink-0 animate-pulse text-blue-300" />
                  ) : (
                    <User className="h-4 w-4 shrink-0 text-white/50" />
                  )}

                  <span className="truncate text-[9px] uppercase tracking-[0.16em] text-white/50 sm:text-[10px] sm:tracking-[0.18em]">
                    {status}
                  </span>
                </div>

                <span className="ml-3 shrink-0 font-mono text-[10px] text-white/20">
                  X vs O
                </span>
              </div>

              {/* =======================================================
                  BOARD
                  ======================================================= */}

              <div className="mx-auto grid w-full max-w-[500px] grid-cols-3 gap-2.5 sm:gap-3.5">
                {board.map((cell, index) => {
                  const isWinningCell = winningLine.includes(index);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handlePlayerMove(index)}
                      disabled={
                        Boolean(cell) || Boolean(winner) || thinking
                      }
                      aria-label={`Cell ${index + 1}${
                        cell ? `, ${cell}` : ""
                      }`}
                      className={`group relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 sm:rounded-[22px] ${
                        isWinningCell
                          ? "border-violet-300/60 bg-violet-400/[0.14] shadow-[0_0_45px_rgba(139,92,246,0.28)]"
                          : cell
                            ? "border-white/[0.12] bg-white/[0.045]"
                            : "border-white/[0.08] bg-white/[0.018] hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-violet-300/[0.05] hover:shadow-[0_0_25px_rgba(139,92,246,0.08)]"
                      }`}
                    >
                      {/* subtle inner glow */}

                      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.035] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* =================================================
                          BIG X
                          ================================================= */}

                      {cell === "X" && (
                        <span
                          className="relative z-10 block select-none bg-gradient-to-br from-fuchsia-300 via-violet-300 to-blue-300 bg-clip-text text-transparent text-[clamp(3.8rem,12vw,6.8rem)] font-black leading-none tracking-[-0.08em] drop-shadow-[0_0_20px_rgba(217,70,239,0.25)] sm:text-[6rem]"
                          aria-hidden="true"
                        >
                          X
                        </span>
                      )}

                      {/* =================================================
                          BIG O
                          ================================================= */}

                      {cell === "O" && (
                        <span
                          className="relative z-10 block select-none text-[clamp(3.8rem,12vw,6.8rem)] font-black leading-none tracking-[-0.08em] text-blue-300 drop-shadow-[0_0_20px_rgba(96,165,250,0.4)] sm:text-[6rem]"
                          aria-hidden="true"
                        >
                          O
                        </span>
                      )}

                      {/* Empty cell */}

                      {!cell && !winner && !thinking && (
                        <span className="relative z-10 text-2xl font-light text-white/[0.035] transition-colors duration-300 group-hover:text-violet-300/20 sm:text-3xl">
                          +
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* New round */}

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetRound}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.05] px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-violet-200/70 transition hover:border-violet-300/30 hover:bg-violet-300/[0.09] hover:text-violet-100"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  New round
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                  Close
                </button>
              </div>
            </div>

            {/* ===========================================================
                SCOREBOARD
                =========================================================== */}

            <aside className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 sm:p-6">
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                Scoreboard
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <span className="text-xs text-white/45">You · X</span>

                  <span className="font-mono text-lg text-violet-300">
                    {score.player}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <span className="text-xs text-white/45">
                    Computer · O
                  </span>

                  <span className="font-mono text-lg text-blue-300">
                    {score.computer}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <span className="text-xs text-white/45">Draws</span>

                  <span className="font-mono text-lg text-white/45">
                    {score.draws}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-white/[0.07] pt-5">
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                  AI difficulty
                </p>

                <p className="mt-2 text-xs leading-5 text-white/35">
                  Unbeatable mode. The computer uses optimal moves.
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-violet-300/[0.08] bg-violet-300/[0.025] p-4">
                <p className="text-[8px] uppercase tracking-[0.2em] text-violet-300/40">
                  Controls
                </p>

                <p className="mt-2 text-[11px] leading-5 text-white/30">
                  Press ESC or use the close button to exit. Double-click
                  outside the game panel to close.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
