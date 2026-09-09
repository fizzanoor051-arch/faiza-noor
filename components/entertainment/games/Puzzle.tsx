
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  CircleAlert,
  Lightbulb,
  RotateCcw,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type Difficulty = "EASY" | "HARD" | "HARDEST";

type Puzzle = {
  id: number;
  category: string;
  difficulty: Difficulty;
  question: string;
  urduQuestion: string;
  options: string[];
  urduOptions: string[];
  answer: number;
  explanation: string;
  urduExplanation: string;
  trap: string;
  urduTrap: string;
  insight: string;
  urduInsight: string;
};

const puzzles: Puzzle[] = [
  /* ============================================================
     EASY — 01
  ============================================================ */

  {
    id: 1,
    category: "Pattern",
    difficulty: "EASY",
    question:
      "Find the next number: 2, 4, 6, 8, ?",
    urduQuestion:
      "اگلا نمبر کون سا ہوگا؟ 2، 4، 6، 8، ؟",
    options: ["9", "10", "12"],
    urduOptions: ["9", "10", "12"],
    answer: 1,
    explanation:
      "Each number increases by 2. After 8 comes 10.",
    urduExplanation:
      "ہر نمبر میں 2 کا اضافہ ہو رہا ہے۔ 8 کے بعد 10 آئے گا۔",
    trap:
      "Do not overthink a simple pattern when the same rule works throughout the sequence.",
    urduTrap:
      "سادہ pattern کو بلاوجہ مشکل نہ بنائیں۔ یہاں شروع سے آخر تک ایک ہی اصول چل رہا ہے۔",
    insight:
      "This tests basic pattern recognition.",
    urduInsight:
      "یہ سوال بنیادی pattern پہچاننے کی صلاحیت کو جانچتا ہے۔",
  },

  /* ============================================================
     EASY — 02
  ============================================================ */

  {
    id: 2,
    category: "Logic",
    difficulty: "EASY",
    question:
      "A farmer has 5 apples. He gives 2 apples to his friend. How many apples does he have left?",
    urduQuestion:
      "ایک کسان کے پاس 5 سیب ہیں۔ وہ اپنے دوست کو 2 سیب دے دیتا ہے۔ اب اس کے پاس کتنے سیب بچ گئے؟",
    options: ["2", "3", "4"],
    urduOptions: ["2", "3", "4"],
    answer: 1,
    explanation:
      "The farmer starts with 5 apples and gives away 2. 5 − 2 = 3.",
    urduExplanation:
      "کسان کے پاس شروع میں 5 سیب تھے اور اس نے 2 دے دیے۔ 5 − 2 = 3، اس لیے 3 سیب باقی ہیں۔",
    trap:
      "The trick is simply to subtract the apples that were given away.",
    urduTrap:
      "یہاں صرف دیے گئے سیب منفی کرنے ہیں۔ سوال کو غیر ضروری طور پر پیچیدہ بنانے کی ضرورت نہیں۔",
    insight:
      "Good problem solving starts by identifying exactly what changed.",
    urduInsight:
      "اچھی problem solving کی ابتدا اس بات سے ہوتی ہے کہ اصل میں کیا تبدیل ہوا ہے۔",
  },

  /* ============================================================
     EASY — 03
  ============================================================ */

  {
    id: 3,
    category: "Deduction",
    difficulty: "EASY",
    question:
      "Ali is taller than Bilal. Bilal is taller than Hamza. Who is the shortest?",
    urduQuestion:
      "علی بلال سے لمبا ہے۔ بلال حمزہ سے لمبا ہے۔ ان تینوں میں سب سے چھوٹا کون ہے؟",
    options: ["Ali", "Bilal", "Hamza"],
    urduOptions: ["علی", "بلال", "حمزہ"],
    answer: 2,
    explanation:
      "If Ali is taller than Bilal and Bilal is taller than Hamza, Hamza must be the shortest.",
    urduExplanation:
      "اگر علی بلال سے لمبا ہے اور بلال حمزہ سے لمبا ہے، تو حمزہ سب سے چھوٹا ہوگا۔",
    trap:
      "Do not focus only on the first comparison. Connect both statements.",
    urduTrap:
      "صرف پہلے جملے پر توجہ نہ دیں۔ دونوں معلومات کو آپس میں جوڑیں۔",
    insight:
      "This tests simple relational reasoning.",
    urduInsight:
      "یہ سوال لوگوں کے درمیان تعلق اور ترتیب سمجھنے کی صلاحیت کو جانچتا ہے۔",
  },

  /* ============================================================
     EASY — 04
  ============================================================ */

  {
    id: 4,
    category: "Lateral Thinking",
    difficulty: "EASY",
    question:
      "A man walks into a room and sees a table with four legs. How many legs are in the room if the man has two legs and a cat has four legs?",
    urduQuestion:
      "ایک آدمی کمرے میں داخل ہوتا ہے۔ وہاں چار ٹانگوں والی میز ہے۔ اگر آدمی کی 2 ٹانگیں اور بلی کی 4 ٹانگیں ہیں تو کمرے میں کل کتنی ٹانگیں ہیں؟",
    options: ["6", "10", "12"],
    urduOptions: ["6", "10", "12"],
    answer: 1,
    explanation:
      "The table has 4 legs, the man has 2, and the cat has 4. Total = 4 + 2 + 4 = 10.",
    urduExplanation:
      "میز کی 4، آدمی کی 2 اور بلی کی 4 ٹانگیں ہیں۔ کل 4 + 2 + 4 = 10 ٹانگیں ہیں۔",
    trap:
      "The question asks for all legs in the room, not just the furniture legs.",
    urduTrap:
      "سوال صرف میز کی ٹانگوں کے بارے میں نہیں بلکہ کمرے میں موجود تمام ٹانگوں کے بارے میں ہے۔",
    insight:
      "Read the whole question before calculating.",
    urduInsight:
      "حساب شروع کرنے سے پہلے پورا سوال غور سے پڑھنا ضروری ہے۔",
  },

  /* ============================================================
     EASY — 05
  ============================================================ */

  {
    id: 5,
    category: "Word Logic",
    difficulty: "EASY",
    question:
      "Which word becomes shorter when you add two letters to it?",
    urduQuestion:
      "کون سا English لفظ ایسا ہے جو اس میں دو حروف شامل کرنے سے مزید چھوٹا ہو جاتا ہے؟",
    options: ["Short", "Small", "Shorter"],
    urduOptions: ["Short", "Small", "Shorter"],
    answer: 0,
    explanation:
      "The word is 'short'. Adding 'er' makes 'shorter', which means more short.",
    urduExplanation:
      "'Short' میں 'er' شامل کرنے سے 'shorter' بنتا ہے، جس کا مطلب ہے زیادہ چھوٹا۔",
    trap:
      "This is a wordplay puzzle, not a mathematical question.",
    urduTrap:
      "یہ حساب کا سوال نہیں بلکہ الفاظ کے ساتھ کھیل ہے۔",
    insight:
      "Sometimes the answer depends on language rather than numbers.",
    urduInsight:
      "کبھی کبھی puzzle کا جواب نمبروں کے بجائے الفاظ کے مطلب میں چھپا ہوتا ہے۔",
  },

  /* ============================================================
     HARD — 06
  ============================================================ */

  {
    id: 6,
    category: "Lateral Logic",
    difficulty: "HARD",
    question:
      "Outside a locked room are three switches. Inside is one ordinary bulb. Only one switch controls it. You may enter the room only once. How can you identify the correct switch?",
    urduQuestion:
      "ایک بند کمرے کے باہر تین switches ہیں۔ کمرے کے اندر ایک عام bulb ہے اور صرف ایک switch اسے control کرتا ہے۔ آپ صرف ایک بار کمرے میں داخل ہو سکتے ہیں۔ آپ صحیح switch کیسے معلوم کریں گے؟",
    options: [
      "Turn switch A on for a few minutes, turn it off, turn B on, then enter and use light and warmth.",
      "Turn all switches on and enter immediately.",
      "Turn switch A on and enter immediately.",
    ],
    urduOptions: [
      "Switch A کو کچھ منٹ آن رکھیں، پھر آف کریں، Switch B آن کریں اور کمرے میں جا کر روشنی اور bulb کی گرمی دیکھیں۔",
      "تینوں switches آن کریں اور فوراً کمرے میں داخل ہو جائیں۔",
      "Switch A آن کریں اور فوراً کمرے میں داخل ہو جائیں۔",
    ],
    answer: 0,
    explanation:
      "Turn A on for several minutes, then turn it off. Turn B on and enter. If the bulb is on, B is correct. If it is off but warm, A is correct. If it is off and cold, C is correct.",
    urduExplanation:
      "Switch A کو کچھ منٹ آن رکھیں، پھر اسے آف کر دیں۔ اس کے بعد Switch B آن کریں اور کمرے میں جائیں۔ اگر bulb روشن ہے تو B صحیح ہے۔ اگر bulb بند مگر گرم ہے تو A صحیح ہے۔ اگر bulb بند اور ٹھنڈا ہے تو C صحیح ہے۔",
    trap:
      "The trap is thinking that you can only use the bulb's light as information. Its temperature also gives information.",
    urduTrap:
      "غلطی یہ ہے کہ آپ صرف bulb کی روشنی کو information سمجھیں۔ bulb کی گرمی بھی اہم information دیتی ہے۔",
    insight:
      "Strong reasoning finds extra information hidden in the situation.",
    urduInsight:
      "اچھی reasoning وہ اضافی information بھی تلاش کرتی ہے جو بظاہر نظر نہیں آ رہی ہوتی۔",
  },

  /* ============================================================
     HARD — 07
  ============================================================ */

  {
    id: 7,
    category: "Deduction",
    difficulty: "HARD",
    question:
      "You face two doors. One leads to safety and one to danger. One guard always tells the truth and the other always lies. You may ask exactly one question. What should you ask?",
    urduQuestion:
      "آپ کے سامنے دو دروازے ہیں۔ ایک محفوظ جگہ کی طرف جاتا ہے اور دوسرا خطرے کی طرف۔ ایک محافظ ہمیشہ سچ بولتا ہے اور دوسرا ہمیشہ جھوٹ۔ آپ صرف ایک سوال پوچھ سکتے ہیں۔ کیا پوچھیں گے؟",
    options: [
      "Ask which door the other guard would say is safe, then choose the opposite.",
      "Ask if the guard is truthful.",
      "Ask whether the left door is safe.",
    ],
    urduOptions: [
      "پوچھیں کہ دوسرا محافظ محفوظ دروازہ کون سا بتائے گا، پھر اس کے الٹ دروازہ منتخب کریں۔",
      "پوچھیں کہ کیا آپ سچ بولنے والے محافظ ہیں؟",
      "پوچھیں کہ کیا بایاں دروازہ محفوظ ہے؟",
    ],
    answer: 0,
    explanation:
      "Both guards will point you toward the dangerous door when asked what the other guard would choose. Therefore choose the opposite door.",
    urduExplanation:
      "دونوں محافظ دوسرے محافظ کے جواب کے بارے میں پوچھنے پر خطرناک دروازے کی طرف اشارہ کریں گے۔ اس لیے جس دروازے کی طرف وہ اشارہ کرے، اس کے مخالف دروازے کو منتخب کریں۔",
    trap:
      "Trying to identify the liar directly makes the problem harder than necessary.",
    urduTrap:
      "جھوٹے محافظ کو براہِ راست پہچاننے کی کوشش کرنا مسئلہ غیر ضروری طور پر مشکل بنا دیتا ہے۔",
    insight:
      "The best question can remove uncertainty instead of solving it directly.",
    urduInsight:
      "کبھی بہترین سوال uncertainty کو براہِ راست حل کرنے کے بجائے اسے ختم کر دیتا ہے۔",
  },

  /* ============================================================
     HARD — 08
  ============================================================ */

  {
    id: 8,
    category: "Probability",
    difficulty: "HARD",
    question:
      "There are three doors. One has a prize and two are empty. You choose Door 1. The host knows where the prize is and opens Door 3, showing it is empty. He offers Door 2. Should you switch?",
    urduQuestion:
      "تین دروازے ہیں۔ ایک کے پیچھے انعام ہے اور دو خالی ہیں۔ آپ نے Door 1 منتخب کیا۔ میزبان کو معلوم ہے کہ انعام کہاں ہے، اس نے Door 3 کھول کر دکھا دیا کہ وہ خالی ہے۔ اب وہ Door 2 لینے کی پیشکش کرتا ہے۔ کیا آپ کو switch کرنا چاہیے؟",
    options: [
      "Stay; both doors are now 50/50.",
      "Switch; Door 2 has a 2/3 chance of winning.",
      "It makes no difference.",
    ],
    urduOptions: [
      "اسی Door 1 پر رہیں؛ اب دونوں 50/50 ہیں۔",
      "Door 2 پر switch کریں؛ اس کے جیتنے کا امکان 2/3 ہے۔",
      "کوئی فرق نہیں پڑتا۔",
    ],
    answer: 1,
    explanation:
      "Your original choice had a 1/3 chance of being correct. The other two doors together had a 2/3 chance. The host deliberately removes one empty door, leaving the 2/3 probability with Door 2.",
    urduExplanation:
      "آپ کے پہلے انتخاب کے درست ہونے کا امکان صرف 1/3 تھا۔ باقی دونوں دروازوں پر مجموعی امکان 2/3 تھا۔ میزبان جان بوجھ کر ایک خالی دروازہ ہٹاتا ہے، اس لیے باقی Door 2 پر 2/3 امکان رہ جاتا ہے۔",
    trap:
      "The two remaining doors look like 50/50 choices, but the host's knowledge makes them unequal.",
    urduTrap:
      "دونوں باقی دروازے بظاہر 50/50 لگتے ہیں، لیکن میزبان کو انعام کی جگہ معلوم ہونے کی وجہ سے دونوں برابر نہیں ہیں۔",
    insight:
      "Probability depends on how information is revealed.",
    urduInsight:
      "Probability صرف نتائج پر نہیں بلکہ اس بات پر بھی منحصر ہوتی ہے کہ information کیسے سامنے آئی۔",
  },

  /* ============================================================
     HARD — 09
  ============================================================ */

  {
    id: 9,
    category: "Optimization",
    difficulty: "HARD",
    question:
      "Four people must cross a bridge at night. They have one flashlight. Their times are 1, 2, 7 and 10 minutes. Only two can cross at once. What is the minimum total time?",
    urduQuestion:
      "چار لوگوں کو رات کے وقت ایک پل پار کرنا ہے۔ ان کے پاس صرف ایک flashlight ہے۔ ان کے اوقات 1، 2، 7 اور 10 منٹ ہیں۔ ایک وقت میں زیادہ سے زیادہ دو لوگ جا سکتے ہیں۔ کم سے کم کل وقت کتنا ہوگا؟",
    options: ["19 minutes", "17 minutes", "21 minutes"],
    urduOptions: ["19 منٹ", "17 منٹ", "21 منٹ"],
    answer: 1,
    explanation:
      "1 and 2 cross = 2. 1 returns = 1. 7 and 10 cross = 10. 2 returns = 2. 1 and 2 cross again = 2. Total = 17 minutes.",
    urduExplanation:
      "1 اور 2 منٹ والے پہلے جائیں = 2 منٹ۔ 1 منٹ والا واپس آئے = 1 منٹ۔ 7 اور 10 منٹ والے ساتھ جائیں = 10 منٹ۔ 2 منٹ والا واپس آئے = 2 منٹ۔ آخر میں 1 اور 2 دوبارہ جائیں = 2 منٹ۔ کل 17 منٹ۔",
    trap:
      "Sending the fastest person back every time is not optimal.",
    urduTrap:
      "ہر بار سب سے تیز شخص کو واپس بھیجنا بہترین strategy نہیں ہے۔",
    insight:
      "Optimization means choosing the best sequence, not simply the fastest individual move.",
    urduInsight:
      "Optimization کا مطلب صرف تیز ترین move کرنا نہیں بلکہ پوری sequence میں بہترین strategy اختیار کرنا ہے۔",
  },

  /* ============================================================
     HARD — 10
  ============================================================ */

  {
    id: 10,
    category: "Binary Logic",
    difficulty: "HARD",
    question:
      "You have 8 identical bottles. Exactly one is poisoned. You have 3 test strips. Each strip can test a mixture of drops. How can you identify the poisoned bottle?",
    urduQuestion:
      "آپ کے پاس 8 ایک جیسی bottles ہیں۔ صرف ایک bottle میں زہر ہے۔ آپ کے پاس 3 test strips ہیں اور ہر strip پر کئی bottles کے قطرے ڈال سکتے ہیں۔ آپ زہریلی bottle کیسے معلوم کریں گے؟",
    options: [
      "Use a unique 3-bit binary pattern for every bottle.",
      "Put all bottles on every strip.",
      "Divide the bottles into large groups.",
    ],
    urduOptions: [
      "ہر bottle کو 3-bit binary کا ایک منفرد pattern دیں۔",
      "تمام bottles کے قطرے ہر strip پر ڈال دیں۔",
      "bottles کو بڑے بڑے groups میں تقسیم کریں۔",
    ],
    answer: 0,
    explanation:
      "Three strips produce 2³ = 8 possible positive/negative patterns. Give each bottle one unique binary code and use the positive-strip pattern to identify it.",
    urduExplanation:
      "3 strips سے 2³ یعنی 8 مختلف positive/negative patterns بن سکتے ہیں۔ ہر bottle کو ایک منفرد binary code دیں۔ جس pattern میں strips positive ہوں گی، وہی زہریلی bottle کا code ہوگا۔",
    trap:
      "Do not think of each strip as testing only one group. Each strip carries one bit of information.",
    urduTrap:
      "ہر strip کو صرف ایک group کا test سمجھنا غلط ہے۔ ہر strip information کا ایک bit دیتی ہے۔",
    insight:
      "Limited resources can become powerful when information is encoded efficiently.",
    urduInsight:
      "اگر information کو smart طریقے سے encode کیا جائے تو محدود resources بھی بہت طاقتور ہو سکتے ہیں۔",
  },

  /* ============================================================
     HARD — 11
  ============================================================ */

  {
    id: 11,
    category: "Clock Logic",
    difficulty: "HARD",
    question:
      "At exactly 3:00, the clock hands form a 90° angle. How many minutes after 3:00 will they next form a 90° angle?",
    urduQuestion:
      "بالکل 3:00 بجے clock کی دونوں needles کے درمیان 90° کا زاویہ ہوتا ہے۔ 3:00 کے بعد دوبارہ کب 90° کا زاویہ بنے گا؟",
    options: [
      "32 8/11 minutes",
      "30 minutes",
      "35 minutes",
    ],
    urduOptions: [
      "32 8/11 منٹ",
      "30 منٹ",
      "35 منٹ",
    ],
    answer: 0,
    explanation:
      "The minute hand moves 6° per minute and the hour hand moves 0.5° per minute. Their relative speed is 5.5° per minute. They need to gain 180°, so 180 ÷ 5.5 = 32 8/11 minutes.",
    urduExplanation:
      "Minute hand ہر منٹ 6° چلتی ہے جبکہ hour hand ہر منٹ 0.5° چلتی ہے۔ دونوں کی relative speed 5.5° فی منٹ ہے۔ اگلی 90° position کے لیے اسے 180° کا فرق طے کرنا ہوگا۔ 180 ÷ 5.5 = 32 8/11 منٹ۔",
    trap:
      "30 minutes seems obvious if you treat the hour hand as stationary, but it is moving too.",
    urduTrap:
      "30 منٹ جواب بظاہر آسان لگتا ہے، لیکن hour hand بھی مسلسل حرکت کر رہی ہوتی ہے۔",
    insight:
      "Always account for continuous movement in dynamic systems.",
    urduInsight:
      "متحرک systems میں ہمیشہ ہر moving part کی حرکت کو حساب میں شامل کریں۔",
  },

  /* ============================================================
     HARD — 12
  ============================================================ */

  {
    id: 12,
    category: "Geometry",
    difficulty: "HARD",
    question:
      "An 8×8 chessboard has two opposite corner squares removed. Can the remaining 62 squares be completely covered by 31 dominoes?",
    urduQuestion:
      "8×8 chessboard کے دو بالکل مخالف corner squares نکال دیے جائیں تو باقی 62 squares کو کیا 31 dominoes سے مکمل طور پر cover کیا جا سکتا ہے؟",
    options: [
      "Yes, because 62 is even.",
      "No, because the removed corners have the same color.",
      "Yes, if dominoes are placed diagonally.",
    ],
    urduOptions: [
      "ہاں، کیونکہ 62 ایک even number ہے۔",
      "نہیں، کیونکہ نکالے گئے دونوں corners ایک ہی رنگ کے ہیں۔",
      "ہاں، اگر dominoes کو diagonal رکھا جائے۔",
    ],
    answer: 1,
    explanation:
      "Opposite corners of a chessboard have the same color. Removing both leaves 30 squares of one color and 32 of the other. Every domino covers one black and one white square, so complete coverage is impossible.",
    urduExplanation:
      "Chessboard کے مخالف corners ایک ہی رنگ کے ہوتے ہیں۔ دونوں corners نکالنے سے ایک رنگ کے 30 اور دوسرے رنگ کے 32 squares رہ جاتے ہیں۔ ہر domino ہمیشہ ایک black اور ایک white square cover کرتا ہے، اس لیے board مکمل cover نہیں ہو سکتا۔",
    trap:
      "Even total area is not enough. The color balance also matters.",
    urduTrap:
      "صرف یہ دیکھنا کافی نہیں کہ 62 even ہے۔ black اور white squares کی تعداد بھی برابر ہونی چاہیے۔",
    insight:
      "Invariants can prove that something is impossible without trying every arrangement.",
    urduInsight:
      "Invariant ایسی property ہوتی ہے جس کی مدد سے ہر arrangement آزمانے کے بغیر بھی ثابت کیا جا سکتا ہے کہ کوئی کام ممکن ہے یا نہیں۔",
  },

  /* ============================================================
     HARD — 13
  ============================================================ */

  {
    id: 13,
    category: "Counterfeit Coin",
    difficulty: "HARD",
    question:
      "You have 12 identical-looking coins. Exactly one is lighter. What is the minimum number of balance-scale weighings needed to guarantee finding it?",
    urduQuestion:
      "آپ کے پاس 12 ایک جیسی دکھائی دینے والی coins ہیں۔ صرف ایک coin ہلکی ہے۔ balance scale استعمال کرتے ہوئے اسے یقینی طور پر معلوم کرنے کے لیے کم از کم کتنی weighings درکار ہیں؟",
    options: ["2", "3", "4"],
    urduOptions: ["2", "3", "4"],
    answer: 1,
    explanation:
      "Three weighings are enough. Divide into groups of four, then narrow the suspect group to two and finally compare the last two coins.",
    urduExplanation:
      "تین weighings کافی ہیں۔ پہلے 4 بمقابلہ 4 coins وزن کریں۔ پھر مشکوک 4 کو 2 بمقابلہ 2 کریں۔ آخر میں باقی 2 coins کو آپس میں weigh کریں اور ہلکی coin معلوم ہو جائے گی۔",
    trap:
      "Two weighings provide only 3² = 9 possible outcome patterns, but there are 12 possible coins.",
    urduTrap:
      "دو weighings سے زیادہ سے زیادہ 3² یعنی 9 outcome patterns مل سکتے ہیں، جبکہ ممکنہ coins 12 ہیں۔ اس لیے دو کافی نہیں۔",
    insight:
      "Information has limits. The number of possible outcomes matters.",
    urduInsight:
      "Information کی بھی ایک حد ہوتی ہے۔ ممکنہ outcomes کی تعداد کو دیکھنا ضروری ہے۔",
  },

  /* ============================================================
     HARDEST — 14
  ============================================================ */

  {
    id: 14,
    category: "Game Theory",
    difficulty: "HARDEST",
    question:
      "You have 21 stones. Players take 1, 2 or 3 stones per turn. The player who takes the last stone wins. If you go first, which move guarantees a win?",
    urduQuestion:
      "آپ کے پاس 21 پتھر ہیں۔ ہر کھلاڑی ایک turn میں 1، 2 یا 3 پتھر لے سکتا ہے۔ جو آخری پتھر لیتا ہے وہ جیتتا ہے۔ اگر آپ پہلے کھیلیں تو کون سی پہلی چال آپ کی جیت یقینی بنائے گی؟",
    options: [
      "Take 1 stone",
      "Take 2 stones",
      "Take 3 stones",
    ],
    urduOptions: [
      "1 پتھر لیں",
      "2 پتھر لیں",
      "3 پتھر لیں",
    ],
    answer: 0,
    explanation:
      "Multiples of 4 are losing positions. Take 1 and leave 20. After that, always make your move total 4 with the opponent's move.",
    urduExplanation:
      "4 کے multiples ایسی positions ہیں جہاں turn لینے والا نقصان میں ہوتا ہے۔ پہلے 1 پتھر لے کر 20 چھوڑ دیں۔ پھر opponent جتنے پتھر لے، آپ اتنے لیں کہ دونوں moves ملا کر 4 بن جائیں۔ آخر میں آخری پتھر آپ لیں گے۔",
    trap:
      "Taking 3 feels strongest, but strategy is about leaving the opponent a losing position.",
    urduTrap:
      "3 پتھر لینا بظاہر سب سے طاقتور لگتا ہے، لیکن اصل strategy opponent کو losing position میں چھوڑنے کی ہے۔",
    insight:
      "Winning often comes from controlling the position you leave behind.",
    urduInsight:
      "اکثر جیت اس بات سے آتی ہے کہ آپ opponent کے لیے کون سی position چھوڑتے ہیں۔",
  },

  /* ============================================================
     HARDEST — 15
  ============================================================ */

  {
    id: 15,
    category: "Measurement",
    difficulty: "HARDEST",
    question:
      "You have containers of 8L, 5L and 3L. They have no markings. All start empty. What is the minimum number of pours needed to get exactly 4L in one container?",
    urduQuestion:
      "آپ کے پاس 8 لیٹر، 5 لیٹر اور 3 لیٹر کے containers ہیں۔ ان پر کوئی markings نہیں۔ سب خالی ہیں۔ کم سے کم pours میں کسی ایک container میں بالکل 4 لیٹر پانی کیسے حاصل کریں گے؟",
    options: ["5 pours", "6 pours", "7 pours"],
    urduOptions: ["5 pours", "6 pours", "7 pours"],
    answer: 1,
    explanation:
      "Fill the 5L container, pour into the 3L container leaving 2L, move the 2L into the 3L container after emptying it, fill 5L again, then pour 1L into the 3L container. This leaves exactly 4L in the 5L container.",
    urduExplanation:
      "5L container بھریں۔ اسے 3L میں ڈالیں تو 5L میں 2L بچیں گے۔ 3L خالی کریں اور یہ 2L اس میں ڈال دیں۔ پھر 5L دوبارہ بھریں۔ اب 3L container میں پہلے سے 2L ہیں، اس لیے اسے مکمل کرنے کے لیے صرف 1L چاہیے۔ 5L میں بالکل 4L بچ جائیں گے۔",
    trap:
      "The hard part is tracking the amount left after every operation.",
    urduTrap:
      "اصل مشکل ہر step کے بعد بچنے والے پانی کی مقدار کو درست طریقے سے track کرنا ہے۔",
    insight:
      "Complex problems become easier when you track the state after every move.",
    urduInsight:
      "مشکل مسئلہ بھی آسان ہو جاتا ہے اگر ہر move کے بعد system کی حالت کو لکھ کر track کیا جائے۔",
  },

  /* ============================================================
     HARDEST — 16
  ============================================================ */

  {
    id: 16,
    category: "Prisoner Strategy",
    difficulty: "HARDEST",
    question:
      "Ten prisoners enter a room one at a time in arbitrary order. There is one light bulb, initially OFF. They cannot communicate after the process starts. What strategy guarantees that one prisoner can eventually know everyone has visited?",
    urduQuestion:
      "دس قیدی ایک ایک کر کے کسی بھی ترتیب سے ایک کمرے میں جاتے ہیں۔ کمرے میں ایک bulb ہے جو شروع میں OFF ہے۔ process شروع ہونے کے بعد وہ ایک دوسرے سے بات نہیں کر سکتے۔ ایسی کون سی strategy ہے جس سے ایک قیدی آخرکار یقین سے جان سکے کہ سب قیدی کمرے میں آ چکے ہیں؟",
    options: [
      "Choose one counter. Every other prisoner turns the bulb ON only once when possible; the counter turns it OFF and counts the signals.",
      "Everyone turns the bulb ON every time they enter.",
      "Everyone turns the bulb OFF every time they enter.",
    ],
    urduOptions: [
      "ایک counter منتخب کریں۔ باقی ہر قیدی مناسب موقع پر صرف ایک بار bulb ON کرے؛ counter اسے OFF کر کے signals گنتا رہے۔",
      "ہر قیدی ہر بار کمرے میں آ کر bulb ON کرے۔",
      "ہر قیدی ہر بار کمرے میں آ کر bulb OFF کرے۔",
    ],
    answer: 0,
    explanation:
      "Choose one prisoner as the counter. Each of the other nine prisoners may signal exactly once by turning the bulb on. The counter turns it off and counts each signal. After nine signals, all other prisoners must have visited.",
    urduExplanation:
      "ایک قیدی کو counter بنائیں۔ باقی 9 قیدیوں میں سے ہر ایک صرف ایک مرتبہ bulb ON کر کے اپنی موجودگی کا signal دے سکتا ہے۔ counter bulb OFF کر کے ہر signal count کرے گا۔ جب counter 9 signals گن لے گا تو اسے یقین ہوگا کہ باقی تمام 9 قیدی کمرے میں آ چکے ہیں۔",
    trap:
      "The bulb is not just a light; it is being used as a shared memory device.",
    urduTrap:
      "یہاں bulb صرف روشنی نہیں دے رہا بلکہ ایک shared memory کی طرح کام کر رہا ہے۔",
    insight:
      "This is an example of distributed systems thinking.",
    urduInsight:
      "یہ distributed systems جیسی سوچ کی مثال ہے، جہاں لوگ براہِ راست بات کیے بغیر ایک shared signal استعمال کرتے ہیں۔",
  },

  /* ============================================================
     HARDEST — 17
  ============================================================ */

  {
    id: 17,
    category: "Truth & Lies",
    difficulty: "HARDEST",
    question:
      "A says: 'B is lying.' B says: 'C is lying.' C says: 'A and B are both lying.' Exactly one statement is true. Who is telling the truth?",
    urduQuestion:
      "A کہتا ہے: 'B جھوٹ بول رہا ہے۔' B کہتا ہے: 'C جھوٹ بول رہا ہے۔' C کہتا ہے: 'A اور B دونوں جھوٹ بول رہے ہیں۔' صرف ایک statement سچ ہے۔ سچ کون بول رہا ہے؟",
    options: ["A", "B", "C"],
    urduOptions: ["A", "B", "C"],
    answer: 1,
    explanation:
      "If B is truthful, then C is lying. A's statement that B is lying is also false. Therefore exactly one statement — B's — is true.",
    urduExplanation:
      "اگر B سچ بول رہا ہے تو C کا statement جھوٹ ہوگا۔ A کا یہ کہنا کہ B جھوٹ بول رہا ہے بھی غلط ہوگا۔ اس طرح صرف B کی statement سچ رہتی ہے، جو شرط پوری کرتی ہے۔",
    trap:
      "You must evaluate all three statements together, not one at a time.",
    urduTrap:
      "تینوں statements کو ایک ساتھ evaluate کرنا ضروری ہے۔ صرف ایک statement کو الگ دیکھنے سے غلط نتیجہ نکل سکتا ہے۔",
    insight:
      "Logical consistency is more important than intuition.",
    urduInsight:
      "اس طرح کے puzzles میں intuition سے زیادہ logical consistency اہم ہوتی ہے۔",
  },

  /* ============================================================
     HARDEST — 18
  ============================================================ */

  {
    id: 18,
    category: "Master Deduction",
    difficulty: "HARDEST",
    question:
      "Four suspects A, B, C and D are questioned. Exactly one is guilty. A says 'B did it.' B says 'D did it.' C says 'I did not do it.' D says 'B is lying.' Exactly two statements are true. Who is guilty?",
    urduQuestion:
      "چار suspects A، B، C اور D سے پوچھ گچھ کی جاتی ہے۔ صرف ایک شخص guilty ہے۔ A کہتا ہے 'B نے کیا ہے۔' B کہتا ہے 'D نے کیا ہے۔' C کہتا ہے 'میں نے نہیں کیا۔' D کہتا ہے 'B جھوٹ بول رہا ہے۔' صرف دو statements سچ ہیں۔ guilty کون ہے؟",
    options: ["B", "C", "D"],
    urduOptions: ["B", "C", "D"],
    answer: 2,
    explanation:
      "If D is guilty: A is false, B is true, C is true, and D is false because B is telling the truth. Exactly two statements are true.",
    urduExplanation:
      "اگر D guilty ہے تو A کا statement غلط ہے۔ B کا 'D نے کیا ہے' سچ ہے۔ C کا 'میں نے نہیں کیا' بھی سچ ہے۔ D کا 'B جھوٹ بول رہا ہے' غلط ہے کیونکہ B سچ بول رہا ہے۔ یوں بالکل دو statements سچ بنتی ہیں۔",
    trap:
      "Every suspect must be tested against every statement. One matching clue is not enough.",
    urduTrap:
      "ہر suspect کو تمام statements کے ساتھ check کرنا ضروری ہے۔ صرف ایک clue match ہونے سے جواب ثابت نہیں ہوتا۔",
    insight:
      "Master deduction means finding the one candidate that satisfies the entire system.",
    urduInsight:
      "Master deduction میں وہی جواب درست ہوتا ہے جو پوری information اور تمام conditions کو ایک ساتھ satisfy کرے۔",
  },

  /* ============================================================
     HARDEST — 19
  ============================================================ */

  {
    id: 19,
    category: "Advanced Deduction",
    difficulty: "HARDEST",
    question:
      "Three people wear hats. Each hat is either red or blue. Everyone can see the other two hats. They know at least one hat is red. A says, 'I don't know my color.' B says, 'I don't know either.' C then says, 'Now I know my color.' What color is C's hat?",
    urduQuestion:
      "تین لوگ hats پہنے ہوئے ہیں۔ ہر hat یا تو سرخ ہے یا نیلی۔ ہر شخص باقی دونوں کی hats دیکھ سکتا ہے لیکن اپنی نہیں۔ انہیں معلوم ہے کہ کم از کم ایک hat سرخ ہے۔ A کہتا ہے 'مجھے اپنی hat کا رنگ معلوم نہیں۔' B کہتا ہے 'مجھے بھی نہیں معلوم۔' پھر C کہتا ہے 'اب مجھے اپنی hat کا رنگ معلوم ہے۔' C کی hat کا رنگ کیا ہے؟",
    options: ["Red", "Blue", "Cannot be determined"],
    urduOptions: ["سرخ", "نیلی", "معلوم نہیں کیا جا سکتا"],
    answer: 0,
    explanation:
      "The public statements change what each person knows. A's uncertainty rules out A seeing two blue hats. B's uncertainty gives another layer of information. C can then eliminate the blue possibility and conclude that C's hat is red.",
    urduExplanation:
      "یہاں اصل information صرف hats نہیں بلکہ A اور B کے statements بھی ہیں۔ A کا یہ کہنا کہ اسے معلوم نہیں، کچھ possibilities ختم کر دیتا ہے۔ B کا بھی یہی کہنا مزید possibilities ختم کرتا ہے۔ ان دونوں statements کو ملا کر C یہ نتیجہ نکال سکتا ہے کہ اس کی hat سرخ ہے۔",
    trap:
      "The puzzle requires reasoning about what other people know, not just what they see.",
    urduTrap:
      "یہ صرف hats دیکھنے کا مسئلہ نہیں۔ یہ سمجھنا بھی ضروری ہے کہ دوسرے شخص کو کیا معلوم ہے اور وہ کیا نہیں جانتا۔",
    insight:
      "This is higher-order reasoning: thinking about another person's knowledge.",
    urduInsight:
      "یہ higher-order reasoning ہے، یعنی دوسرے شخص کی knowledge کے بارے میں reasoning کرنا۔",
  },

  /* ============================================================
     HARDEST — 20
  ============================================================ */

  {
    id: 20,
    category: "Ultimate Logic",
    difficulty: "HARDEST",
    question:
      "A locked room has three switches outside and one bulb inside. You may enter only once. The bulb can become warm when switched on. What complete strategy identifies the correct switch?",
    urduQuestion:
      "ایک بند کمرے کے باہر تین switches ہیں اور اندر ایک bulb ہے۔ آپ صرف ایک بار کمرے میں داخل ہو سکتے ہیں۔ bulb آن ہونے کے بعد گرم بھی ہو سکتا ہے۔ ایسی مکمل strategy بتائیں جس سے صحیح switch یقینی طور پر معلوم ہو جائے۔",
    options: [
      "Turn A on for several minutes, turn A off, turn B on, then enter and check light and temperature.",
      "Turn A and B on together, then enter.",
      "Turn all switches off and enter.",
    ],
    urduOptions: [
      "A کو کچھ منٹ ON کریں، پھر OFF کریں، B کو ON کریں، پھر اندر جا کر روشنی اور bulb کی گرمی check کریں۔",
      "A اور B دونوں کو ایک ساتھ ON کریں اور پھر اندر جائیں۔",
      "تمام switches OFF کریں اور اندر جائیں۔",
    ],
    answer: 0,
    explanation:
      "If the bulb is ON, B controls it. If it is OFF but warm, A controls it. If it is OFF and cold, C controls it. One visit gives enough information because you use both light and temperature.",
    urduExplanation:
      "اگر bulb ON ہے تو B صحیح switch ہے۔ اگر bulb OFF لیکن گرم ہے تو A صحیح ہے۔ اگر bulb OFF اور ٹھنڈا ہے تو C صحیح ہے۔ یوں صرف ایک بار کمرے میں جا کر دو قسم کی information یعنی روشنی اور گرمی سے جواب معلوم ہو جاتا ہے۔",
    trap:
      "The key is using two different signals instead of relying only on whether the bulb is on.",
    urduTrap:
      "اصل trick یہ ہے کہ صرف bulb کے ON/OFF ہونے پر depend نہ کریں بلکہ اس کی temperature کو بھی signal کے طور پر استعمال کریں۔",
    insight:
      "The hardest puzzles often become solvable when you notice an overlooked source of information.",
    urduInsight:
      "مشکل puzzles اکثر اس وقت آسان ہو جاتے ہیں جب آپ وہ information دیکھ لیتے ہیں جسے باقی لوگ ignore کر رہے ہوتے ہیں۔",
  },
];

