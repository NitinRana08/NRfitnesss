import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../firebase";

function AuthModal({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        if (!userCredential.user.emailVerified) {
          alert(
            "Please verify your email before logging in."
          );
          return;
        }

        onLogin();
      } else {
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        await sendEmailVerification(
          userCredential.user
        );

        alert(
          "Verification email sent. Please check your inbox."
        );

        await auth.signOut();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(
        auth,
        googleProvider
      );

      onLogin();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[999]">
      <div className="bg-zinc-900 p-8 rounded-2xl w-[90%] max-w-md border border-zinc-700 shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-zinc-800 text-white caret-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:border-red-500"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-zinc-800 text-white caret-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:border-red-500"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 py-3 rounded-lg font-bold text-white transition"
          >
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="px-3 text-gray-400 text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>

        <p className="text-center mt-5 text-gray-400">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="w-full text-red-500 mt-2 font-medium hover:text-red-400 transition"
        >
          {isLogin
            ? "Sign Up"
            : "Login"}
        </button>

      </div>
    </div>
  );
}

export default AuthModal;