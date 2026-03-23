/*
  # Create estimations table

  1. New Tables
    - `estimations`
      - `id` (uuid, primary key) - Unique identifier for each estimation
      - `service_type` (text) - Type of service (Cave, Appartement, Maison, Grenier, Local commercial)
      - `service_details` (jsonb) - Conditional answers based on service type
      - `timeline` (text) - Desired timeline (Urgent, Cette semaine, Flexible)
      - `postal_code` (text) - Postal code
      - `city` (text) - City name
      - `name` (text) - Client name
      - `phone` (text) - Client phone number
      - `email` (text) - Client email
      - `estimated_price` (text) - Estimated price range
      - `status` (text) - Status of the estimation (new, contacted, completed)
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update
  
  2. Security
    - Enable RLS on `estimations` table
    - Add policy for anonymous users to insert their own estimations
    - Add policy for authenticated admin users to view all estimations
*/

CREATE TABLE IF NOT EXISTS estimations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text NOT NULL,
  service_details jsonb DEFAULT '{}'::jsonb,
  timeline text,
  postal_code text,
  city text,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  estimated_price text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE estimations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert estimations"
  ON estimations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all estimations"
  ON estimations
  FOR SELECT
  TO authenticated
  USING (true);