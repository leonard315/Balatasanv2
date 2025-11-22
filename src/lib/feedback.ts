import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Feedback {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  category: 'service' | 'facilities' | 'food' | 'activities' | 'overall';
  comment: string;
  bookingId?: string;
  createdAt: Date;
}

export async function createFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>) {
  const feedbackRef = collection(db, 'feedback');
  const docRef = await addDoc(feedbackRef, {
    ...feedback,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getAllFeedback(): Promise<Feedback[]> {
  const feedbackRef = collection(db, 'feedback');
  const q = query(feedbackRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Feedback;
  });
}

export async function getUserFeedback(userId: string): Promise<Feedback[]> {
  const feedbackRef = collection(db, 'feedback');
  const q = query(
    feedbackRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Feedback;
  });
}

export async function getFeedbackStats() {
  const feedbackRef = collection(db, 'feedback');
  const querySnapshot = await getDocs(feedbackRef);
  
  let totalRating = 0;
  let categoryRatings: Record<string, { total: number; count: number }> = {
    service: { total: 0, count: 0 },
    facilities: { total: 0, count: 0 },
    food: { total: 0, count: 0 },
    activities: { total: 0, count: 0 },
    overall: { total: 0, count: 0 },
  };
  
  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    totalRating += data.rating;
    categoryRatings[data.category].total += data.rating;
    categoryRatings[data.category].count += 1;
  });
  
  const averageRating = querySnapshot.size > 0 ? totalRating / querySnapshot.size : 0;
  
  return {
    totalFeedback: querySnapshot.size,
    averageRating: averageRating.toFixed(1),
    categoryAverages: Object.entries(categoryRatings).reduce((acc, [key, value]) => {
      acc[key] = value.count > 0 ? (value.total / value.count).toFixed(1) : '0';
      return acc;
    }, {} as Record<string, string>),
  };
}
