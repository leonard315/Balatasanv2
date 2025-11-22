import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

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

async function fixAdminProfile() {
  try {
    console.log('Searching for admin@gmail.com user...');
    
    // Find user with admin@gmail.com email
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', 'admin@gmail.com'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.error('❌ No user found with email: admin@gmail.com');
      console.log('\nPlease run the create-admin script first:');
      console.log('  npm run create-admin');
      console.log('  or');
      console.log('  ts-node scripts/create-admin.ts');
      process.exit(1);
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('\n📋 Current user data:');
    console.log('  User ID:', userDoc.id);
    console.log('  Email:', userData.email);
    console.log('  Display Name:', userData.displayName);
    console.log('  Role:', userData.role);
    
    // Update the user profile
    await updateDoc(doc(db, 'users', userDoc.id), {
      displayName: 'Admin',
      role: 'admin',
    });
    
    console.log('\n✅ Admin profile updated successfully!');
    console.log('Updated fields:');
    console.log('  - displayName: Admin');
    console.log('  - role: admin');
    console.log('\n🔄 Please logout and login again to see the changes.');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error updating admin profile:', error.message);
    process.exit(1);
  }
}

fixAdminProfile();
