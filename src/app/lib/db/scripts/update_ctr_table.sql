-- Migration to update existing CTR table
-- This script modifies the existing CTR table structure

-- Step 1: Add the new PTM column
ALTER TABLE "CTR" ADD COLUMN IF NOT EXISTS PTM INTEGER;

-- Step 2: Remove the date column (if it exists)
ALTER TABLE "CTR" DROP COLUMN IF EXISTS date;

-- Step 3: Remove the comments column (if it exists)
ALTER TABLE "CTR" DROP COLUMN IF EXISTS comments;

-- Note: created_at column should already exist and will be used for timestamping
