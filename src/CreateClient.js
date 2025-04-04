import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dvtcdzxsgvwtjtqndzgf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dGNkenhzZ3Z3dGp0cW5kemdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NjMzMjMsImV4cCI6MjA1OTMzOTMyM30.4BOsHeUMpbblyXoDCjpKnf8TQ0SHqulDce441GdMSH0"
);
