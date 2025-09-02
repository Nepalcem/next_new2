CREATE TABLE IF NOT EXISTS "Users" (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "SoldServices" (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "Users"(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  source TEXT,
  order_id TEXT,
  price NUMERIC(10,2),
  description TEXT,
  status TEXT,
  comments TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "CTR" (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "Users"(id) ON DELETE CASCADE,
  source TEXT,
  time_spent INTEGER DEFAULT 30,
  description TEXT,
  PTM INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);