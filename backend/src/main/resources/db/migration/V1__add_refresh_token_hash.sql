-- Migration: add token_id and token_hash to refresh_tokens
-- Note: This script is written for MySQL/MariaDB.
-- It adds columns to store JWT id (jti) and SHA-256 hash of the refresh token
-- so that raw refresh tokens are not required to be stored in the database.

ALTER TABLE refresh_tokens
  ADD COLUMN token_id VARCHAR(255) NULL,
  ADD COLUMN token_hash VARCHAR(64) NULL;

-- If the schema still contains the old plain-text 'token' column, compute SHA-256 of it
-- and populate token_hash for existing rows. SHA2(x,256) returns a hex string of length 64.
-- If your DB user does not have permission for updates, run this as a DBA.

UPDATE refresh_tokens
SET token_hash = SHA2(token, 256)
WHERE token IS NOT NULL AND token_hash IS NULL;

-- Create a unique index on token_hash to speed up lookups and prevent duplicates.
-- Be careful: if token_hash values are not unique in existing data, this will fail.
CREATE UNIQUE INDEX idx_refresh_tokens_token_hash ON refresh_tokens (token_hash);

-- OPTIONAL: after thorough verification, you may drop the old column that stored raw tokens:
-- ALTER TABLE refresh_tokens DROP COLUMN token;

-- IMPORTANT NOTES:
-- 1) This migration will try to compute hashes for existing 'token' column values if present.
--    If the application previously did not store plain tokens or if you have a different DB, adjust accordingly.
-- 2) token_id (jti) cannot be reliably populated here because it requires parsing JWTs; we keep it NULL for existing rows.
--    New logins will populate token_id automatically.
-- 3) After running this migration, consider forcing a global logout (clearing refresh tokens) to be safer
--    or notify users to re-login so that refresh token values in DB are consistent with the new scheme.
-- 4) If you use a DB other than MySQL, replace SHA2(...) with the appropriate function.
