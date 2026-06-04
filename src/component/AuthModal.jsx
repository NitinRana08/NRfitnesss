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

        if (
          !userCredential.user.emailVerified
        ) {
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
      <div className="bg-zinc-900 p-8 rounded-2xl w-[90%] max-w-md border border-zinc-700">

        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-zinc-800"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-zinc-800"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button className="bg-red-500 py-3 rounded-lg font-bold">
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-3 rounded-lg bg-white text-black font-bold"
        >
          Continue with Google
        </button>

        <p className="text-center mt-4 text-gray-400">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="w-full text-red-500 mt-2"
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