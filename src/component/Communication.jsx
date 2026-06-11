import { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    where,
} from "firebase/firestore";
import { uploadImageToCloudinary } from "../utils/cloudinary";

function Communication({ goBack }) {
    const [showDetails, setShowDetails] = useState(false);
    const [requestData, setRequestData] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const email = auth.currentUser?.email;

                if (!email) return;

                const q = query(
                    collection(db, "planRequests"),
                    where("userEmail", "==", email)
                );

                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const latestDoc =
                        snapshot.docs[snapshot.docs.length - 1];

                    setRequestData(latestDoc.data());
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequest();
    }, []);
    useEffect(() => {
        if (!auth.currentUser?.email) return;

        const q = query(
            collection(
                db,
                "communications",
                auth.currentUser.email,
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

            if (message.trim()) {
                await addDoc(
                    collection(
                        db,
                        "communications",
                        auth.currentUser.email,
                        "messages"
                    ),
                    {
                        sender: "user",
                        type: "text",
                        text: message,
                        createdAt: serverTimestamp(),
                    }
                );
            }

            if (image) {
                const imageUrl =
                    await uploadImageToCloudinary(image);

                await addDoc(
                    collection(
                        db,
                        "communications",
                        auth.currentUser.email,
                        "messages"
                    ),
                    {
                        sender: "user",
                        type: "image",
                        imageUrl,
                        createdAt: serverTimestamp(),
                    }
                );
            }

            setMessage("");
            setImage(null);

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

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

                    <div className="p-4 h-[400px] overflow-y-auto space-y-3">
                        {messages.length === 0 ? (
                            <div className="bg-zinc-800 p-3 rounded-xl w-fit max-w-xs">
                                Welcome to NR Fitness 💪
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-3 rounded-xl max-w-[85%] md:max-w-xs ${msg.sender === "user"
                                        ? "bg-red-500 ml-auto"
                                        : "bg-zinc-800"
                                        }`}
                                >
                                    <>
                                        {msg.type === "image" ? (
                                            <img
                                                src={msg.imageUrl}
                                                alt="chat"
                                                className="max-w-full md:max-w-[250px] rounded-lg"
                                            />
                                        ) : (
                                            msg.text
                                        )}
                                    </>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className="p-4 border-t border-zinc-800 flex flex-col md:flex-row gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="
        w-full
        md:flex-1
        bg-zinc-800
        border border-zinc-700
        rounded-xl
        px-4 py-3
        outline-none
        focus:border-red-500
    "
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="
        w-full
        md:w-auto
        text-sm
    "
                        />

                        <button
                            onClick={handleSendMessage}
                            className="
        w-full
        md:w-auto
        bg-red-500
        hover:bg-red-600
        px-5 py-3
        rounded-xl
        transition
    "
                        >
                            Send
                        </button>

                        {/* <button
                            onClick={handleSendMessage}
                            className="bg-red-500 hover:bg-red-600 px-5 rounded-xl transition"
                        >
                            Send
                        </button> */}
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