export function sanitizeString(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().slice(0, 300);
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s()+-]/g, "").trim().slice(0, 30);
}