import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const key = process.env.ENCRYPTION_KEY;

if (!key) {
  throw new Error("ENCRYPTION_KEY is not defined");
}

const ENCRYPTION_ALGORITHM = "aes-256-ctr";
const ENCRYPTION_KEY = Buffer.from(key, "hex");

export function encrypt(text: string) {
  const iv = randomBytes(16);

  const cipher = createCipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);

  const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);

  return JSON.stringify({
    iv: iv.toString("hex"),
    content: encryptedText.toString("hex"),
  });
}

export function decrypt(payload: string) {
  const parsed = JSON.parse(payload);

  const iv = Buffer.from(parsed.iv, "hex");
  const encryptedText = Buffer.from(parsed.content, "hex");

  const decipher = createDecipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);

  const decryptedText = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decryptedText.toString("utf8");
}
