'use server';

import { tours, watersports } from '@/lib/data';
import { z } from 'zod';

type ItineraryState = {
  message: string;
  itinerary?: string | null;
  error?: string | null;
};

export async function generateItineraryAction(
  prevState: ItineraryState,
  formData: FormData
): Promise<ItineraryState> {
  const selectedTours = formData.getAll('tourPackages') as string[];
  const selectedWatersports = formData.getAll(
    'watersportsActivities'
  ) as string[];

  if (selectedTours.length === 0 && selectedWatersports.length === 0) {
    return {
      message: 'error',
      error: 'Please select at least one tour or water activity.',
    };
  }

  const tourDetails = tours
    .filter((t) => selectedTours.includes(t.name))
    .map((t) => ({ name: t.name, duration: t.duration, price: t.price }));

  const watersportDetails = watersports
    .filter((w) => selectedWatersports.includes(w.name))
    .map((w) => ({ name: w.name, duration: w.duration, price: w.basePrice }));

  try {
    // Generate simple itinerary without AI
    let itinerary = '🌴 YOUR PERSONALIZED BALATASAN BEACH ITINERARY 🌴\n\n';
    let currentTime = 8; // Start at 8:00 AM
    let totalCost = 0;

    if (tourDetails.length > 0) {
      itinerary += '📍 TOUR PACKAGES:\n';
      tourDetails.forEach((tour) => {
        const hours = parseInt(tour.duration);
        const endTime = currentTime + hours;
        itinerary += `\n⏰ ${formatTime(currentTime)} - ${formatTime(endTime)}\n`;
        itinerary += `   ${tour.name}\n`;
        itinerary += `   Duration: ${tour.duration}\n`;
        itinerary += `   Price: ₱${tour.price}\n`;
        currentTime = endTime + 0.5; // Add 30 min travel time
        totalCost += tour.price;
      });
      itinerary += '\n';
    }

    if (watersportDetails.length > 0) {
      itinerary += '🌊 WATER ACTIVITIES:\n';
      watersportDetails.forEach((activity) => {
        const minutes = parseInt(activity.duration);
        const hours = minutes / 60;
        const endTime = currentTime + hours;
        itinerary += `\n⏰ ${formatTime(currentTime)} - ${formatTime(endTime)}\n`;
        itinerary += `   ${activity.name}\n`;
        itinerary += `   Duration: ${activity.duration}\n`;
        itinerary += `   Price: ₱${activity.price}\n`;
        currentTime = endTime + 0.25; // Add 15 min break
        totalCost += activity.price;
      });
      itinerary += '\n';
    }

    itinerary += `\n💰 TOTAL ESTIMATED COST: ₱${totalCost.toLocaleString()}\n`;
    itinerary += `\n⏱️ Estimated End Time: ${formatTime(currentTime)}\n`;
    itinerary += '\n📝 TIPS:\n';
    itinerary += '• Arrive 15 minutes early for each activity\n';
    itinerary += '• Bring sunscreen and stay hydrated\n';
    itinerary += '• Don\'t forget your camera for amazing photos!\n';
    itinerary += '• Life jackets are provided for all water activities\n';

    return {
      message: 'success',
      itinerary: itinerary,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'error',
      error:
        'Failed to generate itinerary. Please try again.',
    };
  }
}

function formatTime(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
}

const bookingSchema = z.object({
  cottageType: z.string(),
  bookingDate: z.date(),
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  paymentMethod: z.string(),
});

type BookingState = {
  message: 'success' | 'error' | 'idle';
  error?: string;
};

export async function createBookingAction(
  prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  const data = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse({
    ...data,
    bookingDate: new Date(data.bookingDate as string),
  });

  if (!parsed.success) {
    return {
      message: 'error',
      error: parsed.error.errors.map((e) => e.message).join(', '),
    };
  }

  // Here you would typically save the booking to a database.
  console.log('New Floating Cottage Booking:', parsed.data);

  return {
    message: 'success',
  };
}


const waterActivityBookingSchema = z.object({
  activityType: z.string({ required_error: 'Please select an activity.'}),
  activityDate: z.date({ required_error: 'An activity date is required.' }),
  participants: z.coerce.number().min(1, 'Please enter number of participants.'),
  specialRequests: z.string().optional(),
  paymentMethod: z.string({ required_error: 'Please select a payment method.' }),
});

export async function createWaterActivityBookingAction(
  prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  const data = Object.fromEntries(formData.entries());
  const parsed = waterActivityBookingSchema.safeParse({
    ...data,
    activityDate: new Date(data.activityDate as string),
  });

  if (!parsed.success) {
    return {
      message: 'error',
      error: parsed.error.errors.map((e) => e.message).join(', '),
    };
  }

  // Here you would typically save the booking to a database.
  console.log('New Water Activity Booking:', parsed.data);

  return {
    message: 'success',
  };
}
