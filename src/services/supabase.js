import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://raagncmbxqjxqzxwdrco.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYWduY21ieHFqeHF6eHdkcmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2NDA5OTgsImV4cCI6MjA4MjIxNjk5OH0.3K7unoGSPOFElSuy6FS_K1Hgg55j3ZJtyqLk2-McE0A';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
