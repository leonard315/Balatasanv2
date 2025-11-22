import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

async function recreateAdmin() {
  try {
    console.log('🔧 Recreating Admin User');
    console.log('================================\n');
    
    const email = 'admin@gmail.com';
    const password = 'admin123';
    
    // First, try to sign in to see if user exists
    console.log('Checking if admin user exists...');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Admin user already exists and password is correct!');
      console.log('\n📋 Credentials:');
      console.log('  Email:', email);
      console.log('  Password:', password);
      console.log('\n✨ You can login now!');
      process.exit(0);
    } catch (signInError: any) {
      if (signInError.code === 'auth/user-not-found') {
        console.log('User not found in Authentication. Creating new user...');
      } else if (signInError.code === 'auth/wrong-password' || signInError.code === 'auth/invalid-credential') {
        console.log('⚠️  User exists but password is incorrect.');
        console.log('Please delete the user from Firebase Console first:');
        console.log('1. Go to Firebase Console > Authentication > Users');
        console.log('2. Find admin@gmail.com and delete it');
        console.log('3. Run this script again');
        process.exit(1);
      } else {
        throw signInError;
      }
    }
    
    // Create new admin user
    console.log('Creating admin user in Authentication...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('✅ Admin user created in Authentication:', user.uid);
    
    // Update Firestore profile
    console.log('Updating Firestore profile...');
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      displayName: 'Admin',
      role: 'admin',
      createdAt: new Date(),
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Credentials:');
    console.log('  Email:', email);
    console.log('  Password:', password);
    console.log('  User ID:', user.uid);
    console.log('\n✨ You can now login with these credentials!');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 Admin user already exists in Authentication.');
      console.log('   To fix this:');
      console.log('   1. Go to Firebase Console > Authentication > Users');
      console.log('   2. Find admin@gmail.com');
      console.log('   3. Delete the user');
      console.log('   4. Run this script again');
    }
    
    process.exit(1);
  }
}

recreateAdmin();
