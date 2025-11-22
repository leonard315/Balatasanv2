import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

// Sign up new user
export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user profile in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName,
    role: 'user',
    createdAt: new Date(),
  });

  return user;
}

// Sign in existing user
export async function signIn(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Sign out
export async function logout(): Promise<void> {
  await signOut(auth);
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Listen to auth state changes
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      uid: data.uid,
      email: data.email,
      displayName: data.displayName,
      role: data.role,
      createdAt: data.createdAt.toDate(),
    };
  }

  return null;
}

// Check if user is admin
export async function isAdmin(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  return profile?.role === 'admin';
}
