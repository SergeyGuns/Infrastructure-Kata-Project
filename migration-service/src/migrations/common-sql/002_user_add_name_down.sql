-- To revert this migration, you would typically drop the column
ALTER TABLE users DROP COLUMN IF EXISTS name;