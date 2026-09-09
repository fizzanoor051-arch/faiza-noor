
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Bot,
  Brain,
  Crown,
  RotateCcw,
  Sparkles,
  Trophy,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import {
  Chess,
  type Color,
  type Move,
  type PieceSymbol,
} from "chess.js";

type ChessAIProps = {
  onClose?: () => void;
};

type Difficulty = "easy" | "medium" | "hard";

type GameResult =
  | "playing"
  | "player-won"
  | "computer-won"
  | "draw";

type PromotionPiece = "q" | "r" | "b" | "n";

type SquareName =
  | "a1"
  | "b1"
  | "c1"
  | "d1"
  | "e1"
  | "f1"
  | "g1"
  | "h1"
  | "a2"
  | "b2"
  | "c2"
  | "d2"
  | "e2"
  | "f2"
  | "g2"
  | "h2"
  | "a3"
  | "b3"
  | "c3"
  | "d3"
  | "e3"
  | "f3"
  | "g3"
  | "h3"
  | "a4"
  | "b4"
  | "c4"
  | "d4"
  | "e4"
  | "f4"
  | "g4"
  | "h4"
  | "a5"
  | "b5"
  | "c5"
  | "d5"
  | "e5"
  | "f5"
  | "g5"
  | "h5"
  | "a6"
  | "b6"
  | "c6"
  | "d6"
  | "e6"
  | "f6"
  | "g6"
  | "h6"
  | "a7"
  | "b7"
  | "c7"
  | "d7"
  | "e7"
  | "f7"
  | "g7"
  | "h7"
  | "a8"
  | "b8"
  | "c8"
  | "d8"
  | "e8"
  | "f8"
  | "g8"
  | "h8";

const FILES = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
] as const;

const RANKS = [
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
] as const;

/* =============================================================
   CLASSIC CHESS PIECES

   Unicode chess glyphs are used instead of random emoji so the
   board maintains a traditional chess appearance.
============================================================= */

const PIECES: Record<
  Color,
  Record<PieceSymbol, string>
> = {
  w: {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙",
  },

  b: {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  },
};

/* =============================================================
   PIECE VALUES
============================================================= */

const PIECE_VALUES: Record<
  PieceSymbol,
  number
> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

/* =============================================================
   SIMPLE POSITION BONUSES

   These make the AI prefer sensible central development instead
   of playing completely random legal moves.
============================================================= */

const PAWN_TABLE = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5,
  0, 0, 0, 20, 20, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const KNIGHT_TABLE = [
  -50, -40, -30, -30, -30, -30, -40, -50,
  -40, -20, 0, 0, 0, 0, -20, -40,
  -30, 0, 10, 15, 15, 10, 0, -30,
  -30, 5, 15, 20, 20, 15, 5, -30,
  -30, 0, 15, 20, 20, 15, 0, -30,
  -30, 5, 10, 15, 15, 10, 5, -30,
  -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50,
];

const BISHOP_TABLE = [
  -20, -10, -10, -10, -10, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 10, 10, 5, 0, -10,
  -10, 5, 5, 10, 10, 5, 5, -10,
  -10, 0, 10, 10, 10, 10, 0, -10,
  -10, 10, 10, 10, 10, 10, 10, -10,
  -10, 5, 0, 0, 0, 0, 5, -10,
  -20, -10, -10, -10, -10, -10, -10, -20,
];

const ROOK_TABLE = [
  0, 0, 0, 0, 0, 0, 0, 0,
  5, 10, 10, 10, 10, 10, 10, 5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  0, 0, 0, 5, 5, 0, 0, 0,
];

const QUEEN_TABLE = [
  -20, -10, -10, 5, 5, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 5, 5, 5, 0, -10,
  5, 0, 5, 5, 5, 5, 0, -5,
  0, 0, 5, 5, 5, 5, 0, -5,
  -10, 5, 5, 5, 5, 5, 0, -10,
  -10, 0, 5, 0, 0, 0, 0, -10,
  -20, -10, -10, 5, 5, -10, -10, -20,
];

const KING_TABLE = [
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -20, -30, -30, -40, -40, -30, -30, -20,
  -10, -20, -20, -20, -20, -20, -20, -10,
  20, 20, 0, 0, 0, 0, 20, 20,
  20, 30, 10, 0, 0, 10, 30, 20,
];