type ResultStats = {
  correct: number;
  wrong: number;
  attempted: number;
  score: number;
  bestStreak: number;
};

function getInitialStats(): ResultStats {
  return {
    correct: 0,
    wrong: 0,
    attempted: 0,
    score: 0,
    bestStreak: 0,
  };
}

export default function Puzzle({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [stats, setStats] = useState<ResultStats>(getInitialStats);
  const [streak, setStreak] = useState(0);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [finished, setFinished] = useState(false);

  const puzzle = puzzles[current];

  const accuracy = useMemo(() => {
    if (!stats.attempted) return 0;
    return Math.round((stats.correct / stats.attempted) * 100);
  }, [stats]);

  const answerQuestion = (index: number) => {
    if (answered) return;

    const isCorrect = index === puzzle.answer;
    const nextStreak = isCorrect ? streak + 1 : 0;

    setSelected(index);
    setAnswered(true);
    setStreak(nextStreak);

    setStats((prev) => ({
      ...prev,
      attempted: prev.attempted + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      score: Math.max(
        0,
        prev.score + (isCorrect ? 100 + streak * 20 : 0)
      ),
      bestStreak: Math.max(prev.bestStreak, nextStreak),
    }));
  };

  const nextPuzzle = () => {
    if (!answered) return;

    if (current === puzzles.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
    setAnswered(false);
  };

  const quitGame = () => {
    setShowQuitConfirm(false);
    setFinished(true);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setStats(getInitialStats());
    setStreak(0);
    setFinished(false);
    setShowQuitConfirm(false);
  };

  const percentage = Math.round(
    (stats.correct / puzzles.length) * 100
  );

  const unanswered = puzzles.length - stats.attempted;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050507] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[15%] h-[420px] w-[420px] rounded-full bg-violet-700/[0.09] blur-[150px]" />

        <div className="absolute right-[8%] top-[40%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/[0.06] blur-[150px]" />

        <div className="absolute bottom-[-100px] left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-700/[0.05] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,.65)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1250px] px-4 py-5 sm:px-6 lg:px-8">

        {/* HEADER */}

        <header className="flex items-center justify-between border-b border-white/[0.07] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/[0.08]">
              <Brain className="h-5 w-5 text-violet-300" />
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/70">
                Entertainment / Puzzles
              </div>

              <div className="mt-1 text-sm font-semibold tracking-wide text-white/90">
                Mind Challenge
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* BACK / CLOSE */}

            <button
              type="button"
              onClick={() => {
                if (onClose) {
                  onClose();
                } else {
                  setShowQuitConfirm(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-white/55 transition hover:border-violet-400/20 hover:bg-violet-500/[0.06] hover:text-violet-300"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQuitConfirm(true)}
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-white/55 transition hover:border-red-400/20 hover:bg-red-500/[0.06] hover:text-red-300"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Quit</span>
            </button>
          </div>
        </header>

        {!finished ? (
          <>
            {/* TOP STATS */}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                icon={<Target className="h-4 w-4" />}
                label="Progress"
                value={`${current + 1} / ${puzzles.length}`}
              />

              <StatCard
                icon={<Trophy className="h-4 w-4" />}
                label="Score"
                value={stats.score.toString()}
              />

              <StatCard
                icon={<Zap className="h-4 w-4" />}
                label="Streak"
                value={streak.toString()}
              />

              <StatCard
                icon={<Check className="h-4 w-4" />}
                label="Correct"
                value={stats.correct.toString()}
              />
            </div>

            {/* PROGRESS */}

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-blue-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((current + (answered ? 1 : 0)) /
                      puzzles.length) *
                    100
                  }%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* PUZZLE */}

            <AnimatePresence mode="wait">
              <motion.main
                key={puzzle.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-8 max-w-[950px]"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      {puzzle.category}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                        puzzle.difficulty === "HARDEST"
                          ? "border-red-400/20 bg-red-500/[0.06] text-red-300"
                          : puzzle.difficulty === "HARD"
                            ? "border-amber-400/20 bg-amber-500/[0.06] text-amber-300"
                            : "border-emerald-400/20 bg-emerald-500/[0.06] text-emerald-300"
                      }`}
                    >
                      {puzzle.difficulty}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                    Puzzle {String(puzzle.id).padStart(2, "0")}
                  </span>
                </div>

                <section className="rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

                  {/* QUESTION */}

                  <div className="flex gap-4">
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 sm:flex">
                      <Brain className="h-5 w-5 text-violet-300" />
                    </div>

                    <div className="flex-1">
                      <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-violet-300/50">
                        English
                      </div>

                      <h1 className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                        {puzzle.question}
                      </h1>

                      <div className="mt-6 border-t border-white/[0.06] pt-5">
                        <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-fuchsia-300/60">
                          اردو
                        </div>

                        <p
                          dir="rtl"
                          className="text-base leading-8 text-white/65 sm:text-lg"
                        >
                          {puzzle.urduQuestion}
                        </p>
                      </div>

                      <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-white/25">
                        Choose the answer you believe is logically correct.
                      </p>

                      <p
                        dir="rtl"
                        className="mt-2 text-right text-xs leading-6 text-white/25"
                      >
                        وہ جواب منتخب کریں جو آپ کے خیال میں منطقی طور پر درست ہے۔
                      </p>
                    </div>
                  </div>

                  {/* OPTIONS */}

                  <div className="mt-7 space-y-3">
                    {puzzle.options.map((option, index) => {
                      const isSelected = selected === index;
                      const isCorrect = index === puzzle.answer;

                      let stateClass =
                        "border-white/[0.08] bg-black/20 hover:border-violet-400/30 hover:bg-violet-500/[0.05]";

                      if (answered && isCorrect) {
                        stateClass =
                          "border-emerald-400/30 bg-emerald-500/[0.08]";
                      } else if (
                        answered &&
                        isSelected &&
                        !isCorrect
                      ) {
                        stateClass =
                          "border-red-400/30 bg-red-500/[0.08]";
                      }

                      return (
                        <motion.button
                          key={option}
                          type="button"
                          disabled={answered}
                          onClick={() => answerQuestion(index)}
                          whileHover={!answered ? { x: 4 } : undefined}
                          whileTap={!answered ? { scale: 0.99 } : undefined}
                          className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${stateClass} ${
                            answered
                              ? "cursor-default"
                              : "cursor-pointer"
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-bold ${
                              answered && isCorrect
                                ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-300"
                                : answered &&
                                    isSelected
                                  ? "border-red-300/30 bg-red-400/10 text-red-300"
                                  : "border-white/10 bg-white/[0.03] text-white/45 group-hover:border-violet-300/30 group-hover:text-violet-300"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>

                          <div className="flex-1">
                            <div className="pt-1 text-sm leading-6 text-white/75">
                              {option}
                            </div>

                            <div
                              dir="rtl"
                              className="mt-2 text-right text-sm leading-7 text-white/40"
                            >
                              {puzzle.urduOptions[index]}
                            </div>
                          </div>

                          {answered && isCorrect && (
                            <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                          )}

                          {answered &&
                            isSelected &&
                            !isCorrect && (
                              <X className="mt-1 h-5 w-5 shrink-0 text-red-300" />
                            )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* ANSWER EXPLANATION */}

                  <AnimatePresence>
                    {answered && selected !== null && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        className="mt-6 overflow-hidden"
                      >
                        <div
                          className={`rounded-2xl border p-5 ${
                            selected === puzzle.answer
                              ? "border-emerald-400/20 bg-emerald-500/[0.055]"
                              : "border-red-400/20 bg-red-500/[0.045]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {selected === puzzle.answer ? (
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                                <Check className="h-5 w-5 text-emerald-300" />
                              </div>
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-400/10">
                                <CircleAlert className="h-5 w-5 text-red-300" />
                              </div>
                            )}

                            <div>
                              <div
                                className={`text-sm font-bold ${
                                  selected === puzzle.answer
                                    ? "text-emerald-300"
                                    : "text-red-300"
                                }`}
                              >
                                {selected === puzzle.answer
                                  ? "Correct Answer"
                                  : "Wrong Answer"}
                              </div>

                              {selected !== puzzle.answer && (
                                <div className="mt-0.5 text-xs text-white/45">
                                  Correct answer:{" "}
                                  <span className="font-semibold text-white/80">
                                    {String.fromCharCode(
                                      65 + puzzle.answer
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* CORRECT OPTION */}

                          {selected !== puzzle.answer && (
                            <div className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-500/[0.045] p-4">
                              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300/70">
                                Correct Option
                              </div>

                              <div className="mt-2 text-sm leading-6 text-white/80">
                                <span className="mr-2 font-bold text-emerald-300">
                                  {String.fromCharCode(
                                    65 + puzzle.answer
                                  )}
                                  .
                                </span>

                                {puzzle.options[puzzle.answer]}
                              </div>

                              <p
                                dir="rtl"
                                className="mt-3 text-right text-sm leading-7 text-white/55"
                              >
                                {puzzle.urduOptions[puzzle.answer]}
                              </p>
                            </div>
                          )}

                          {/* EXPLANATION */}

                          <div className="mt-5 flex gap-3">
                            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />

                            <div className="flex-1">
                              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/70">
                                Explanation
                              </div>

                              <p className="mt-2 text-sm leading-7 text-white/65">
                                {puzzle.explanation}
                              </p>

                              <div className="my-4 h-px bg-white/[0.06]" />

                              <div
                                dir="rtl"
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/70"
                              >
                                وضاحت
                              </div>

                              <p
                                dir="rtl"
                                className="mt-2 text-right text-sm leading-8 text-white/60"
                              >
                                {puzzle.urduExplanation}
                              </p>
                            </div>
                          </div>

                          {/* TRAP */}

                          {selected !== puzzle.answer && (
                            <div className="mt-5 border-t border-white/[0.06] pt-5">
                              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-300/60">
                                The Trap
                              </div>

                              <p className="mt-2 text-xs leading-6 text-white/45">
                                {puzzle.trap}
                              </p>

                              <div
                                dir="rtl"
                                className="mt-3 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-red-300/60"
                              >
                                اصل الجھن
                              </div>

                              <p
                                dir="rtl"
                                className="mt-2 text-right text-xs leading-7 text-white/45"
                              >
                                {puzzle.urduTrap}
                              </p>
                            </div>
                          )}

                          {/* INSIGHT */}

                          <div className="mt-5 rounded-xl border border-violet-400/10 bg-violet-500/[0.035] p-4">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/70">
                              Mind Insight
                            </div>

                            <p className="mt-2 text-xs leading-6 text-white/50">
                              {puzzle.insight}
                            </p>

                            <div
                              dir="rtl"
                              className="mt-4 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/70"
                            >
                              ذہنی نکتہ
                            </div>

                            <p
                              dir="rtl"
                              className="mt-2 text-right text-xs leading-7 text-white/50"
                            >
                              {puzzle.urduInsight}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* NEXT */}

                  {answered && (
                    <motion.button
                      type="button"
                      onClick={nextPuzzle}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-black transition hover:bg-violet-100"
                    >
                      {current === puzzles.length - 1
                        ? "View Final Result"
                        : "Next Puzzle"}

                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  )}
                </section>

                {/* FOOTER HINT */}

                {!answered && (
                  <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/20">
                      <Brain className="h-3.5 w-3.5" />
                      Think carefully — the obvious answer may be the trap
                    </div>

                    <div
                      dir="rtl"
                      className="text-xs text-white/20"
                    >
                      غور سے سوچیں — بظاہر آسان جواب trap بھی ہو سکتا ہے۔
                    </div>
                  </div>
                )}
              </motion.main>
            </AnimatePresence>
          </>
        ) : (
          /* =====================================================
             FINAL RESULT
          ===================================================== */

          <motion.main
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mx-auto flex min-h-[75vh] max-w-[900px] items-center justify-center"
          >
            <div className="w-full rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
              <motion.div
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-violet-400/20 bg-violet-500/[0.08]"
              >
                <Trophy className="h-9 w-9 text-violet-300" />
              </motion.div>

              <div className="mt-6 text-[10px] font-bold uppercase tracking-[0.35em] text-violet-300/60">
                Puzzle Challenge Complete
              </div>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your Mind Result
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/40">
                {stats.attempted === puzzles.length
                  ? "You completed all 20 cognitive challenges."
                  : `You exited after attempting ${stats.attempted} of ${puzzles.length} puzzles.`}
              </p>

              <p
                dir="rtl"
                className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/35"
              >
                {stats.attempted === puzzles.length
                  ? "آپ نے تمام 20 ذہنی puzzles مکمل کر لیے ہیں۔"
                  : `آپ نے ${puzzles.length} میں سے ${stats.attempted} puzzles حل کیے۔`}
              </p>

              {/* SCORE */}

              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-black/20 p-6">
                <div className="text-5xl font-bold tracking-tight text-white">
                  {stats.score}
                </div>

                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
                  Final Score
                </div>
              </div>

              {/* RESULT GRID */}

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ResultCard
                  label="Correct"
                  value={stats.correct}
                  icon={<Check className="h-4 w-4" />}
                  positive
                />

                <ResultCard
                  label="Wrong"
                  value={stats.wrong}
                  icon={<X className="h-4 w-4" />}
                />

                <ResultCard
                  label="Accuracy"
                  value={`${accuracy}%`}
                  icon={<Target className="h-4 w-4" />}
                />

                <ResultCard
                  label="Best Streak"
                  value={stats.bestStreak}
                  icon={<Zap className="h-4 w-4" />}
                />
              </div>

              {/* ATTEMPT SUMMARY */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                    Attempted
                  </div>

                  <div className="mt-2 text-xl font-semibold text-white">
                    {stats.attempted}
                    <span className="ml-1 text-sm font-normal text-white/25">
                      / {puzzles.length}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                    Unanswered
                  </div>

                  <div className="mt-2 text-xl font-semibold text-white">
                    {unanswered}
                  </div>
                </div>
              </div>

              {/* PERFORMANCE */}

              <div className="mt-6 rounded-2xl border border-violet-400/10 bg-violet-500/[0.035] p-5 text-left">
                <div className="flex gap-3">
                  <Brain className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />

                  <div>
                    <div className="text-sm font-semibold text-white/80">
                      {percentage >= 90
                        ? "Exceptional reasoning."
                        : percentage >= 75
                          ? "Strong analytical thinking."
                          : percentage >= 50
                            ? "Solid attempt — the harder puzzles exposed some traps."
                            : "The puzzles did their job — your next run can be stronger."}
                    </div>

                    <p className="mt-2 text-xs leading-6 text-white/40">
                      Your performance was tested across patterns,
                      deduction, probability, optimization, strategy
                      and lateral thinking.
                    </p>

                    <p
                      dir="rtl"
                      className="mt-3 text-right text-xs leading-7 text-white/35"
                    >
                      آپ کی performance کو patterns، deduction،
                      probability، strategy اور logical thinking کے
                      مختلف انداز سے جانچا گیا۔
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={restart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-black transition hover:bg-violet-100"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onClose) {
                      onClose();
                    } else {
                      window.history.back();
                    }
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Experiences
                </button>
              </div>
            </div>
          </motion.main>
        )}

        {/* =====================================================
            QUIT CONFIRMATION
        ===================================================== */}

        <AnimatePresence>
          {showQuitConfirm && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-5 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  y: 15,
                }}
                className="w-full max-w-md rounded-[26px] border border-white/10 bg-[#0b0a10] p-6 shadow-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.07]">
                  <CircleAlert className="h-5 w-5 text-amber-300" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  Quit Puzzle Challenge?
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Your current progress will end, but you will still
                  get a complete result showing your correct, wrong
                  and unanswered puzzles.
                </p>

                <p
                  dir="rtl"
                  className="mt-2 text-right text-sm leading-7 text-white/40"
                >
                  اگر ابھی quit کرتے ہیں تو progress ختم ہو جائے گی،
                  لیکن آپ کو مکمل result دکھایا جائے گا کہ کتنے
                  درست، غلط اور unanswered رہے۔
                </p>

                <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/35">
                      Attempted
                    </span>

                    <span className="font-semibold text-white/75">
                      {stats.attempted} / {puzzles.length}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-white/35">
                      Correct
                    </span>

                    <span className="font-semibold text-emerald-300">
                      {stats.correct}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-white/35">
                      Wrong
                    </span>

                    <span className="font-semibold text-red-300">
                      {stats.wrong}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setShowQuitConfirm(false)
                    }
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    Continue
                  </button>

                  <button
                    type="button"
                    onClick={quitGame}
                    className="flex-1 rounded-xl bg-red-500/90 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-500"
                  >
                    Quit & See Result
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowQuitConfirm(false);

                    if (onClose) {
                      onClose();
                    }
                  }}
                  className="mt-3 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/35 transition hover:bg-white/[0.05] hover:text-white/60"
                >
                  Close Puzzle
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
      <div className="flex items-center gap-2 text-white/30">
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>

      <div className="mt-2 text-lg font-semibold text-white/85">
        {value}
      </div>
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left">
      <div
        className={`flex items-center gap-2 ${
          positive
            ? "text-emerald-300/70"
            : "text-white/25"
        }`}
      >
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>

      <div
        className={`mt-2 text-xl font-semibold ${
          positive
            ? "text-emerald-300"
            : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
