
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Bot,
  Crown,
  Dice5,
  RotateCcw,
  Sparkles,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

type Player = "player" | "computer";
type GameStatus = "playing" | "won";

type Snake = {
  head: number;
  tail: number;
};

type Ladder = {
  start: number;
  end: number;
};

type SnakeLadderProps = {
  onClose?: () => void;
};

type SpecialMove =
  | {
      type: "ladder";
      from: number;
      to: number;
    }
  | {
      type: "snake";
      from: number;
      to: number;
    }
  | null;

/* =============================================================
   CLASSIC-STYLE BOARD POSITIONS

   These are intentionally spread across multiple rows so the
   snakes and ladders visually travel across the board.
============================================================= */

const SNAKES: Snake[] = [
  { head: 98, tail: 78 },
  { head: 95, tail: 56 },
  { head: 92, tail: 73 },
  { head: 87, tail: 24 },
  { head: 64, tail: 36 },
  { head: 62, tail: 18 },
  { head: 48, tail: 26 },
  { head: 46, tail: 5 },
  { head: 33, tail: 12 },
  { head: 16, tail: 7 },
];

const LADDERS: Ladder[] = [
  { start: 3, end: 22 },
  { start: 8, end: 30 },
  { start: 15, end: 44 },
  { start: 21, end: 42 },
  { start: 28, end: 76 },
  { start: 36, end: 57 },
  { start: 49, end: 68 },
  { start: 51, end: 72 },
  { start: 60, end: 81 },
  { start: 71, end: 91 },
];

const DICE_DOTS: Record<number, number[][]> = {
  1: [[1, 1]],

  2: [
    [0, 0],
    [2, 2],
  ],

  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],

  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],

  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],

  6: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
};

/* =============================================================
   HELPERS
============================================================= */

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getDestination(
  position: number,
  roll: number
): number {
  const target = position + roll;

  if (target > 100) {
    return position;
  }

  return target;
}

function resolveSpecialSquare(
  position: number
): SpecialMove {
  const ladder = LADDERS.find(
    (item) => item.start === position
  );

  if (ladder) {
    return {
      type: "ladder",
      from: ladder.start,
      to: ladder.end,
    };
  }

  const snake = SNAKES.find(
    (item) => item.head === position
  );

  if (snake) {
    return {
      type: "snake",
      from: snake.head,
      to: snake.tail,
    };
  }

  return null;
}

/*
 * Classic serpentine board numbering.
 *
 * Bottom row:
 * 1 2 3 ... 10
 *
 * Next row:
 * 20 19 18 ... 11
 *
 * etc.
 */
function getDisplayNumber(
  rowFromBottom: number,
  column: number
): number {
  const base = rowFromBottom * 10;

  if (rowFromBottom % 2 === 0) {
    return base + column + 1;
  }

  return base + (9 - column) + 1;
}

/*
 * Convert a board number to its grid coordinates.
 *
 * row = 0 means bottom row
 * column = 0 means left side
 */
function getBoardCoordinates(number: number) {
  const zeroBased = number - 1;
  const row = Math.floor(zeroBased / 10);
  const offset = zeroBased % 10;

  const column =
    row % 2 === 0
      ? offset
      : 9 - offset;

  return {
    row,
    column,
  };
}

/* =============================================================
   DICE
============================================================= */

function DiceFace({
  value,
}: {
  value: number;
}) {
  const dots = DICE_DOTS[value] ?? DICE_DOTS[1];

  return (
    <div
      className="grid h-20 w-20 grid-cols-3 grid-rows-3 rounded-[22px] border border-white/15 bg-white/[0.07] p-3 shadow-[0_15px_45px_rgba(0,0,0,0.45)] sm:h-24 sm:w-24"
      aria-label={`Dice rolled ${value}`}
    >
      {Array.from(
        { length: 9 },
        (_, index) => {
          const row = Math.floor(index / 3);
          const column = index % 3;

          const active = dots.some(
            ([dotRow, dotColumn]) =>
              dotRow === row &&
              dotColumn === column
          );

          return (
            <span
              key={index}
              className={`m-auto h-3 w-3 rounded-full transition-all duration-200 sm:h-3.5 sm:w-3.5 ${
                active
                  ? "bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]"
                  : "bg-transparent"
              }`}
            />
          );
        }
      )}
    </div>
  );
}

