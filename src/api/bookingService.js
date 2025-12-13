import { supabase } from '../supabaseClient';

/**
 * Generate a unique booking ID
 * @returns {string} Booking ID in format BOOK-YYYYMMDD-XXXXX
 */
const generateBookingId = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `BOOK-${dateStr}-${random}`;
};

/**
 * Create a new booking
 * @param {Object} bookingData - Booking form data
 * @returns {Promise} Booking data
 */
export const createBooking = async (bookingData) => {
  try {
    const bookingId = generateBookingId();

    // Insert booking into database
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          booking_id: bookingId,
          name: bookingData.name,
          phone: bookingData.phone,
          date: bookingData.date,
          meal_type: bookingData.mealType,
          persons: bookingData.persons,
          total_amount: bookingData.totalAmount,
          status: 'pending',
          payment_status: 'not_paid',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to create booking');
    }

    return {
      success: true,
      message: 'Booking created successfully',
      booking: data
    };
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
    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters if provided
    if (filters.phone) {
      query = query.eq('phone', filters.phone);
    }
    if (filters.date) {
      query = query.eq('date', filters.date);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message || 'Failed to fetch bookings');
    }

    return {
      success: true,
      bookings: data
    };
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
/**
 * Get a specific booking by ID
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Booking details
 */
export const getBookingById = async (bookingId) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('booking_id', bookingId)
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to fetch booking');
    }

    return {
      success: true,
      booking: data
    };
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
    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('booking_id', bookingId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to update booking status');
    }

    return {
      success: true,
      message: 'Booking status updated successfully',
      booking: data
    };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

/**
 * Confirm a booking or multiple bookings
 * @param {string|string[]} bookingIds - Single booking ID or array of booking IDs
 * @returns {Promise} Updated bookings
 */
export const confirmBooking = async (bookingIds) => {
  try {
    // Convert single ID to array
    const ids = Array.isArray(bookingIds) ? bookingIds : [bookingIds];

    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed', updated_at: new Date().toISOString() })
      .in('booking_id', ids)
      .select();

    if (error) {
      throw new Error(error.message || 'Failed to confirm booking(s)');
    }

    return {
      success: true,
      message: `Successfully confirmed ${data.length} booking(s)`,
      bookings: data
    };
  } catch (error) {
    console.error('Error confirming booking:', error);
    throw error;
  }
};

/**
 * Unconfirm a booking or multiple bookings (set back to pending)
 * @param {string|string[]} bookingIds - Single booking ID or array of booking IDs
 * @returns {Promise} Updated bookings
 */
export const unconfirmBooking = async (bookingIds) => {
  try {
    // Convert single ID to array
    const ids = Array.isArray(bookingIds) ? bookingIds : [bookingIds];

    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'pending', updated_at: new Date().toISOString() })
      .in('booking_id', ids)
      .select();

    if (error) {
      throw new Error(error.message || 'Failed to unconfirm booking(s)');
    }

    return {
      success: true,
      message: `Successfully unconfirmed ${data.length} booking(s)`,
      bookings: data
    };
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
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('booking_id', bookingId);

    if (error) {
      throw new Error(error.message || 'Failed to delete booking');
    }

    return {
      success: true,
      message: 'Booking deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
