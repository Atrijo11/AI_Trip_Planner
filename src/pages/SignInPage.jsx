// import React, { useState } from 'react';
// import { auth } from '@/firebase';
// import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// function SignInPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [error, setError] = useState('');

//   // Handle Google Sign-In
//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       navigate('/create-trip'); // Redirect after successful login
//     } catch (error) {
//       console.error('Error signing in with Google:', error);
//       setError('Failed to sign in with Google');
//     }
//   };

//   // Handle Email Sign-In or Sign-Up
//   const handleEmailAuth = async (e) => {
//     e.preventDefault();
//     try {
//       if (isSignUp) {
//         // Sign up user
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         // Sign in user
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       navigate('/create-trip');
//     } catch (error) {
//       console.error('Error with email authentication:', error);
//       setError('Authentication failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       {/* Logo */}
//       <img src="/logo.svg" alt="Logo" className="w-32 h-32 mb-6" />

//       <h1 className="text-3xl font-bold mb-4">
//         {isSignUp ? 'Create an Account' : 'Sign In to Your Account'}
//       </h1>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* Email and Password Form */}
//       <form onSubmit={handleEmailAuth} className="w-full max-w-sm">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-3 px-4 py-2 rounded-lg text-black"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-3 px-4 py-2 rounded-lg text-black"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
//         >
//           {isSignUp ? 'Sign Up' : 'Sign In'}
//         </button>
//       </form>

//       {/* Toggle between Sign In and Sign Up */}
//       <p className="mt-4 text-gray-400">
//         {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//         <button
//           onClick={() => setIsSignUp(!isSignUp)}
//           className="underline hover:text-blue-400"
//         >
//           {isSignUp ? 'Sign In' : 'Sign Up'}
//         </button>
//       </p>

//       {/* Divider */}
//       <div className="my-4 w-full max-w-sm flex items-center justify-center">
//         <div className="w-full h-px bg-gray-600"></div>
//         <span className="px-2 text-gray-400">OR</span>
//         <div className="w-full h-px bg-gray-600"></div>
//       </div>

//       {/* Google Sign-In */}
//       <button
//         onClick={handleGoogleSignIn}
//         className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
//       >
//         Sign In with Google
//       </button>

//       {/* Terms of Service */}
//       <p className="text-xs text-gray-500 mt-4 text-center max-w-xs">
//         By clicking continue, you agree to our{' '}
//         <a href="#" className="underline">
//           Terms of Service
//         </a>{' '}
//         and{' '}
//         <a href="#" className="underline">
//           Privacy Policy
//         </a>.
//       </p>
//     </div>
//   );
// }

// export default SignInPage;


//SignInPage
/*import React, { useState } from 'react';
import { auth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/create-trip'); // Redirect after successful login
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google');
    }
  };

  // Handle Email Sign-In or Sign-Up
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign up user
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in user
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/create-trip');
    } catch (error) {
      console.error('Error with email authentication:', error);
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      
      <img src="/logo.svg" alt="Logo" className="w-32 h-32 mb-6" />

      <h1 className="text-3xl font-bold mb-4">
        {isSignUp ? 'Create an Account' : 'Sign In to Your Account'}
      </h1>

    
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleEmailAuth} className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>


      <p className="mt-4 text-gray-400">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="underline hover:text-blue-400"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

      <div className="my-4 w-full max-w-sm flex items-center justify-center">
        <div className="w-full h-px bg-gray-600"></div>
        <span className="px-2 text-gray-400">OR</span>
        <div className="w-full h-px bg-gray-600"></div>
      </div>

      
      <button
        onClick={handleGoogleSignIn}
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Sign In with Google
      </button>

    
      <p className="text-xs text-gray-500 mt-4 text-center max-w-xs">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline">
          Privacy Policy
        </a>.
      </p>
    </div>
  );
}

export default SignInPage;*/

import React, { useContext, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to the home page
    if (user) {
      navigate("/create-trip");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      navigate("/create-trip"); // Redirect to trips after login
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <button
        onClick={handleGoogleSignIn}
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Sign In with Google
      </button>
    </div>
  );
}

export default SignInPage;

