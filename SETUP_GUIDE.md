# HariToshanam Food Booking System

## Setup Instructions

### Backend Setup (Flask)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Flask server:**
   ```bash
   python app.py
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup (React + Vite)

1. **Open a new terminal and navigate to project root:**
   ```bash
   cd /home/namit/Desktop/newProject/HariToshanam
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Testing the Application

1. Make sure both backend (port 5000) and frontend (port 5173) are running
2. Open your browser and go to `http://localhost:5173`
3. Fill in the booking form:
   - Enter your name and 10-digit phone number
   - Select a date and meal type
   - Enter number of persons
   - Click "Proceed to Payment"
   - Upload a payment screenshot
   - Click "Submit Booking"

## API Endpoints

### POST /api/bookings
Create a new booking with payment screenshot

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - name: string
  - phone: string (10 digits)
  - date: string (YYYY-MM-DD)
  - mealType: string (breakfast/lunch/dinner)
  - persons: integer (1-20)
  - totalAmount: number
  - bookingTime: string (ISO format)
  - screenshot: file (image, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "booking_id": "BKG20251207123456",
    "name": "John Doe",
    "phone": "1234567890",
    "date": "2025-12-08",
    "meal_type": "lunch",
    "persons": 2,
    "total_amount": "180",
    "status": "pending"
  }
}
```

### GET /api/bookings
Get all bookings with optional filters

**Query Parameters:**
- phone: Filter by phone number
- date: Filter by date
- status: Filter by status

### GET /api/bookings/:booking_id
Get a specific booking by ID

## Uploaded Files

Payment screenshots are stored in: `backend/uploads/payment_screenshots/`

Filename format: `{phone}_{timestamp}_{original_filename}`

## Features

- ✅ User details validation
- ✅ Date selection with calendar
- ✅ Meal type selection (Breakfast/Lunch/Dinner)
- ✅ Booking deadline validation
- ✅ Dynamic price calculation
- ✅ Payment screenshot upload (max 5MB)
- ✅ File type validation (images only)
- ✅ Real-time form validation
- ✅ Success confirmation with booking ID
- ✅ Responsive design

## Next Steps

To add database functionality:

1. Install MongoDB or SQLite
2. Update `app.py` to save bookings to database
3. Implement GET endpoints to retrieve bookings
4. Add booking status management
5. Create admin panel for managing bookings
