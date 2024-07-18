import crypto from "crypto";

export function generatePasswordResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 3600000; // 1 hour
  return { token, expires };
}
