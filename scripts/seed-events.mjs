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
} catch (e) {
  console.log("Error loading env:", e);
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const eventsToInsert = [
    {
      title: "Awake You Who Sleep Conference 2022",
      slug: "awake-you-who-sleep-2022",
      start_date: new Date("2022-04-15T09:00:00Z").toISOString(),
      end_date: new Date("2022-04-18T17:00:00Z").toISOString(),
      excerpt: "The Siege is Now Over - 2 Kings 7. Join us at Kiamariga Nursery School Grounds.",
      description: "<p>Theme: Awake You Who Sleep - Eph 5:14</p><p>The Siege is Now Over - 2 Kings 7.</p><p>Location: Kiamariga Nursery School Grounds (Near Sagana State Lodge).</p>",
      location: "Kiamariga Nursery School Grounds",
      image_url: "/images/gallery/IMG-20260515-WA0002.jpg"
    },
    {
      title: "Mt. Kenya Revival 2024",
      slug: "mt-kenya-revival-2024",
      start_date: new Date("2024-04-14T14:00:00Z").toISOString(),
      end_date: new Date("2024-04-21T21:00:00Z").toISOString(),
      excerpt: "He changes times and season - Daniel 2:21. Mt. Kenya Revival.",
      description: "<p>Theme: He changes times and season. Daniel 2:21</p><p>Location: Kiamariga Nursery Grounds, Near Sagana State Lodge, Nyeri.</p>",
      location: "Kiamariga Nursery Grounds, Nyeri",
      image_url: "/images/gallery/IMG-20260514-WA0009.jpg"
    },
    {
      title: "Mission Impact Breakfast",
      slug: "mission-impact-breakfast-2026",
      start_date: new Date("2026-07-10T09:00:00Z").toISOString(),
      excerpt: "Join us for a morning of fellowship, prayer, and inspiration as we unite in fundraising for the Great August Harvest.",
      description: "<p>Join us for a morning of fellowship, prayer, and inspiration as we unite in fundraising for the Great August Harvest, 5th Annual Mega Conference & Medical Camp.</p><p>Breakfast will be Served. Come Hungry - Leave Inspired.</p><p>Blessed are those who hunger and Thirst for righteousness, for they shall be filled. Mat 5:6 (NIV)</p>",
      location: "Y.M.C.A. HALL - NYERI TOWN",
      image_url: "/images/events/mission-impact-breakfast.jpg"
    }
  ];

  for (const ev of eventsToInsert) {
    // Check if exists
    const { data: existing } = await supabase.from("events").select("id").eq("slug", ev.slug).maybeSingle();
    if (existing) {
      console.log(`Event ${ev.slug} already exists, skipping.`);
      continue;
    }
    const { error } = await supabase.from("events").insert([ev]);
    if (error) {
      console.error(`Failed to insert ${ev.slug}:`, error.message);
    } else {
      console.log(`Successfully inserted: ${ev.title}`);
    }
  }
}

main();
