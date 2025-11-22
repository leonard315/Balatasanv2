import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAsp4zi8vbUHZBa4g-BXe49VJVrSyHhTE",
  authDomain: "uartesp32project-88cf6.firebaseapp.com",
  projectId: "uartesp32project-88cf6",
  storageBucket: "uartesp32project-88cf6.firebasestorage.app",
  messagingSenderId: "652955844422",
  appId: "1:652955844422:web:892600c188994b0e406f47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateAdminProfile() {
  try {
    console.log('Searching for admin user...');
    
    // You need to replace 'USER_ID_HERE' with the actual user ID from Firebase Auth
    // You can find this in Firebase Console > Authentication > Users
    const userId = process.argv[2];
    
    if (!userId) {
      console.error('❌ Please provide the user ID as an argument');
      console.log('Usage: ts-node scripts/update-admin.ts <USER_ID>');
      console.log('\nTo find the user ID:');
      console.log('1. Go to Firebase Console');
      console.log('2. Navigate to Authentication > Users');
      console.log('3. Find admin@gmail.com and copy the User UID');
      process.exit(1);
    }
    
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.error('❌ User not found with ID:', userId);
      process.exit(1);
    }
    
    console.log('Current user data:', userDoc.data());
    
    // Update the user profile
    await updateDoc(userRef, {
      displayName: 'Admin',
      role: 'admin',
    });
    
    console.log('✅ Admin profile updated successfully!');
    console.log('Updated fields:');
    console.log('  - displayName: Admin');
    console.log('  - role: admin');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error updating admin profile:', error.message);
    process.exit(1);
  }
}

updateAdminProfile();
