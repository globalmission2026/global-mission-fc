/**
 * Admin user bootstrap script.
 *
 * Usage:
 *   node scripts/create-admin.mjs
 *
 * This will prompt for an email + password and create the user
 * via Supabase Admin API (requires SERVICE_ROLE_KEY).
 */

import { createClient } from "@supabase/supabase-js";
import { createInterface } from "readline";
import { stdin as input, stdout as output, env } from "process";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local manually (Node doesn't auto-load env files)
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
try {
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!env[key]) env[key] = val;
  }
} catch {}

const rl = createInterface({ input, output });

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing environment variables:");
    console.error("  NEXT_PUBLIC_SUPABASE_URL (required)");
    console.error("  SUPABASE_SERVICE_ROLE_KEY (required)");
    console.error("\nCreate a .env file or set them before running.");
    process.exit(1);
  }

  const email = await ask("Admin email: ");
  if (!email) { console.error("Email is required."); process.exit(1); }

  const password = await ask("Admin password (min 6 chars): ");
  if (!password || password.length < 6) {
    console.error("Password must be at least 6 characters.");
    process.exit(1);
  }

  rl.close();

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    console.error("Failed to create admin user:", error.message);
    process.exit(1);
  }

  console.log(`\n✓ Admin user created successfully:`);
  console.log(`  Email: ${email}`);
  console.log(`  ID:    ${data.user.id}`);
}

main();
