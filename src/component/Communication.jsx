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
    const [loading, setLoading] = useState(true);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                Loading...
            </div>
        );
    }

    useEffect(() => {
        const planRef = doc(db, "planRequests", user.email);

        const q = query(
            collection(db, "chats", user.email, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsub = onSnapshot(q, (snap) => {
            setMessages(
                snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
            );
        });

        const loadPlan = async () => {
            try {
                setLoading(true);

                const planSnap = await getDoc(planRef);

                if (!planSnap.exists()) {
                    setUnlocked(false);
                    setLoading(false);
                    return;
                }

                const data = planSnap.data();

                setPlanData(data);

                console.log("PLAN:", data);

                const isComplete =
                    data?.name &&
                    data?.age &&
                    data?.goal &&
                    data?.dietPreference &&
                    data?.workoutPreference;

                setUnlocked(Boolean(isComplete));
                setLoading(false);

            } catch (err) {
                console.error(err);
                setUnlocked(false);
                setLoading(false);
            }
        };

        loadPlan();

        return () => unsub();
    }, [user]);

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading communication...
            </div>
        );
    }

    if (!unlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                <button
                    onClick={goBack}
                    className="absolute top-4 left-4 bg-zinc-800 px-4 py-2 rounded"
                >
                    ← Back
                </button>

                <div className="text-center p-6 border border-zinc-700 rounded-xl">
                    Communication Locked 🔒
                    <br />
                    Complete your plan first
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex">

            <button
                onClick={goBack}
                className="absolute top-4 left-4 bg-zinc-800 px-4 py-2 rounded"
            >
                ← Back
            </button>

            <div className="w-2/3 border-r border-zinc-800 flex flex-col">

                <div className="flex-1 overflow-y-auto p-4 space-y-2 mt-12">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={`p-3 rounded-lg max-w-md ${
                                m.sender === "user"
                                    ? "bg-red-600 ml-auto"
                                    : "bg-zinc-800"
                            }`}
                        >
                            {m.text}
                        </div>
                    ))}
                </div>

                <div className="p-4 flex gap-2 border-t border-zinc-800">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 bg-zinc-900 px-3 py-2 rounded"
                        placeholder="Type..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-red-500 px-4 py-2 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>

            <div className="w-1/3 p-4 text-sm text-zinc-300 space-y-2">
                <h2 className="text-white text-lg font-bold">
                    Your Plan
                </h2>

                {planData ? (
                    <>
                        <p>Name: {planData.name}</p>
                        <p>Age: {planData.age}</p>
                        <p>Goal: {planData.goal}</p>
                        <p>Diet: {planData.dietPreference}</p>
                        <p>Workout: {planData.workoutPreference}</p>
                    </>
                ) : (
                    <p>No plan found</p>
                )}
            </div>
        </div>
    );
}

export default Communication;