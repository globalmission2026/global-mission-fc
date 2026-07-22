import { createClient } from "@supabase/supabase-js";
import { env } from "process";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

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
} catch (e) {}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  // Delete the two separate events
  const slugsToDelete = ["5th-annual-mega-conference", "free-medical-camp"];

  for (const slug of slugsToDelete) {
    const { error } = await supabase.from("events").delete().eq("slug", slug);
    if (error) {
      console.error(`Error deleting ${slug}:`, error.message);
    } else {
      console.log(`Deleted: ${slug}`);
    }
  }

  // Insert the combined event
  const combined = {
    title: "5th Annual Mega Conference & Free Medical Camp 2026",
    slug: "mega-conference-medical-camp-2026",
    start_date: new Date("2026-08-09T06:00:00Z").toISOString(), // 9 AM EAT = 6 AM UTC
    end_date: new Date("2026-08-16T18:00:00Z").toISOString(),
    location: "Kiamariga Nursery Grounds",
    excerpt: "Global Mission for Christ Int'l presents the 5th Annual Mega Conference & Free Medical Camp. Theme: Healing the Land – Amos 9:14, From Exile to Divine Restoration.",
    description: `<h2>5th Annual Mega Conference &amp; Free Medical Camp</h2>
<p><strong>Theme: Healing the Land — Amos 9:14 "From Exile to Divine Restoration"</strong></p>
<p>Global Mission for Christ International presents a powerful week of spiritual awakening, profound teachings, and divine encounters — combined with a Free Medical Camp serving the local community.</p>
<p><strong>Dates:</strong> 9th – 16th August 2026, from 9 AM daily</p>
<p><strong>Venue:</strong> Kiamariga Nursery Grounds</p>
<h3>Featured Speakers</h3>
<ul>
  <li>Rev. Anthony Waithaka – Director, GMCI</li>
  <li>Archbishop Simon Githigi – Elim Pentecostal Kenya</li>
  <li>Apostle Anthony Ngumo – Reigners Chapel</li>
  <li>Rev. James Nyaga – Excellent Glory Center</li>
  <li>Bishop Moses Mbugua – Redeemed Gospel Church, Thika</li>
  <li>Bishop Dr. Margaret Wangare – Anointed Christian Fellowship, Banana</li>
</ul>
<p><em>All are welcome!</em></p>`,
    image_url: "/images/events/mega-conference-2026.jpg",
    is_featured: true,
  };

  const { error: insertErr } = await supabase.from("events").insert([combined]);
  if (insertErr) {
    console.error("Error inserting combined event:", insertErr.message);
  } else {
    console.log("Successfully created combined event:", combined.title);
  }
}

main();