/* =============================================================
   HUMAN TOKEN
============================================================= */

function HumanToken({
  small = false,
  active = false,
}: {
  small?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center ${
        small
          ? "h-8 w-8"
          : "h-12 w-12 sm:h-14 sm:w-14"
      }`}
      aria-label="Human player"
    >
      {/* Head */}

      <div
        className={`absolute rounded-full border border-fuchsia-100/80 bg-gradient-to-br from-pink-200 via-fuchsia-400 to-violet-600 shadow-[0_0_22px_rgba(217,70,239,0.65)] ${
          small
            ? "left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2"
            : "left-1/2 top-0 h-5 w-5 -translate-x-1/2 sm:h-6 sm:w-6"
        }`}
      />

      {/* Body */}

      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[45%] rounded-b-lg border border-fuchsia-100/60 bg-gradient-to-b from-fuchsia-300 to-violet-600 shadow-[0_0_20px_rgba(217,70,239,0.5)] ${
          small
            ? "h-4 w-5"
            : "h-7 w-8 sm:h-8 sm:w-9"
        }`}
      />

      {/* Glow */}

      {active && (
        <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-fuchsia-400/30 blur-xl" />
      )}
    </div>
  );
}

/* =============================================================
   ROBOT TOKEN
============================================================= */

function RobotToken({
  small = false,
  active = false,
}: {
  small?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center ${
        small
          ? "h-8 w-8"
          : "h-12 w-12 sm:h-14 sm:w-14"
      }`}
      aria-label="Computer robot"
    >
      {/* Antenna */}

      <div
        className={`absolute left-1/2 top-0 -translate-x-1/2 ${
          small ? "h-2" : "h-3"
        } w-px bg-cyan-200/80`}
      />

      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)] ${
          small
            ? "top-[-1px] h-1.5 w-1.5"
            : "top-[-2px] h-2 w-2"
        }`}
      />

      {/* Robot head */}

      <div
        className={`absolute bottom-1/4 left-1/2 -translate-x-1/2 rounded-lg border border-cyan-100/70 bg-gradient-to-br from-sky-200 via-blue-400 to-indigo-600 shadow-[0_0_24px_rgba(59,130,246,0.6)] ${
          small
            ? "h-5 w-6"
            : "h-7 w-9 sm:h-8 sm:w-10"
        }`}
      >
        {/* Eyes */}

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1.5">
          <span
            className={`rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] ${
              small
                ? "h-1 w-1"
                : "h-1.5 w-1.5"
            }`}
          />

          <span
            className={`rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] ${
              small
                ? "h-1 w-1"
                : "h-1.5 w-1.5"
            }`}
          />
        </div>
      </div>

      {/* Body */}

      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-lg border border-blue-100/60 bg-gradient-to-b from-blue-300 to-indigo-600 ${
          small
            ? "h-2.5 w-5"
            : "h-4 w-7 sm:h-5 sm:w-8"
        }`}
      />

      {active && (
        <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-blue-400/30 blur-xl" />
      )}
    </div>
  );
}

/* =============================================================
   LADDER VISUAL
============================================================= */

function LadderVisual({
  ladder,
}: {
  ladder: Ladder;
}) {
  const start = getBoardCoordinates(ladder.start);
  const end = getBoardCoordinates(ladder.end);

  /*
   * CSS grid coordinates are calculated from the bottom,
   * while the board itself renders from top to bottom.
   */
  const topRow = 9 - Math.max(start.row, end.row);
  const bottomRow =
    9 - Math.min(start.row, end.row);

  const topColumn =
    start.row > end.row
      ? start.column
      : end.column;

  const bottomColumn =
    start.row > end.row
      ? end.column
      : start.column;

  const rowDistance = Math.abs(
    start.row - end.row
  );

  const colDistance = Math.abs(
    start.column - end.column
  );

  const verticalLength =
    Math.max(2.2, rowDistance * 1.35);

  const horizontalOffset =
    (bottomColumn - topColumn) * 50;

  return (
    <div
      className="pointer-events-none absolute z-[4]"
      style={{
        left: `${bottomColumn * 10 + 5}%`,
        top: `${topRow * 10 + 5}%`,
        width: "1px",
        height: `${Math.min(
          verticalLength * 10,
          92
        )}%`,
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{
          transform: `rotate(${
            colDistance
              ? horizontalOffset / Math.max(1, rowDistance)
              : 0
          }deg)`,
          transformOrigin: "top center",
        }}
      >
        {/* Left rail */}

        <div className="absolute left-[-7px] top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-amber-100 via-amber-400 to-orange-600 shadow-[0_0_7px_rgba(251,191,36,0.65)]" />

        {/* Right rail */}

        <div className="absolute left-[7px] top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-amber-100 via-amber-400 to-orange-600 shadow-[0_0_7px_rgba(251,191,36,0.65)]" />

        {/* Rungs */}

        {Array.from(
          {
            length: Math.max(
              3,
              Math.floor(verticalLength * 2.2)
            ),
          },
          (_, index) => (
            <div
              key={index}
              className="absolute left-[-7px] h-[2px] w-[17px] rounded-full bg-amber-200/90 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
              style={{
                top: `${
                  (index /
                    Math.max(
                      1,
                      Math.floor(
                        verticalLength * 2.2
                      ) - 1
                    )) *
                  100
                }%`,
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

/* =============================================================
   SNAKE VISUAL

   A long curved SVG snake connects the head and tail cells.
============================================================= */

function SnakeVisual({
  snake,
}: {
  snake: Snake;
}) {
  const head = getBoardCoordinates(
    snake.head
  );

  const tail = getBoardCoordinates(
    snake.tail
  );

  const headX =
    head.column * 10 + 5;

  const headY =
    (9 - head.row) * 10 + 5;

  const tailX =
    tail.column * 10 + 5;

  const tailY =
    (9 - tail.row) * 10 + 5;

  const middleX =
    (headX + tailX) / 2;

  const middleY =
    (headY + tailY) / 2;

  const curve =
    headX < tailX ? 9 : -9;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Shadow */}

      <path
        d={`M ${headX} ${headY}
            Q ${middleX + curve} ${middleY - 8}
              ${tailX} ${tailY}`}
        fill="none"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="2.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Body */}

      <path
        d={`M ${headX} ${headY}
            Q ${middleX + curve} ${middleY - 8}
              ${tailX} ${tailY}`}
        fill="none"
        stroke="rgba(244,63,94,0.95)"
        strokeWidth="1.7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Highlight */}

      <path
        d={`M ${headX - 0.6} ${headY}
            Q ${middleX + curve - 0.8} ${
          middleY - 9
        }
              ${tailX - 0.5} ${tailY}`}
        fill="none"
        stroke="rgba(255,190,200,0.75)"
        strokeWidth="0.45"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Snake head */}

      <circle
        cx={headX}
        cy={headY}
        r="2.9"
        fill="rgba(190,24,93,1)"
        stroke="rgba(255,190,210,0.9)"
        strokeWidth="0.5"
      />

      {/* Eyes */}

      <circle
        cx={headX - 1}
        cy={headY - 0.5}
        r="0.45"
        fill="white"
      />

      <circle
        cx={headX + 1}
        cy={headY - 0.5}
        r="0.45"
        fill="white"
      />

      {/* Tongue */}

      <path
        d={`M ${headX} ${headY + 2.3}
            l -1.2 1.8
            M ${headX} ${headY + 2.3}
            l 1.2 1.8`}
        fill="none"
        stroke="rgba(255,150,180,0.9)"
        strokeWidth="0.45"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Tail */}

      <circle
        cx={tailX}
        cy={tailY}
        r="1.2"
        fill="rgba(190,24,93,0.9)"
      />
    </svg>
  );
}

/* =============================================================
   MAIN COMPONENT
============================================================= */

export default function SnakeLadder({
  onClose,
}: SnakeLadderProps) {
  const [playerPosition, setPlayerPosition] =
    useState(1);

  const [computerPosition, setComputerPosition] =
    useState(1);

  const [turn, setTurn] =
    useState<Player>("player");

  const [dice, setDice] = useState(1);

  const [rolling, setRolling] =
    useState(false);

  const [status, setStatus] =
    useState<GameStatus>("playing");

  const [message, setMessage] = useState(
    "Roll the dice to begin your climb."
  );

  const [wins, setWins] = useState({
    player: 0,
    computer: 0,
  });

  const [lastSpecial, setLastSpecial] =
    useState<"snake" | "ladder" | null>(null);

  /* ===========================================================
     RESET
  =========================================================== */

  const resetGame = useCallback(() => {
    setPlayerPosition(1);
    setComputerPosition(1);
    setTurn("player");
    setDice(1);
    setRolling(false);
    setStatus("playing");
    setMessage(
      "Roll the dice to begin your climb."
    );
    setLastSpecial(null);
  }, []);

  /* ===========================================================
     CLOSE
  =========================================================== */

  const closeGame = useCallback(() => {
    setRolling(false);
    onClose?.();
  }, [onClose]);

  /* ===========================================================
     ESCAPE
  =========================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        closeGame();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [closeGame]);

  /* ===========================================================
     MOVE PIECE
  =========================================================== */

  const animateMove = useCallback(
    async (
      player: Player,
      from: number,
      target: number
    ) => {
      const setter =
        player === "player"
          ? setPlayerPosition
          : setComputerPosition;

      if (target === from) {
        return;
      }

      const direction =
        target > from ? 1 : -1;

      const distance = Math.abs(
        target - from
      );

      for (
        let step = 1;
        step <= distance;
        step++
      ) {
        await wait(75);

        setter(
          from + step * direction
        );
      }
    },
    []
  );

  /* ===========================================================
     SPECIAL MOVE
  =========================================================== */

  const animateSpecialMove = useCallback(
    async (
      player: Player,
      to: number
    ) => {
      const setter =
        player === "player"
          ? setPlayerPosition
          : setComputerPosition;

      await wait(500);

      setter(to);

      await wait(450);
    },
    []
  );

  /* ===========================================================
     FINISH
  =========================================================== */

  const finishGame = useCallback(
    (winner: Player) => {
      setStatus("won");

      setWins((current) => ({
        player:
          current.player +
          (winner === "player" ? 1 : 0),

        computer:
          current.computer +
          (winner === "computer" ? 1 : 0),
      }));

      if (winner === "player") {
        setMessage(
          "🏆 You reached 100 first. You win!"
        );
      } else {
        setMessage(
          "🤖 Computer reached 100. Better luck next round!"
        );
      }
    },
    []
  );

  /* ===========================================================
     ROLL
  =========================================================== */

  const performRoll = useCallback(
    async (player: Player) => {
      if (
        rolling ||
        status !== "playing"
      ) {
        return;
      }

      setRolling(true);
      setLastSpecial(null);

      /* Dice animation */

      for (let i = 0; i < 10; i++) {
        await wait(65);

        setDice(
          Math.floor(Math.random() * 6) + 1
        );
      }

      const finalRoll =
        Math.floor(Math.random() * 6) + 1;

      setDice(finalRoll);

      const from =
        player === "player"
          ? playerPosition
          : computerPosition;

      const destination =
        getDestination(
          from,
          finalRoll
        );

      /* Exact 100 */

      if (destination === from) {
        setMessage(
          `${
            player === "player"
              ? "You"
              : "Computer"
          } rolled ${finalRoll}. Need the exact number to reach 100.`
        );

        await wait(750);

        const nextPlayer =
          player === "player"
            ? "computer"
            : "player";

        setTurn(nextPlayer);
        setRolling(false);

        return;
      }

      setMessage(
        `${
          player === "player"
            ? "You"
            : "Computer"
        } rolled ${finalRoll}. Moving to ${destination}...`
      );

      /* Normal movement */

      await animateMove(
        player,
        from,
        destination
      );

      /* Snake / ladder */

      const special =
        resolveSpecialSquare(
          destination
        );

      if (special) {
        setLastSpecial(
          special.type
        );

        if (special.type === "ladder") {
          setMessage(
            `🪜 Ladder! ${destination} → ${special.to}`
          );
        } else {
          setMessage(
            `🐍 Snake! ${destination} → ${special.to}`
          );
        }

        await animateSpecialMove(
          player,
          special.to
        );
      }

      const finalPosition =
        special?.to ?? destination;

      /* Winner */

      if (finalPosition === 100) {
        finishGame(player);
        setRolling(false);
        return;
      }

      /* Next turn */

      const nextPlayer =
        player === "player"
          ? "computer"
          : "player";

      setTurn(nextPlayer);

      if (nextPlayer === "computer") {
        setMessage(
          "Computer is thinking..."
        );
      } else {
        setMessage(
          "Your turn. Roll the dice!"
        );
      }

      setRolling(false);
    },
    [
      animateMove,
      animateSpecialMove,
      computerPosition,
      finishGame,
      playerPosition,
      rolling,
      status,
    ]
  );

  /* ===========================================================
     COMPUTER AUTO TURN
  =========================================================== */

  useEffect(() => {
    if (
      !rolling &&
      turn === "computer" &&
      status === "playing"
    ) {
      let cancelled = false;

      const computerTurn =
        async () => {
          await wait(950);

          if (cancelled) {
            return;
          }

          await performRoll(
            "computer"
          );
        };

      void computerTurn();

      return () => {
        cancelled = true;
      };
    }

    return undefined;
  }, [
    performRoll,
    rolling,
    status,
    turn,
  ]);

  /* ===========================================================
     PLAYER ROLL
  =========================================================== */

  const handlePlayerRoll =
    useCallback(() => {
      if (
        turn !== "player" ||
        rolling ||
        status !== "playing"
      ) {
        return;
      }

      void performRoll("player");
    }, [
      performRoll,
      rolling,
      status,
      turn,
    ]);

  /* ===========================================================
     BOARD CELLS
  =========================================================== */

  const boardCells = useMemo(() => {
    const rows: number[][] = [];

    for (let row = 9; row >= 0; row--) {
      const rowNumbers: number[] = [];

      for (
        let column = 0;
        column < 10;
        column++
      ) {
        rowNumbers.push(
          getDisplayNumber(
            row,
            column
          )
        );
      }

      rows.push(rowNumbers);
    }

    return rows.flat();
  }, []);

  const playerWon =
    status === "won" &&
    playerPosition === 100;

  const computerWon =
    status === "won" &&
    computerPosition === 100;

  /* ===========================================================
     RENDER
  =========================================================== */

  return (
    <section
      className="mx-auto w-full max-w-[1600px] py-5 sm:py-8"
      onDoubleClick={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          closeGame();
        }
      }}
    >
      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08080c] shadow-[0_35px_120px_rgba(0,0,0,0.6)]">

        {/* =====================================================
            ATMOSPHERE
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-[550px] w-[550px] rounded-full bg-violet-600/[0.10] blur-[140px]" />

          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/[0.04] blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize:
                "60px 60px",
            }}
          />
        </div>

        {/* =====================================================
            CLOSE
        ===================================================== */}

        <button
          type="button"
          onClick={closeGame}
          aria-label="Close Snake and Ladder"
          title="Close game"
          className="group absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/45 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-300/30 hover:bg-fuchsia-300/10 hover:text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.2)] sm:right-7 sm:top-7"
        >
          <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="relative border-b border-white/[0.08] px-5 py-7 pr-16 sm:px-8 sm:py-9 sm:pr-20 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-violet-300">
                <Sparkles className="h-3.5 w-3.5" />
                Classic Board Game
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                Snake &amp; Ladder
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                Roll the dice, climb the ladders,
                escape the snakes, and race to
                square 100.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-violet-300/15 bg-violet-300/[0.05] px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-violet-200/60">
                Player vs Computer
              </div>

              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/45 transition hover:border-violet-300/25 hover:bg-violet-300/[0.06] hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>
        </header>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <div className="relative grid gap-8 p-4 sm:p-7 lg:grid-cols-[minmax(0,1fr)_330px] lg:p-10 xl:gap-10">

          {/* ===================================================
              BOARD AREA
          =================================================== */}

          <div className="min-w-0">

            {/* TURN BAR */}

            <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3 sm:px-5">

              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    turn === "player"
                      ? "border-fuchsia-300/20 bg-fuchsia-300/[0.06]"
                      : "border-blue-300/20 bg-blue-300/[0.06]"
                  }`}
                >
                  {turn === "player" ? (
                    <UserRound className="h-5 w-5 text-fuchsia-300" />
                  ) : (
                    <Bot className="h-5 w-5 animate-pulse text-blue-300" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                    Current turn
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-white/75">
                    {status === "won"
                      ? playerWon
                        ? "You won!"
                        : "Computer won!"
                      : turn === "player"
                        ? "Your turn"
                        : "Computer's turn"}
                  </p>
                </div>
              </div>

              <div className="ml-3 hidden shrink-0 sm:block">
                {lastSpecial === "ladder" && (
                  <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5 text-[8px] uppercase tracking-[0.14em] text-emerald-200/70">
                    Ladder climb
                  </span>
                )}

                {lastSpecial === "snake" && (
                  <span className="rounded-full border border-rose-300/15 bg-rose-300/[0.05] px-3 py-1.5 text-[8px] uppercase tracking-[0.14em] text-rose-200/70">
                    Snake slide
                  </span>
                )}
              </div>
            </div>

            {/* =================================================
                LARGE BOARD
            ================================================= */}

            <div className="mx-auto w-full max-w-[920px]">

              <div className="overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#111018] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-3 lg:p-4">

                <div className="relative aspect-square w-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#17151e]">

                  {/* GRID */}

                  <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">

                    {boardCells.map(
                      (number) => {
                        const playerHere =
                          playerPosition ===
                          number;

                        const computerHere =
                          computerPosition ===
                          number;

                        const isFinish =
                          number === 100;

                        const isStart =
                          number === 1;

                        const ladderStart =
                          LADDERS.some(
                            (item) =>
                              item.start ===
                              number
                          );

                        const snakeHead =
                          SNAKES.some(
                            (item) =>
                              item.head ===
                              number
                          );

                        return (
                          <div
                            key={number}
                            className={`relative border-[0.5px] border-white/[0.07] ${
                              isFinish
                                ? "bg-amber-300/[0.10]"
                                : isStart
                                  ? "bg-violet-300/[0.08]"
                                  : number % 2 ===
                                      0
                                    ? "bg-white/[0.025]"
                                    : "bg-white/[0.045]"
                            }`}
                          >

                            {/* Number */}

                            <span className="absolute left-1 top-1 z-[10] font-mono text-[7px] font-medium text-white/30 sm:left-1.5 sm:top-1.5 sm:text-[9px]">
                              {number}
                            </span>

                            {/* Start label */}

                            {isStart && (
                              <span className="absolute bottom-1 left-1 text-[5px] uppercase tracking-[0.08em] text-violet-300/50 sm:text-[7px]">
                                Start
                              </span>
                            )}

                            {/* Finish */}

                            {isFinish && (
                              <>
                                <Crown className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-amber-300/70 sm:h-7 sm:w-7" />

                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[5px] uppercase tracking-[0.08em] text-amber-200/60 sm:text-[7px]">
                                  Finish
                                </span>
                              </>
                            )}

                            {/* Tiny endpoint markers */}

                            {ladderStart && (
                              <div className="absolute bottom-1 right-1 z-[8] h-2 w-2 rounded-full bg-amber-300/70 shadow-[0_0_8px_rgba(251,191,36,0.7)] sm:h-2.5 sm:w-2.5" />
                            )}

                            {snakeHead && (
                              <div className="absolute right-1 top-1 z-[8] h-2 w-2 rounded-full bg-rose-400/70 shadow-[0_0_8px_rgba(244,63,94,0.7)] sm:h-2.5 sm:w-2.5" />
                            )}

                            {/* PLAYER */}

                            {playerHere && (
                              <div className="absolute bottom-[3px] left-1/2 z-[20] -translate-x-1/2 sm:bottom-1">
                                <HumanToken
                                  small
                                  active={
                                    turn ===
                                    "player"
                                  }
                                />
                              </div>
                            )}

                            {/* COMPUTER */}

                            {computerHere && (
                              <div
                                className={`absolute ${
                                  playerHere
                                    ? "bottom-[3px] right-0.5 sm:bottom-1 sm:right-1"
                                    : "bottom-[3px] left-1/2 -translate-x-1/2 sm:bottom-1"
                                } z-[21]`}
                              >
                                <RobotToken
                                  small
                                  active={
                                    turn ===
                                    "computer"
                                  }
                                />
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* =================================================
                      LADDERS OVERLAY
                  ================================================= */}

                  <div className="pointer-events-none absolute inset-0">
                    {LADDERS.map(
                      (ladder) => (
                        <LadderVisual
                          key={`${ladder.start}-${ladder.end}`}
                          ladder={ladder}
                        />
                      )
                    )}
                  </div>

                  {/* =================================================
                      SNAKES OVERLAY
                  ================================================= */}

                  <div className="pointer-events-none absolute inset-0">
                    {SNAKES.map(
                      (snake) => (
                        <SnakeVisual
                          key={`${snake.head}-${snake.tail}`}
                          snake={snake}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* LEGEND */}

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">

                <div className="flex items-center gap-2">
                  <HumanToken small />
                  <span className="text-[8px] uppercase tracking-[0.16em] text-white/30">
                    You
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <RobotToken small />
                  <span className="text-[8px] uppercase tracking-[0.16em] text-white/30">
                    Computer
                  </span>
                </div>

                <span className="text-[8px] uppercase tracking-[0.16em] text-amber-300/50">
                  🪜 Ladder
                </span>

                <span className="text-[8px] uppercase tracking-[0.16em] text-rose-300/50">
                  🐍 Snake
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================
              CONTROL PANEL
          =================================================== */}

          <aside className="flex flex-col gap-4">

            {/* DICE */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5 sm:p-6">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                    Dice
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    {rolling
                      ? "Rolling..."
                      : turn === "player"
                        ? "Your roll"
                        : "Computer roll"}
                  </p>
                </div>

                <Dice5
                  className={`h-5 w-5 text-violet-300/60 ${
                    rolling
                      ? "animate-spin"
                      : ""
                  }`}
                />
              </div>

              <div className="mt-6 flex flex-col items-center">

                <div
                  className={
                    rolling
                      ? "animate-pulse"
                      : ""
                  }
                >
                  <DiceFace value={dice} />
                </div>

                <p className="mt-4 font-mono text-3xl font-semibold text-white/85">
                  {dice}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/20">
                  Last roll
                </p>

                <button
                  type="button"
                  onClick={
                    handlePlayerRoll
                  }
                  disabled={
                    rolling ||
                    turn !== "player" ||
                    status === "won"
                  }
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300/20 bg-violet-300/[0.08] px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-100/80 transition-all duration-300 hover:border-violet-300/40 hover:bg-violet-300/[0.14] hover:text-white hover:shadow-[0_0_35px_rgba(139,92,246,0.15)] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Dice5 className="h-4 w-4" />

                  {rolling
                    ? "Rolling..."
                    : status === "won"
                      ? "Game Over"
                      : turn === "player"
                        ? "Roll Dice"
                        : "Computer Turn"}
                </button>
              </div>
            </div>

            {/* PLAYERS */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                Players
              </p>

              <div className="mt-4 space-y-3">

                <div className="flex items-center justify-between rounded-xl border border-fuchsia-300/[0.10] bg-fuchsia-300/[0.035] px-4 py-3">

                  <div className="flex items-center gap-3">
                    <HumanToken small />

                    <div>
                      <p className="text-xs text-white/55">
                        You
                      </p>

                      <p className="text-[8px] uppercase tracking-[0.12em] text-fuchsia-300/45">
                        Human
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xl text-fuchsia-300">
                    {playerPosition}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-blue-300/[0.10] bg-blue-300/[0.035] px-4 py-3">

                  <div className="flex items-center gap-3">
                    <RobotToken small />

                    <div>
                      <p className="text-xs text-white/55">
                        Computer
                      </p>

                      <p className="text-[8px] uppercase tracking-[0.12em] text-blue-300/45">
                        AI Robot
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xl text-blue-300">
                    {computerPosition}
                  </span>
                </div>
              </div>
            </div>

            {/* STATUS */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                Game status
              </p>

              <p className="mt-3 text-xs leading-6 text-white/45">
                {message}
              </p>

              {status === "won" && (
                <button
                  type="button"
                  onClick={resetGame}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white/50 transition hover:border-violet-300/25 hover:bg-violet-300/[0.06] hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Play Again
                </button>
              )}
            </div>

            {/* SCORE */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-300/55" />

                <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                  Wins
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-fuchsia-300/[0.09] bg-fuchsia-300/[0.025] p-4 text-center">
                  <p className="text-[8px] uppercase tracking-[0.15em] text-white/25">
                    You
                  </p>

                  <p className="mt-1 font-mono text-2xl text-fuchsia-300">
                    {wins.player}
                  </p>
                </div>

                <div className="rounded-xl border border-blue-300/[0.09] bg-blue-300/[0.025] p-4 text-center">
                  <p className="text-[8px] uppercase tracking-[0.15em] text-white/25">
                    AI
                  </p>

                  <p className="mt-1 font-mono text-2xl text-blue-300">
                    {wins.computer}
                  </p>
                </div>
              </div>
            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={closeGame}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/35 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              Close Game
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
