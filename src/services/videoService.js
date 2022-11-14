import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://vqlirfynkudkhuyqzsop.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxbGlyZnlua3Vka2h1eXF6c29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTkxMzUsImV4cCI6MTk4Mzc3NTEzNX0.6GYqITqMnelZUY-S035HrfHT3_8f0HTvvcSO68NU2uM";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    },
  };
}
