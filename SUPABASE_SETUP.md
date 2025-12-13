# Supabase Migration Guide

## ✅ Migration Complete!

Your application has been successfully migrated from Flask backend to Supabase. You no longer need to run the Flask server!

---

## 🚀 Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Fill in:
   - **Project Name**: `meal-booking-app` (or your preferred name)
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with the free tier
6. Click "Create new project" and wait for setup to complete (~2 minutes)

---

### 2. Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" or press `Ctrl/Cmd + Enter`
6. You should see success messages confirming tables and policies were created

---

### 3. Get Your API Credentials

1. In Supabase dashboard, go to **Settings** (gear icon in left sidebar)
2. Click **API** section
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

### 4. Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Replace the values with your actual credentials from Step 3

**⚠️ Important**: Never commit `.env` file to git. It's already in `.gitignore`.

---

### 5. Set Up Storage Bucket (for payment screenshots)

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. The bucket `booking-files` should already be created by the SQL script
3. If not, click "Create bucket":
   - **Name**: `booking-files`
   - **Public**: ✅ Yes (checked)
   - Click "Create bucket"

---

### 6. Test Your Application

1. Start your React development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173` (or the URL shown in terminal)

3. Test the following features:
   - ✅ Create a new booking
   - ✅ View bookings in Admin Panel
   - ✅ Confirm/Unconfirm bookings
   - ✅ Filter bookings by status
   - ✅ Upload payment screenshots

---

## 📊 Database Structure

### `bookings` Table Columns:
- `id` - Auto-incrementing primary key
- `booking_id` - Unique booking identifier (BOOK-YYYYMMDD-XXXXX)
- `name` - Customer name
- `phone` - Customer phone number
- `date` - Meal booking date
- `meal_type` - Breakfast, Lunch, or Dinner
- `persons` - Number of people
- `total_amount` - Total payment amount
- `status` - pending, confirmed, or cancelled
- `payment_status` - not_paid, pending_verification, verified, or failed
- `screenshot_url` - URL to payment screenshot (optional)
- `created_at` - Timestamp when booking was created
- `updated_at` - Timestamp when booking was last updated

---

## 🔒 Security Notes

### Row Level Security (RLS)
The database has RLS enabled with public access policies. For production, consider:

1. **Restrict Admin Operations**: Update policies to require authentication for confirm/delete operations
2. **Add Authentication**: Use Supabase Auth to protect admin routes
3. **Rate Limiting**: Implement on Supabase or use Edge Functions

### Example: Restrict Updates to Authenticated Users Only
```sql
-- Drop public update policy
DROP POLICY "Allow public update access" ON bookings;

-- Create authenticated-only update policy
CREATE POLICY "Allow authenticated update access" ON bookings
  FOR UPDATE
  USING (auth.role() = 'authenticated');
```

---

## 🎯 What Changed?

### ✅ Removed:
- Flask backend server
- Python dependencies
- Google Sheets integration
- `VITE_API_BASE_URL` environment variable

### ✅ Added:
- `@supabase/supabase-js` package
- `src/supabaseClient.js` - Supabase client configuration
- `supabase-schema.sql` - Database schema
- Direct database queries from frontend

### ✅ Updated:
- `src/api/bookingService.js` - Now uses Supabase instead of fetch API
- `.env.example` - Updated with Supabase credentials

---

## 🔧 API Methods Available

All methods in `bookingService.js` work the same way from the frontend perspective:

```javascript
import { 
  createBooking, 
  getAllBookings, 
  getBookingById,
  confirmBooking,
  unconfirmBooking,
  deleteBooking 
} from './api/bookingService';

// Create booking
await createBooking(bookingData, screenshotFile);

// Get all bookings
await getAllBookings({ status: 'pending' });

// Confirm single or multiple bookings
await confirmBooking('BOOK-20251213-00001');
await confirmBooking(['BOOK-001', 'BOOK-002']);

// Unconfirm bookings
await unconfirmBooking(['BOOK-001']);

// Delete booking
await deleteBooking('BOOK-20251213-00001');
```

---

## 📈 Supabase Dashboard Features

Explore your Supabase dashboard for powerful features:

1. **Table Editor**: View and edit data directly
2. **SQL Editor**: Run custom queries
3. **Authentication**: Add user login (optional)
4. **Storage**: Manage uploaded files
5. **API Docs**: Auto-generated API documentation
6. **Logs**: Monitor database queries and errors
7. **Database**: View performance metrics

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables" Error
- Check `.env` file exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after adding env variables

### Bookings Not Appearing
- Check Supabase SQL Editor for errors
- Verify table was created: `SELECT * FROM bookings;`
- Check browser console for errors

### Cannot Upload Screenshots
- Verify `booking-files` bucket exists in Storage
- Check bucket is set to public
- Verify storage policies are applied

### CORS Errors
- Supabase handles CORS automatically
- If issues persist, check Supabase project settings

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## 🎉 You're All Set!

Your meal booking application is now powered by Supabase. Enjoy the benefits of:
- ✅ No backend server to manage
- ✅ Real-time capabilities
- ✅ Automatic API generation
- ✅ Built-in authentication (when needed)
- ✅ Scalable infrastructure
- ✅ Free tier with generous limits

Start booking meals! 🍽️
