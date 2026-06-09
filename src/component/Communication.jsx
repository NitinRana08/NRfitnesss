import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    doc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

function Communication({ goBack }) {
    const [showDetails, setShowDetails] = useState(false);
    const [requestData, setRequestData] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const requestId =
                    localStorage.getItem("activeRequestId");

                if (!requestId) return;

                const docRef = doc(
                    db,
                    "planRequests",
                    requestId
                );

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRequestData(docSnap.data());
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequest();
    }, []);
    useEffect(() => {
        const requestId =
            localStorage.getItem("activeRequestId");

        if (!requestId) return;

        const q = query(
            collection(
                db,
                "planRequests",
                requestId,
                "messages"
            ),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);
    const handleSendMessage = async () => {
        try {
            if (!message.trim()) return;

            const requestId =
                localStorage.getItem("activeRequestId");

            if (!requestId) return;

            await addDoc(
                collection(
                    db,
                    "planRequests",
                    requestId,
                    "messages"
                ),
                {
                    sender: "user",
                    text: message,
                    createdAt: serverTimestamp(),
                }
            );

            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Communication Center
                </h1>

                <button
                    onClick={goBack}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition"
                >
                    Back
                </button>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex gap-2 mb-4">
                <button
                    onClick={() => setShowDetails(false)}
                    className={`flex-1 py-2 rounded-lg transition ${!showDetails
                        ? "bg-red-500"
                        : "bg-zinc-800"
                        }`}
                >
                    Chat
                </button>

                <button
                    onClick={() => setShowDetails(true)}
                    className={`flex-1 py-2 rounded-lg transition ${showDetails
                        ? "bg-red-500"
                        : "bg-zinc-800"
                        }`}
                >
                    Details
                </button>
            </div>

            {/* Main Layout */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Chat Section */}
                <div
                    className={`
            lg:col-span-2
            bg-zinc-900
            border border-zinc-800
            rounded-2xl
            flex flex-col
            ${showDetails
                            ? "hidden lg:flex"
                            : "flex"
                        }
          `}
                >

                    <div className="p-4 border-b border-zinc-800">
                        <h2 className="font-semibold text-lg">
                            Coach Chat
                        </h2>
                    </div>

                    <div className="p-4 min-h-[400px] space-y-3 overflow-y-auto">
                        {messages.length === 0 ? (
                            <div className="bg-zinc-800 p-3 rounded-xl w-fit max-w-xs">
                                Welcome to NR Fitness 💪
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-3 rounded-xl max-w-xs ${msg.sender === "user"
                                            ? "bg-red-500 ml-auto"
                                            : "bg-zinc-800"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-zinc-800 flex gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Type your message..."
                            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                        />

                        <button
                            onClick={handleSendMessage}
                            className="bg-red-500 hover:bg-red-600 px-5 rounded-xl transition"
                        >
                            Send
                        </button>
                    </div>

                </div>

                {/* Details Section */}
                <div
                    className={`
            bg-zinc-900
            border border-zinc-800
            rounded-2xl
            p-5
            ${showDetails
                            ? "block"
                            : "hidden lg:block"
                        }
          `}
                >

                    <h2 className="text-lg font-semibold mb-5">
                        Your Details
                    </h2>

                    <div className="space-y-4">

                        <div>
                            <p className="text-zinc-400 text-sm">
                                Name
                            </p>
                            <p>
                                {requestData?.name || "Loading..."}
                            </p>
                        </div>

                        <div>
                            <p className="text-zinc-400 text-sm">
                                Goal
                            </p>
                            <p>
                                {requestData?.goal || "Loading..."}
                            </p>
                        </div>

                        <div>
                            <p className="text-zinc-400 text-sm">
                                Weight
                            </p>
                            <p>
                                {requestData?.weight
                                    ? `${requestData.weight} ${requestData.weightUnit}`
                                    : "Loading..."}
                            </p>
                        </div>

                        <div>
                            <p className="text-zinc-400 text-sm">
                                Experience
                            </p>
                            <p>
                                {requestData?.experience || "Loading..."}
                            </p>
                        </div>

                        <div>
                            <p className="text-zinc-400 text-sm">
                                Diet Preference
                            </p>
                            <p>
                                {requestData?.dietPreference || "Loading..."}
                            </p>
                        </div>

                        <div>
                            <p className="text-zinc-400 text-sm">
                                Training Days
                            </p>
                            <p>
                                {requestData?.trainingDays || "Loading..."}
                            </p>
                        </div>

                        <div>
                            <p className="text-zinc-400 text-sm">
                                Sleep Hours
                            </p>
                            <p>
                                {requestData?.sleepHours || "Loading..."}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Communication;