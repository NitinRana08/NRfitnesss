import { useEffect, useState } from "react";
import { db, auth } from "../firebase";

import {
    collection,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { uploadImageToCloudinary } from "../utils/cloudinary";

function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [adminMessage, setAdminMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState(null);
    const email =
        selectedRequest?.userEmail ||
        selectedRequest?.id;
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "planRequests")
                );

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setRequests(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
       

        if (!email) return;

        const q = query(
            collection(
                db,
                "communications",
                email,
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
    }, [selectedRequest]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendReply = async () => {
        try {
            console.log("Selected Request:", selectedRequest);
            console.log("User Email:", selectedRequest?.userEmail);

            if (!email) {
                alert("User email not found");
                return;
            }

            // Text Message
            if (adminMessage.trim()) {
                console.log("Sending text message...");

                await addDoc(
                    collection(
                        db,
                        "communications",
                        email,
                        "messages"
                    ),
                    {
                        sender: "admin",
                        type: "text",
                        text: adminMessage,
                        createdAt: serverTimestamp(),
                    }
                );

                console.log("Text message sent");
            }

            // Image Message
            if (image) {
                console.log("Uploading image...");

                const imageUrl = await uploadImageToCloudinary(image);

                console.log("Image uploaded:", imageUrl);

                await addDoc(
                    collection(
                        db,
                        "communications",
                        email,
                        "messages"
                    ),
                    {
                        sender: "admin",
                        type: "image",
                        imageUrl,
                        createdAt: serverTimestamp(),
                    }
                );

                console.log("Image message sent");
            }

            setAdminMessage("");
            setImage(null);

        } catch (error) {
            console.error("ADMIN SEND ERROR:", error);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-red-500">
                    Admin Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>

            {/* Requests */}
            <div className="space-y-4">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        onClick={() => setSelectedRequest(request)}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-red-500 transition"
                    >
                        <h2 className="font-bold text-lg">
                            {request.name}
                        </h2>

                        <p>Email: {request.userEmail}</p>

                        <p>Goal: {request.goal}</p>

                        <p className="text-zinc-500 text-sm mt-2">
                            ID: {request.id}
                        </p>
                    </div>
                ))}
            </div>

            {selectedRequest && (
                <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        {selectedRequest.name}
                    </h2>

                    {/* User Details */}
                    <div className="grid md:grid-cols-2 gap-4 text-sm">

                        <p><strong>Name:</strong> {selectedRequest.name}</p>
                        <p><strong>Email:</strong> {email}</p>

                        <p><strong>Age:</strong> {selectedRequest.age}</p>
                        <p><strong>Gender:</strong> {selectedRequest.gender}</p>

                        <p><strong>Goal:</strong> {selectedRequest.goal}</p>

                        <p>
                            <strong>Height:</strong>{" "}
                            {selectedRequest.height}{" "}
                            {selectedRequest.heightUnit}
                        </p>

                        <p>
                            <strong>Weight:</strong>{" "}
                            {selectedRequest.weight}{" "}
                            {selectedRequest.weightUnit}
                        </p>

                        <p>
                            <strong>Experience:</strong>{" "}
                            {selectedRequest.experience}
                        </p>

                        <p>
                            <strong>Diet:</strong>{" "}
                            {selectedRequest.dietPreference}
                        </p>

                        <p>
                            <strong>Workout:</strong>{" "}
                            {selectedRequest.workoutPreference}
                        </p>

                        <p>
                            <strong>Training Days:</strong>{" "}
                            {selectedRequest.trainingDays}
                        </p>

                        <p>
                            <strong>Sleep Hours:</strong>{" "}
                            {selectedRequest.sleepHours}
                        </p>

                    </div>

                    <div className="mt-4">
                        <strong>Medical Condition:</strong>
                        <p className="text-zinc-400">
                            {selectedRequest.medicalCondition}
                        </p>
                    </div>

                    <div className="mt-4">
                        <strong>Injuries:</strong>
                        <p className="text-zinc-400">
                            {selectedRequest.injuries}
                        </p>
                    </div>

                    <div className="mt-4">
                        <strong>Extra Info:</strong>
                        <p className="text-zinc-400">
                            {selectedRequest.extraInfo}
                        </p>
                    </div>
                    {/* Diet Plan Details */}

                    <div className="mt-6 border-t border-zinc-700 pt-4">
                        <h3 className="text-xl font-bold text-red-500 mb-4">
                            Diet Information
                        </h3>

                        <p>
                            <strong>Meals:</strong>{" "}
                            {selectedRequest.meals}
                        </p>

                        <p>
                            <strong>Diet Type:</strong>{" "}
                            {selectedRequest.dietType}
                        </p>

                        <p>
                            <strong>Daily Routine:</strong>{" "}
                            {selectedRequest.dailyRoutine}
                        </p>

                        <p>
                            <strong>Favorite Foods:</strong>{" "}
                            {selectedRequest.favoriteFoods}
                        </p>

                        <p>
                            <strong>Budget:</strong> ₹
                            {selectedRequest.budget}
                        </p>

                        <p>
                            <strong>Allergies:</strong>{" "}
                            {selectedRequest.allergies}
                        </p>

                        <p>
                            <strong>Water Intake:</strong>{" "}
                            {selectedRequest.waterIntake} L
                        </p>
                    </div>

                    {/* Chat */}
                    <div className="mt-6 bg-zinc-950 rounded-xl p-4 h-80 overflow-y-auto">
                        {messages.length === 0 ? (
                            <p className="text-zinc-500">
                                No messages yet.
                            </p>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`mb-3 p-3 rounded-xl max-w-xs ${msg.sender === "admin"
                                        ? "bg-red-500 ml-auto"
                                        : "bg-zinc-700"
                                        }`}
                                >
                                    <p className="text-xs opacity-70 mb-1">
                                        {msg.sender === "admin"
                                            ? "You"
                                            : "User"}
                                    </p>

                                    <>
                                        {msg.type === "image" ? (
                                            <img
                                                src={msg.imageUrl}
                                                alt="chat"
                                                className="max-w-[250px] rounded-lg"
                                            />
                                        ) : (
                                            msg.text
                                        )}
                                    </>
                                </div>
                            ))
                        )}
                    </div>


                    {/* Message Input */}
                    <div className="mt-6 flex gap-3">
                        <input
                            type="text"
                            value={adminMessage}
                            onChange={(e) =>
                                setAdminMessage(e.target.value)
                            }
                            placeholder="Reply to user..."
                            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                            className="text-sm"
                        />
                        <button
                            onClick={handleSendReply}
                            className="bg-red-500 hover:bg-red-600 px-5 rounded-xl transition"
                        >
                            Send
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default AdminDashboard;