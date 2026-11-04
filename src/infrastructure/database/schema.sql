CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY NOT NULL,
  client_name TEXT NOT NULL CHECK (length(trim(client_name)) > 0),
  service TEXT NOT NULL CHECK (length(trim(service)) > 0),
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '' CHECK (length(notes) <= 500),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (appointment_date, appointment_time)
);
