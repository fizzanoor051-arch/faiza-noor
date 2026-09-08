export function cn(
  ...classes: Array<
    string | false | null | undefined
  >
) {
  return classes.filter(Boolean).join(" ");
}

export function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(
  start: number,
  end: number,
  amount: number
) {
  return start + (end - start) * amount;
}

export function formatNumber(
  value: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0
) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) =>
    setTimeout(resolve, ms)
  );
}

export function isBrowser() {
  return typeof window !== "undefined";
}

export function scrollToId(id: string) {
  if (!isBrowser()) return;

  const element = document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function truncateText(
  text: string,
  maxLength: number
) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}…`;
}

export function isExternalLink(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(href);
}

export function getCurrentYear() {
  return new Date().getFullYear();
}