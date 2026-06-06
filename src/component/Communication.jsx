import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

function Communication({ goBack }) {
  const user = auth.currentUser;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [planData, setPlanData] = useState(null);
  const [unlocked, setUnlocked] = useState(false);

  // 🔥 SAFE CHECK (IMPORTANT)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading user...
      </div>
    );
  }

  const chatRef = doc(db, "chats", user.email);

  // 🔥 Load chat + unlock status + plan data
  useEffect(() => {
    if (!user) return;

    // Chat messages listener
    const q = query(
      collection(db, "chats", user.email, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    // Load unlock + plan info
    const fetchData = async () => {
      try {
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          setUnlocked(chatSnap.data().communicationUnlocked || false);
        }

        const planSnap = await getDoc(
          doc(db, "planRequests", user.email)
        );

        if (planSnap.exists()) {
          setPlanData(planSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => unsub();
  }, [user]);

  // 📤 Send Message
  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(
      collection(db, "chats", user.email, "messages"),
      {
        text,
        sender: "user",
        createdAt: serverTimestamp(),
      }
    );

    setText("");
  };

  // 🔒 LOCK SCREEN
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black p-4">

        {/* BACK BUTTON */}
        <button
          onClick={goBack}
          className="absolute top-4 left-4 bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition"
        >
          ← Back
        </button>

        <div className="text-center p-6 border border-zinc-800 rounded-2xl bg-zinc-900">
          <h2 className="text-2xl font-bold mb-3">
            Communication Locked 🔒
          </h2>
          <p className="text-zinc-400">
            Complete your fitness plan setup to unlock chat with your coach.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={goBack}
        className="absolute top-4 left-4 bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition"
      >
        ← Back
      </button>

      {/* LEFT SIDE - CHAT */}
      <div className="w-2/3 border-r border-zinc-800 flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 mt-12">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-md ${
                msg.sender === "user"
                  ? "bg-red-600 ml-auto text-white"
                  : "bg-zinc-800 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - USER INFO */}
      <div className="w-1/3 p-4 space-y-4 overflow-y-auto mt-12">

        <h2 className="text-xl font-bold">Your Fitness Profile</h2>

        {planData ? (
          <div className="space-y-2 text-sm text-zinc-300">

            <p><b>Name:</b> {planData.name}</p>
            <p><b>Age:</b> {planData.age}</p>
            <p><b>Gender:</b> {planData.gender}</p>
            <p><b>Height:</b> {planData.height}</p>
            <p><b>Weight:</b> {planData.weight}</p>
            <p><b>Goal:</b> {planData.goal}</p>
            <p><b>Experience:</b> {planData.experience}</p>
            <p><b>Workout:</b> {planData.workoutPreference}</p>
            <p><b>Sleep:</b> {planData.sleepHours} hrs</p>
            <p><b>Days:</b> {planData.trainingDays}</p>
            <p><b>Diet:</b> {planData.dietPreference}</p>
            <p><b>Injuries:</b> {planData.injuries}</p>
            <p><b>Medical:</b> {planData.medicalCondition}</p>
            <p><b>Extra:</b> {planData.extraInfo}</p>

          </div>
        ) : (
          <p className="text-zinc-500">No plan found</p>
        )}
      </div>

    </div>
  );
}

export default Communication;