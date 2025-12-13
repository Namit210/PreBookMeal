-- Supabase Database Schema for Meal Booking System
-- Run this SQL in your Supabase SQL Editor

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  meal_type VARCHAR(50) NOT NULL CHECK (meal_type IN ('Breakfast', 'Lunch', 'Dinner')),
  persons INTEGER NOT NULL CHECK (persons > 0),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_status VARCHAR(50) DEFAULT 'not_paid' CHECK (payment_status IN ('not_paid', 'pending_verification', 'verified', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings(booking_id);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(phone);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your security needs)
-- Policy for SELECT: Allow anyone to read bookings
CREATE POLICY "Allow public read access" ON bookings
  FOR SELECT
  USING (true);

-- Policy for INSERT: Allow anyone to create bookings
CREATE POLICY "Allow public insert access" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Policy for UPDATE: Allow anyone to update bookings (you may want to restrict this)
CREATE POLICY "Allow public update access" ON bookings
  FOR UPDATE
  USING (true);

-- Policy for DELETE: Allow anyone to delete bookings (you may want to restrict this)
CREATE POLICY "Allow public delete access" ON bookings
  FOR DELETE
  USING (true);

-- Optional: Create a view for easier querying
CREATE OR REPLACE VIEW bookings_summary AS
SELECT 
  booking_id,
  name,
  phone,
  date,
  meal_type,
  persons,
  total_amount,
  status,
  payment_status,
  created_at
FROM bookings
ORDER BY created_at DESC;

-- Grant necessary permissions
GRANT ALL ON bookings TO anon, authenticated;
GRANT ALL ON bookings_summary TO anon, authenticated;

-- Insert some sample data (optional - remove if not needed)
-- INSERT INTO bookings (booking_id, name, phone, date, meal_type, persons, total_amount, status)
-- VALUES 
--   ('BOOK-20251213-00001', 'Test User', '9999999999', '2025-12-15', 'Lunch', 2, 180.00, 'pending');

-- Display success message
DO $$
BEGIN
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Copy your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY';
  RAISE NOTICE '2. Add them to your .env file';
  RAISE NOTICE '3. Start your React app and test the booking system';
END $$;
