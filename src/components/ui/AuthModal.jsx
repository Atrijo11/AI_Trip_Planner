// // src/components/ui/AuthModal.jsx

// import React from 'react';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase'; // Adjusted path for firebase config
// import googleIcon from '/vite.svg';   // Use your Google/Vite icon

// const AuthModal = ({ isOpen, onClose }) => {
//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       onClose(); // Close the modal after successful login
//     } catch (error) {
//       console.error('Error signing in:', error.message);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg p-8 text-center w-80">
//         <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
//         <p className="text-gray-600 mb-6">Please sign in with Google to continue.</p>
//         <button
//           onClick={handleGoogleSignIn}
//           className="flex items-center gap-3 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
//         >
//           <img src={googleIcon} alt="Google" className="w-5 h-5" />
//           Sign in with Google
//         </button>
//         <button
//           onClick={onClose}
//           className="mt-4 text-gray-500 hover:underline"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;


//authModal.jsx
// src/components/ui/AuthModal.jsx

import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjusted path for firebase config
import googleIcon from '/vite.svg';   // Use your Google/Vite icon

const AuthModal = ({ isOpen, onClose }) => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose(); // Close the modal after successful login
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-80">
        <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-6">Please sign in with Google to continue.</p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-3 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
