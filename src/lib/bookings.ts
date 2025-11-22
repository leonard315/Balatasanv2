import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Booking {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookingType: 'cottage' | 'tour' | 'watersport';
  itemName: string;
  bookingDate: Date;
  participants?: number;
  totalAmount: number;
  paymentMethod: string;
  paymentProofUrl?: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new booking
export async function createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) {
  const bookingsRef = collection(db, 'bookings');
  const docRef = await addDoc(bookingsRef, {
    ...booking,
    bookingDate: Timestamp.fromDate(booking.bookingDate),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

// Upload payment proof
export async function uploadPaymentProof(bookingId: string, file: File): Promise<string> {
  const storageRef = ref(storage, `payment-proofs/${bookingId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  // Update booking with payment proof URL
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, {
    paymentProofUrl: downloadURL,
    updatedAt: Timestamp.now(),
  });
  
  return downloadURL;
}

// Get all bookings (for admin)
export async function getAllBookings(): Promise<Booking[]> {
  const bookingsRef = collection(db, 'bookings');
  const q = query(bookingsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      bookingDate: data.bookingDate.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Booking;
  });
}

// Get user bookings
export async function getUserBookings(userId: string): Promise<Booking[]> {
  const bookingsRef = collection(db, 'bookings');
  const q = query(
    bookingsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      bookingDate: data.bookingDate.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Booking;
  });
}

// Update booking status (for admin)
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<void> {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, {
    status,
    updatedAt: Timestamp.now(),
  });
}

// Get booking statistics
export async function getBookingStats() {
  const bookingsRef = collection(db, 'bookings');
  const querySnapshot = await getDocs(bookingsRef);
  
  let totalRevenue = 0;
  let pendingCount = 0;
  let approvedCount = 0;
  let rejectedCount = 0;
  
  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.status === 'approved' || data.status === 'completed') {
      totalRevenue += data.totalAmount;
    }
    if (data.status === 'pending') pendingCount++;
    if (data.status === 'approved') approvedCount++;
    if (data.status === 'rejected') rejectedCount++;
  });
  
  return {
    totalBookings: querySnapshot.size,
    totalRevenue,
    pendingCount,
    approvedCount,
    rejectedCount,
  };
}

// Get single booking by ID
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  const bookingRef = doc(db, 'bookings', bookingId);
  const bookingDoc = await getDocs(query(collection(db, 'bookings'), where('__name__', '==', bookingId)));
  
  if (bookingDoc.empty) return null;
  
  const data = bookingDoc.docs[0].data();
  return {
    id: bookingDoc.docs[0].id,
    ...data,
    bookingDate: data.bookingDate.toDate(),
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  } as Booking;
}

// Update booking details
export async function updateBooking(
  bookingId: string,
  updates: Partial<Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// Delete booking
export async function deleteBooking(bookingId: string): Promise<void> {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, {
    status: 'cancelled',
    updatedAt: Timestamp.now(),
  });
}

// Cancel booking (soft delete)
export async function cancelBooking(bookingId: string): Promise<void> {
  await deleteBooking(bookingId);
}
