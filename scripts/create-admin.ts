import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Create admin user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@gmail.com',
      'admin123'
    );
    
    const user = userCredential.user;
    console.log('Admin user created in Auth:', user.uid);
    
    // Create admin profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: 'admin@gmail.com',
      displayName: 'Admin',
      role: 'admin',
      createdAt: new Date(),
    });
    
    console.log('✅ Admin user created successfully!');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();
