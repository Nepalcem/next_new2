export interface CTRFormData {
  source: string;
  description: string;
  ptm: number;
  time_spent: number;
}

export interface CTRRecord {
  id: number;
  user_id: number;
  source: string;
  time_spent: number;
  description: string;
  ptm: number;
  created_at: string;
}