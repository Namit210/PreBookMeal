const createBooking = async (bookingData) => {
  try {
    const response = await fetch('http://localhost:5000/api/book-meal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

const confirmBooking = async (bookingId) => {

  console.log("confirmbooking called");
  
}

const deleteBooking = async (bookingId) => {

  console.log("deletebooking called");
  
}

const getAllBookings = async (bookingId) => {

  console.log("getAllBookings called");
  
}
const unconfirmBooking = async (bookingId) => {

  console.log("unconfirmBooking called");
  
}


export { createBooking, confirmBooking, deleteBooking, getAllBookings, unconfirmBooking };