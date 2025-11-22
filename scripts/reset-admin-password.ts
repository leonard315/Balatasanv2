import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

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

async function resetAdminPassword() {
  try {
    console.log('🔐 Admin Password Reset Tool');
    console.log('================================\n');
    
    const email = 'admin@gmail.com';
    const currentPassword = process.argv[2];
    const newPassword = process.argv[3] || 'admin123';
    
    if (!currentPassword) {
      console.error('❌ Please provide the current password');
      console.log('\nUsage:');
      console.log('  npm run reset-admin-password <current-password> [new-password]');
      console.log('\nExample:');
      console.log('  npm run reset-admin-password oldpass123 admin123');
      process.exit(1);
    }
    
    console.log('Attempting to sign in with current password...');
    const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
    console.log('✅ Successfully signed in!');
    
    console.log('\nUpdating password...');
    await updatePassword(userCredential.user, newPassword);
    
    console.log('✅ Password updated successfully!');
    console.log('\n📋 New credentials:');
    console.log('  Email:', email);
    console.log('  Password:', newPassword);
    console.log('\n🔄 You can now login with these credentials.');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      console.log('\n💡 The current password is incorrect.');
      console.log('   If you forgot the password, you need to:');
      console.log('   1. Go to Firebase Console > Authentication > Users');
      console.log('   2. Find admin@gmail.com');
      console.log('   3. Click the three dots menu > Reset password');
      console.log('   4. Or delete the user and run: npm run create-admin');
    }
    
    process.exit(1);
  }
}

resetAdminPassword();