const POSITION_TABLES: Record<
  PieceSymbol,
  number[]
> = {
  p: PAWN_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
  r: ROOK_TABLE,
  q: QUEEN_TABLE,
  k: KING_TABLE,
};

/* =============================================================
   HELPERS
============================================================= */

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function squareToIndex(square: string) {
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square[1]);

  return (8 - rank) * 8 + file;
}

function getPieceSymbol(
  color: Color,
  piece: PieceSymbol
) {
  return PIECES[color][piece];
}

function getGameMessage(
  game: Chess
): {
  result: GameResult;
  message: string;
} {
  if (game.isCheckmate()) {
    if (game.turn() === "w") {
      return {
        result: "computer-won",
        message:
          "Checkmate. The computer wins.",
      };
    }

    return {
      result: "player-won",
      message:
        "Checkmate. You defeated the computer!",
    };
  }

  if (
    game.isStalemate() ||
    game.isThreefoldRepetition() ||
    game.isInsufficientMaterial() ||
    game.isDraw()
  ) {
    return {
      result: "draw",
      message: "The game ends in a draw.",
    };
  }

  if (game.isCheck()) {
    return {
      result: "playing",
      message:
        game.turn() === "w"
          ? "Your king is in check."
          : "Computer king is in check.",
    };
  }

  return {
    result: "playing",
    message:
      game.turn() === "w"
        ? "Your turn. Make your move."
        : "Computer is thinking...",
  };
}

/* =============================================================
   AI EVALUATION
============================================================= */

function evaluatePosition(
  game: Chess
): number {
  if (game.isCheckmate()) {
    return game.turn() === "w"
      ? -999999
      : 999999;
  }

  if (game.isDraw()) {
    return 0;
  }

  const board = game.board();

  let score = 0;

  board.forEach((row, rowIndex) => {
    row.forEach((piece, columnIndex) => {
      if (!piece) {
        return;
      }

      const baseValue =
        PIECE_VALUES[piece.type];

      const table =
        POSITION_TABLES[piece.type];

      let index =
        rowIndex * 8 + columnIndex;

      if (piece.color === "b") {
        index = 56 - rowIndex * 8 + columnIndex;
      }

      const positionalValue =
        table[index] ?? 0;

      const value =
        baseValue + positionalValue;

      if (piece.color === "w") {
        score += value;
      } else {
        score -= value;
      }
    });
  });

  return score;
}

/* =============================================================
   MINIMAX AI
============================================================= */

function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean
): number {
  if (
    depth === 0 ||
    game.isGameOver()
  ) {
    return evaluatePosition(game);
  }

  const moves = game.moves({
    verbose: true,
  });

  if (maximizing) {
    let bestValue = -Infinity;

    for (const move of moves) {
      game.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion,
      });

      const value = minimax(
        game,
        depth - 1,
        alpha,
        beta,
        false
      );

      game.undo();

      bestValue = Math.max(
        bestValue,
        value
      );

      alpha = Math.max(
        alpha,
        bestValue
      );

      if (beta <= alpha) {
        break;
      }
    }

    return bestValue;
  }

  let bestValue = Infinity;

  for (const move of moves) {
    game.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    });

    const value = minimax(
      game,
      depth - 1,
      alpha,
      beta,
      true
    );

    game.undo();

    bestValue = Math.min(
      bestValue,
      value
    );

    beta = Math.min(
      beta,
      bestValue
    );

    if (beta <= alpha) {
      break;
    }
  }

  return bestValue;
}

/* =============================================================
   AI MOVE SELECTION
============================================================= */

function chooseComputerMove(
  game: Chess,
  difficulty: Difficulty
): Move | null {
  const moves = game.moves({
    verbose: true,
  });

  if (!moves.length) {
    return null;
  }

  if (difficulty === "easy") {
    /*
     * Easy mode:
     * Mostly random, but captures receive a slight preference.
     */
    const captures = moves.filter(
      (move) => move.captured
    );

    const pool =
      captures.length > 0 &&
      Math.random() > 0.35
        ? captures
        : moves;

    return pool[
      Math.floor(
        Math.random() * pool.length
      )
    ];
  }

  const depth =
    difficulty === "medium" ? 2 : 3;

  let bestValue = Infinity;
  let bestMoves: Move[] = [];

  for (const move of moves) {
    game.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    });

    const value = minimax(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      true
    );

    game.undo();

    if (value < bestValue) {
      bestValue = value;
      bestMoves = [move];
    } else if (value === bestValue) {
      bestMoves.push(move);
    }
  }

  if (!bestMoves.length) {
    return moves[0];
  }

  return bestMoves[
    Math.floor(
      Math.random() * bestMoves.length
    )
  ];
}

