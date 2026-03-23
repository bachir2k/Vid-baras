/*
  # Create realizations table

  1. New Tables
    - `realizations`
      - `id` (uuid, primary key) - Unique identifier for each realization
      - `title` (text) - Title of the realization project
      - `description` (text) - Detailed description of the work done
      - `location` (text) - Location where the work was performed
      - `date` (date) - Date when the work was completed
      - `media_urls` (jsonb) - Array of media URLs (photos and videos)
      - `media_type` (text) - Type of media (photo or video)
      - `featured` (boolean) - Whether this realization should be featured
      - `created_at` (timestamptz) - Timestamp of record creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `realizations` table
    - Add policy for public read access (anyone can view realizations)
    - Add policy for authenticated admin users to insert/update/delete
*/

CREATE TABLE IF NOT EXISTS realizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  media_urls jsonb DEFAULT '[]'::jsonb,
  media_type text DEFAULT 'photo' CHECK (media_type IN ('photo', 'video', 'mixed')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE realizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view realizations"
  ON realizations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert realizations"
  ON realizations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update realizations"
  ON realizations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete realizations"
  ON realizations
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_realizations_date ON realizations(date DESC);
CREATE INDEX IF NOT EXISTS idx_realizations_featured ON realizations(featured) WHERE featured = true;
