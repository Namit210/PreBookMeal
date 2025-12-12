// API base URL - configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Create a new booking with payment screenshot
 * @param {Object} bookingData - Booking form data
 * @param {File} screenshot - Payment screenshot file
 * @returns {Promise} API response
 */
export const createBooking = async (bookingData, screenshot) => {
  try {
    const formData = new FormData();
    
    // Append all booking data
    formData.append('name', bookingData.name);
    formData.append('phone', bookingData.phone);
    formData.append('date', bookingData.date);
    formData.append('mealType', bookingData.mealType);
    formData.append('persons', bookingData.persons);
    formData.append('totalAmount', bookingData.totalAmount);
    formData.append('bookingTime', bookingData.bookingTime || new Date().toISOString());
    
    // Append screenshot file
    if (screenshot) {
      formData.append('screenshot', screenshot);
    }
    
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create booking');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Get all bookings with optional filters
 * @param {Object} filters - Optional filters (phone, date, status)
 * @returns {Promise} List of bookings
 */
export const getAllBookings = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.phone) queryParams.append('phone', filters.phone);
    if (filters.date) queryParams.append('date', filters.date);
    if (filters.status) queryParams.append('status', filters.status);
    
    const url = `${API_BASE_URL}/api/bookings${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch bookings');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Get a specific booking by ID
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Booking details
 */
export const getBookingById = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch booking');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

/**
 * Update booking status (confirm/unconfirm)
 * @param {string} bookingId - Booking ID
 * @param {string} status - New status ('confirmed' or 'pending')
 * @returns {Promise} Updated booking
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update booking status');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

/**
 * Confirm a booking using the dedicated confirm endpoint
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Updated booking
 */
export const confirmBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/confirm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to confirm booking');
    }
    
    return data;
  } catch (error) {
    console.error('Error confirming booking:', error);
    throw error;
  }
};

/**
 * Unconfirm a booking (set back to pending) using the dedicated pending endpoint
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Updated booking
 */
export const unconfirmBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/pending`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to unconfirm booking');
    }
    
    return data;
  } catch (error) {
    console.error('Error unconfirming booking:', error);
    throw error;
  }
};

/**
 * Delete a booking
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Deletion confirmation
 */
export const deleteBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete booking');
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