/* =============================================================
   COMPONENT
============================================================= */

export default function ChessAI({
  onClose,
}: ChessAIProps) {
  const gameRef = useRef(
    new Chess()
  );

  const [fen, setFen] = useState(
    gameRef.current.fen()
  );

  const [selectedSquare, setSelectedSquare] =
    useState<string | null>(null);

  const [legalTargets, setLegalTargets] =
    useState<string[]>([]);

  const [lastMove, setLastMove] =
    useState<{
      from: string;
      to: string;
    } | null>(null);

  const [message, setMessage] =
    useState(
      "Your turn. Make your move."
    );

  const [result, setResult] =
    useState<GameResult>("playing");

  const [thinking, setThinking] =
    useState(false);

  const [difficulty, setDifficulty] =
    useState<Difficulty>("medium");

  const [promotionSquare, setPromotionSquare] =
    useState<string | null>(null);

  const [promotionFrom, setPromotionFrom] =
    useState<string | null>(null);

  const [moveHistory, setMoveHistory] =
    useState<string[]>([]);

  const [wins, setWins] = useState({
    player: 0,
    computer: 0,
  });

  const [capturedWhite, setCapturedWhite] =
    useState<PieceSymbol[]>([]);

  const [capturedBlack, setCapturedBlack] =
    useState<PieceSymbol[]>([]);

  /* ===========================================================
     BOARD
  =========================================================== */

  const board = useMemo(
    () => gameRef.current.board(),
    [fen]
  );

  /* ===========================================================
     RESET
  =========================================================== */

  const resetGame = useCallback(() => {
    gameRef.current = new Chess();

    setFen(
      gameRef.current.fen()
    );

    setSelectedSquare(null);
    setLegalTargets([]);
    setLastMove(null);
    setPromotionSquare(null);
    setPromotionFrom(null);
    setThinking(false);
    setResult("playing");
    setMessage(
      "Your turn. Make your move."
    );
    setMoveHistory([]);
    setCapturedWhite([]);
    setCapturedBlack([]);
  }, []);

  /* ===========================================================
     CLOSE
  =========================================================== */

  const closeGame = useCallback(() => {
    setThinking(false);
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
     UPDATE GAME STATE
  =========================================================== */

  const syncGame = useCallback(() => {
    const game = gameRef.current;

    setFen(game.fen());

    const status =
      getGameMessage(game);

    setResult(status.result);
    setMessage(status.message);

    setMoveHistory(
      game.history()
    );
  }, []);

  /* ===========================================================
     FINISH RESULT
  =========================================================== */

  const applyResult = useCallback(
    (game: Chess) => {
      const status =
        getGameMessage(game);

      setResult(status.result);
      setMessage(status.message);

      if (
        status.result ===
        "player-won"
      ) {
        setWins((current) => ({
          ...current,
          player:
            current.player + 1,
        }));
      }

      if (
        status.result ===
        "computer-won"
      ) {
        setWins((current) => ({
          ...current,
          computer:
            current.computer + 1,
        }));
      }
    },
    []
  );

  /* ===========================================================
     MAKE PLAYER MOVE
  =========================================================== */

  const makePlayerMove = useCallback(
    (
      from: string,
      to: string,
      promotion?: PromotionPiece
    ) => {
      const game = gameRef.current;

      try {
        const move = game.move({
          from: from as SquareName,
          to: to as SquareName,
          ...(promotion
            ? { promotion }
            : {}),
        });

        if (!move) {
          return false;
        }

        setLastMove({
          from,
          to,
        });

        if (move.captured) {
          if (move.color === "w") {
            setCapturedBlack(
              (current) => [
                ...current,
                move.captured as PieceSymbol,
              ]
            );
          } else {
            setCapturedWhite(
              (current) => [
                ...current,
                move.captured as PieceSymbol,
              ]
            );
          }
        }

        setSelectedSquare(null);
        setLegalTargets([]);

        syncGame();

        const status =
          getGameMessage(game);

        setResult(status.result);
        setMessage(status.message);

        if (
          status.result !==
          "playing"
        ) {
          applyResult(game);
        }

        return true;
      } catch {
        return false;
      }
    },
    [applyResult, syncGame]
  );

  /* ===========================================================
     COMPUTER TURN
  =========================================================== */

  const computerTurn = useCallback(
    async () => {
      if (
        gameRef.current.isGameOver()
      ) {
        return;
      }

      setThinking(true);
      setMessage(
        "Computer is analyzing the position..."
      );

      const delay =
        difficulty === "easy"
          ? 550
          : difficulty === "medium"
            ? 850
            : 1200;

      await sleep(delay);

      const game =
        gameRef.current;

      const move =
        chooseComputerMove(
          game,
          difficulty
        );

      if (!move) {
        setThinking(false);
        syncGame();
        return;
      }

      try {
        const playedMove =
          game.move({
            from: move.from,
            to: move.to,
            promotion:
              move.promotion,
          });

        setLastMove({
          from: move.from,
          to: move.to,
        });

        if (
          playedMove?.captured
        ) {
          if (
            playedMove.color ===
            "b"
          ) {
            setCapturedWhite(
              (current) => [
                ...current,
                playedMove.captured as PieceSymbol,
              ]
            );
          } else {
            setCapturedBlack(
              (current) => [
                ...current,
                playedMove.captured as PieceSymbol,
              ]
            );
          }
        }

        setFen(game.fen());

        setMoveHistory(
          game.history()
        );

        const status =
          getGameMessage(game);

        setResult(status.result);
        setMessage(status.message);

        if (
          status.result ===
          "computer-won"
        ) {
          setWins((current) => ({
            ...current,
            computer:
              current.computer + 1,
          }));
        }
      } finally {
        setThinking(false);
      }
    },
    [difficulty, syncGame]
  );

  /* ===========================================================
     TRIGGER COMPUTER
  =========================================================== */

  useEffect(() => {
    if (
      gameRef.current.turn() === "b" &&
      result === "playing" &&
      !thinking &&
      !promotionSquare
    ) {
      void computerTurn();
    }
  }, [
    computerTurn,
    fen,
    promotionSquare,
    result,
    thinking,
  ]);

  /* ===========================================================
     SELECT SQUARE
  =========================================================== */

  const handleSquareClick =
    useCallback(
      (square: string) => {
        const game =
          gameRef.current;

        if (
          thinking ||
          result !== "playing" ||
          game.turn() !== "w"
        ) {
          return;
        }

        /* If a piece is already selected */

        if (selectedSquare) {
          if (
            legalTargets.includes(square)
          ) {
            const piece =
              game.get(
                selectedSquare as SquareName
              );

            if (
              piece?.type === "p" &&
              square[1] === "8"
            ) {
              setPromotionFrom(
                selectedSquare
              );

              setPromotionSquare(
                square
              );

              return;
            }

            const success =
              makePlayerMove(
                selectedSquare,
                square
              );

            if (!success) {
              setSelectedSquare(
                null
              );
              setLegalTargets([]);
            }

            return;
          }

          /* Clicking another own piece */

          const newPiece =
            game.get(
              square as SquareName
            );

          if (
            newPiece &&
            newPiece.color === "w"
          ) {
            const moves =
              game.moves({
                square:
                  square as SquareName,
                verbose: true,
              });

            setSelectedSquare(
              square
            );

            setLegalTargets(
              moves.map(
                (move) => move.to
              )
            );

            return;
          }

          setSelectedSquare(null);
          setLegalTargets([]);

          return;
        }

        /* First selection */

        const piece =
          game.get(
            square as SquareName
          );

        if (
          !piece ||
          piece.color !== "w"
        ) {
          return;
        }

        const moves =
          game.moves({
            square:
              square as SquareName,
            verbose: true,
          });

        if (!moves.length) {
          return;
        }

        setSelectedSquare(square);

        setLegalTargets(
          moves.map(
            (move) => move.to
          )
        );
      },
      [
        legalTargets,
        makePlayerMove,
        result,
        selectedSquare,
        thinking,
      ]
    );

  /* ===========================================================
     PROMOTION
  =========================================================== */

  const choosePromotion =
    useCallback(
      (piece: PromotionPiece) => {
        if (
          !promotionFrom ||
          !promotionSquare
        ) {
          return;
        }

        makePlayerMove(
          promotionFrom,
          promotionSquare,
          piece
        );

        setPromotionFrom(null);
        setPromotionSquare(null);
      },
      [
        makePlayerMove,
        promotionFrom,
        promotionSquare,
      ]
    );

  /* ===========================================================
     CAPTURED DISPLAY
  =========================================================== */

  const capturedWhiteDisplay =
    capturedWhite.map(
      (piece, index) => (
        <span
          key={`${piece}-${index}`}
          className="text-white/45"
        >
          {getPieceSymbol(
            "w",
            piece
          )}
        </span>
      )
    );

  const capturedBlackDisplay =
    capturedBlack.map(
      (piece, index) => (
        <span
          key={`${piece}-${index}`}
          className="text-white/45"
        >
          {getPieceSymbol(
            "b",
            piece
          )}
        </span>
      )
    );

  /* ===========================================================
     LAST MOVE
  =========================================================== */

  const lastMoveText =
    moveHistory.length > 0
      ? moveHistory[
          moveHistory.length - 1
        ]
      : "—";

  /* ===========================================================
     RENDER
  =========================================================== */

  return (
    <section className="mx-auto w-full max-w-[1550px] py-5 sm:py-8">
      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08080c] shadow-[0_35px_120px_rgba(0,0,0,0.62)]">

        {/* =====================================================
            ATMOSPHERE
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-48 top-20 h-[600px] w-[600px] rounded-full bg-violet-600/[0.10] blur-[150px]" />

          <div className="absolute -right-48 bottom-0 h-[600px] w-[600px] rounded-full bg-cyan-600/[0.07] blur-[150px]" />

          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/[0.035] blur-[140px]" />

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
          aria-label="Close chess"
          className="group absolute right-4 top-4 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/40 backdrop-blur-xl transition hover:border-fuchsia-300/30 hover:bg-fuchsia-300/10 hover:text-white sm:right-7 sm:top-7"
        >
          <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="relative border-b border-white/[0.08] px-5 py-7 pr-16 sm:px-8 sm:py-9 sm:pr-20 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-violet-300">
                <Crown className="h-3.5 w-3.5" />
                Classic Strategy
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
                Shatranj
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                Player vs Computer — a
                cinematic take on the
                classic game of chess.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-cyan-200/60">
                <UserRound className="h-3.5 w-3.5" />
                You
              </div>

              <div className="text-white/20">
                VS
              </div>

              <div className="flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.05] px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-violet-200/60">
                <Bot className="h-3.5 w-3.5" />
                AI
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="relative grid gap-7 p-4 sm:p-7 lg:grid-cols-[minmax(0,1fr)_330px] lg:p-10 xl:gap-10">

          {/* ===================================================
              CHESS BOARD
          =================================================== */}

          <div className="min-w-0">

            {/* STATUS */}

            <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3 sm:px-5">

              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[0.05]">
                  {thinking ? (
                    <Brain className="h-5 w-5 animate-pulse text-violet-300" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-violet-300/70" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                    Game status
                  </p>

                  <p className="mt-1 truncate text-sm text-white/65">
                    {message}
                  </p>
                </div>
              </div>

              {gameRef.current.isCheck() &&
                result === "playing" && (
                  <div className="ml-3 hidden shrink-0 rounded-full border border-rose-300/15 bg-rose-300/[0.05] px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-rose-200/65 sm:block">
                    Check
                  </div>
                )}
            </div>

            {/* BOARD WRAPPER */}

            <div className="mx-auto w-full max-w-[900px]">

              <div className="rounded-[28px] border border-white/[0.12] bg-[#111017] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-3 lg:p-4">

                <div className="relative overflow-hidden rounded-[18px] border border-black/50 bg-[#2d2119]">

                  {/* BOARD FRAME */}

                  <div className="pointer-events-none absolute inset-0 z-[50] rounded-[18px] border-[5px] border-[#6b4b32]/80 shadow-[inset_0_0_35px_rgba(0,0,0,0.45)] sm:border-[7px]" />

                  {/* BOARD */}

                  <div className="grid aspect-square grid-cols-8 grid-rows-8">

                    {board.map(
                      (row, rowIndex) =>
                        row.map(
                          (
                            piece,
                            columnIndex
                          ) => {
                            const file =
                              FILES[
                                columnIndex
                              ];

                            const rank =
                              8 - rowIndex;

                            const square =
                              `${file}${rank}`;

                            const isLight =
                              (rowIndex +
                                columnIndex) %
                                2 ===
                              0;

                            const isSelected =
                              selectedSquare ===
                              square;

                            const isTarget =
                              legalTargets.includes(
                                square
                              );

                            const isLastMove =
                              lastMove?.from ===
                                square ||
                              lastMove?.to ===
                                square;

                            const isKing =
                              piece?.type ===
                              "k";

                            const isCheckedKing =
                              isKing &&
                              piece?.color ===
                                gameRef.current.turn() &&
                              gameRef.current.isCheck();

                            return (
                              <button
                                key={square}
                                type="button"
                                onClick={() =>
                                  handleSquareClick(
                                    square
                                  )
                                }
                                aria-label={`Chess square ${square}`}
                                className={`group relative flex aspect-square items-center justify-center overflow-hidden transition-colors duration-150 ${
                                  isLight
                                    ? "bg-[#d9c3a2]"
                                    : "bg-[#704b35]"
                                } ${
                                  isSelected
                                    ? "ring-inset ring-4 ring-violet-400/75"
                                    : ""
                                } ${
                                  isLastMove
                                    ? "before:absolute before:inset-0 before:bg-amber-300/20"
                                    : ""
                                } ${
                                  isCheckedKing
                                    ? "bg-rose-500/70"
                                    : ""
                                }`}
                              >

                                {/* Subtle square glow */}

                                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:bg-white/[0.08]" />

                                {/* Coordinate labels */}

                                {columnIndex ===
                                  0 && (
                                  <span
                                    className={`absolute left-1 top-1 z-[4] font-mono text-[7px] font-semibold ${
                                      isLight
                                        ? "text-[#704b35]/70"
                                        : "text-[#d9c3a2]/70"
                                    } sm:left-1.5 sm:top-1.5 sm:text-[9px]`}
                                  >
                                    {rank}
                                  </span>
                                )}

                                {rowIndex ===
                                  7 && (
                                  <span
                                    className={`absolute bottom-1 right-1 z-[4] font-mono text-[7px] font-semibold ${
                                      isLight
                                        ? "text-[#704b35]/70"
                                        : "text-[#d9c3a2]/70"
                                    } sm:bottom-1.5 sm:right-1.5 sm:text-[9px]`}
                                  >
                                    {file}
                                  </span>
                                )}

                                {/* Legal move target */}

                                {isTarget && (
                                  <span
                                    className={`pointer-events-none absolute z-[8] rounded-full ${
                                      piece
                                        ? "inset-[7%] border-[3px] border-rose-400/70 shadow-[inset_0_0_0_2px_rgba(0,0,0,0.15)]"
                                        : "h-[22%] w-[22%] bg-black/25 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]"
                                    }`}
                                  />
                                )}

                                {/* Piece */}

                                {piece && (
                                  <span
                                    className={`relative z-[10] select-none font-serif leading-none transition-transform duration-150 ${
                                      isSelected
                                        ? "-translate-y-1 scale-110"
                                        : "group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
                                    } ${
                                      piece.color ===
                                      "w"
                                        ? "text-[#fff7e8] [text-shadow:0_2px_2px_rgba(0,0,0,0.8),0_0_8px_rgba(255,255,255,0.18)]"
                                        : "text-[#16131a] [text-shadow:0_1px_1px_rgba(255,255,255,0.18),0_0_10px_rgba(0,0,0,0.45)]"
                                    } ${
                                      piece.type ===
                                      "k"
                                        ? "text-[clamp(2.3rem,6vw,4.7rem)]"
                                        : "text-[clamp(2.1rem,5.6vw,4.4rem)]"
                                    }`}
                                  >
                                    {getPieceSymbol(
                                      piece.color,
                                      piece.type
                                    )}
                                  </span>
                                )}

                                {/* Empty target hint */}

                                {isTarget &&
                                  !piece && (
                                    <span className="pointer-events-none absolute z-[9] h-2 w-2 rounded-full bg-white/35 blur-[1px] sm:h-3 sm:w-3" />
                                  )}
                              </button>
                            );
                          }
                        )
                    )}
                  </div>
                </div>
              </div>

              {/* BOARD LEGEND */}

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[8px] uppercase tracking-[0.15em] text-white/25">

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-300/70" />
                  Select piece
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  Legal move
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                  Capture
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================
              SIDE PANEL
          =================================================== */}

          <aside className="flex flex-col gap-4">

            {/* =================================================
                PLAYER / COMPUTER
            ================================================= */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                  Battle
                </p>

                <Zap className="h-4 w-4 text-violet-300/55" />
              </div>

              <div className="mt-4 space-y-3">

                {/* Player */}

                <div
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                    gameRef.current.turn() ===
                    "w"
                      ? "border-fuchsia-300/20 bg-fuchsia-300/[0.055]"
                      : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-fuchsia-300/15 bg-fuchsia-300/[0.05]">
                      <UserRound className="h-4 w-4 text-fuchsia-300/80" />
                    </div>

                    <div>
                      <p className="text-xs text-white/65">
                        You
                      </p>

                      <p className="text-[8px] uppercase tracking-[0.15em] text-fuchsia-300/40">
                        White
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                    Player
                  </span>
                </div>

                {/* Computer */}

                <div
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                    gameRef.current.turn() ===
                    "b"
                      ? "border-cyan-300/20 bg-cyan-300/[0.055]"
                      : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/15 bg-cyan-300/[0.05]">
                      <Bot className="h-4 w-4 text-cyan-300/80" />
                    </div>

                    <div>
                      <p className="text-xs text-white/65">
                        Computer
                      </p>

                      <p className="text-[8px] uppercase tracking-[0.15em] text-cyan-300/40">
                        Black
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                DIFFICULTY
            ================================================= */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                    AI difficulty
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Choose your opponent
                  </p>
                </div>

                <Brain className="h-4 w-4 text-violet-300/50" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">

                {(
                  [
                    [
                      "easy",
                      "Easy",
                    ],
                    [
                      "medium",
                      "Medium",
                    ],
                    [
                      "hard",
                      "Hard",
                    ],
                  ] as const
                ).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setDifficulty(
                          value
                        )
                      }
                      disabled={
                        thinking ||
                        moveHistory.length >
                          0
                      }
                      className={`rounded-xl border px-2 py-2.5 text-[8px] uppercase tracking-[0.12em] transition ${
                        difficulty ===
                        value
                          ? "border-violet-300/30 bg-violet-300/[0.10] text-violet-100"
                          : "border-white/[0.07] bg-white/[0.02] text-white/30 hover:border-white/15 hover:text-white/60"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>

              {moveHistory.length >
                0 && (
                <p className="mt-3 text-[8px] leading-4 text-white/20">
                  Difficulty is locked after
                  the first move. Start a new
                  game to change it.
                </p>
              )}
            </div>

            {/* =================================================
                CAPTURED
            ================================================= */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                Captured pieces
              </p>

              <div className="mt-4 space-y-3">

                <div>
                  <p className="mb-2 text-[8px] uppercase tracking-[0.12em] text-white/20">
                    Your pieces lost
                  </p>

                  <div className="min-h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5">
                    <div className="flex flex-wrap gap-0.5 text-xl">
                      {capturedWhiteDisplay.length >
                      0 ? (
                        capturedWhiteDisplay
                      ) : (
                        <span className="text-[9px] text-white/15">
                          None
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[8px] uppercase tracking-[0.12em] text-white/20">
                    Computer pieces lost
                  </p>

                  <div className="min-h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5">
                    <div className="flex flex-wrap gap-0.5 text-xl">
                      {capturedBlackDisplay.length >
                      0 ? (
                        capturedBlackDisplay
                      ) : (
                        <span className="text-[9px] text-white/15">
                          None
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                MOVE HISTORY
            ================================================= */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                  Move history
                </p>

                <span className="font-mono text-[9px] text-white/20">
                  {moveHistory.length}
                </span>
              </div>

              <div className="mt-3 max-h-[150px] overflow-y-auto rounded-xl border border-white/[0.06] bg-black/20 p-3 scrollbar-thin">

                {moveHistory.length ===
                0 ? (
                  <p className="text-[9px] text-white/20">
                    No moves yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {moveHistory.map(
                      (
                        move,
                        index
                      ) => (
                        <div
                          key={`${move}-${index}`}
                          className="flex items-center gap-2 font-mono text-[9px]"
                        >
                          <span className="w-5 text-white/15">
                            {Math.floor(
                              index / 2
                            ) + 1}
                            {index % 2 === 0
                              ? "."
                              : "..."}
                          </span>

                          <span
                            className={
                              index % 2 ===
                              0
                                ? "text-white/55"
                                : "text-cyan-200/45"
                            }
                          >
                            {move}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="text-[8px] uppercase tracking-[0.12em] text-white/20">
                  Last move
                </span>

                <span className="font-mono text-[9px] text-white/45">
                  {lastMoveText}
                </span>
              </div>
            </div>

            {/* =================================================
                SCORE
            ================================================= */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">

              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-300/55" />

                <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                  Score
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-fuchsia-300/[0.09] bg-fuchsia-300/[0.025] p-3 text-center">
                  <p className="text-[8px] uppercase tracking-[0.14em] text-white/20">
                    You
                  </p>

                  <p className="mt-1 font-mono text-2xl text-fuchsia-300">
                    {wins.player}
                  </p>
                </div>

                <div className="rounded-xl border border-cyan-300/[0.09] bg-cyan-300/[0.025] p-3 text-center">
                  <p className="text-[8px] uppercase tracking-[0.14em] text-white/20">
                    AI
                  </p>

                  <p className="mt-1 font-mono text-2xl text-cyan-300">
                    {wins.computer}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                GAME RESULT
            ================================================= */}

            {result !== "playing" && (
              <div
                className={`rounded-2xl border p-5 ${
                  result ===
                  "player-won"
                    ? "border-fuchsia-300/20 bg-fuchsia-300/[0.055]"
                    : result ===
                        "computer-won"
                      ? "border-cyan-300/20 bg-cyan-300/[0.055]"
                      : "border-amber-300/20 bg-amber-300/[0.055]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/20">
                    {result ===
                    "player-won" ? (
                      <Trophy className="h-5 w-5 text-fuchsia-300" />
                    ) : result ===
                      "computer-won" ? (
                      <Bot className="h-5 w-5 text-cyan-300" />
                    ) : (
                      <Crown className="h-5 w-5 text-amber-300" />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-medium text-white/70">
                      {result ===
                      "player-won"
                        ? "Victory"
                        : result ===
                            "computer-won"
                          ? "Computer Victory"
                          : "Draw"}
                    </p>

                    <p className="mt-1 text-[9px] text-white/30">
                      {message}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetGame}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45 transition hover:border-violet-300/25 hover:bg-violet-300/[0.06] hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Play Again
                </button>
              </div>
            )}

            {/* =================================================
                RESET / CLOSE
            ================================================= */}

            <button
              type="button"
              onClick={resetGame}
              disabled={thinking}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/35 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New Game
            </button>

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

        {/* =====================================================
            PROMOTION MODAL
        ===================================================== */}

        {promotionSquare && (
          <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/70 p-5 backdrop-blur-md">

            <div className="w-full max-w-sm rounded-[26px] border border-white/10 bg-[#101017] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.7)]">

              <div className="text-center">
                <p className="text-[9px] uppercase tracking-[0.25em] text-violet-300/70">
                  Pawn Promotion
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  Choose your piece
                </h2>

                <p className="mt-2 text-xs leading-5 text-white/35">
                  Your pawn reached the
                  final rank. Select its new
                  piece.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-3">

                {(
                  [
                    [
                      "q",
                      "Queen",
                      "♕",
                    ],
                    [
                      "r",
                      "Rook",
                      "♖",
                    ],
                    [
                      "b",
                      "Bishop",
                      "♗",
                    ],
                    [
                      "n",
                      "Knight",
                      "♘",
                    ],
                  ] as const
                ).map(
                  ([piece, label, glyph]) => (
                    <button
                      key={piece}
                      type="button"
                      onClick={() =>
                        choosePromotion(
                          piece
                        )
                      }
                      className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-violet-300/30 hover:bg-violet-300/[0.07]"
                    >
                      <span className="block font-serif text-4xl text-white/85 transition group-hover:scale-110">
                        {glyph}
                      </span>

                      <span className="mt-2 block text-[8px] uppercase tracking-[0.12em] text-white/30">
                        {label}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
