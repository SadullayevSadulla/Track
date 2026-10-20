const UZ_DIGITS_LENGTH = 9;

export function formatUzDigits(digits) {
  const clean = digits.replace(/\D/g, "").slice(0, UZ_DIGITS_LENGTH);
  const parts = [
    clean.slice(0, 2),
    clean.slice(2, 5),
    clean.slice(5, 7),
    clean.slice(7, 9),
  ].filter(Boolean);

  return parts.join(" ");
}