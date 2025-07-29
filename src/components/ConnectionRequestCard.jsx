import React, { useState } from "react";
import { MessageSquare } from "lucide-react"; // Optional chat icon
import { Link } from "react-router-dom";

const ConnectionRequestCard = ({ request, showActions = true, onReview }) => {
    const user = request.user || request.fromUserId;
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                        {user.firstName?.[0]}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-gray-400 text-sm capitalize">Status: {request.status}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-white hover:bg-white text-black px-4 py-2 rounded-lg text-sm"
                        onClick={() => setShowModal(true)}
                    >
                        Info
                    </button>

                    {showActions ? (
                        <>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                                onClick={() => onReview?.(request._id, "accepted")}
                            >
                                Accept
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                                onClick={() => onReview?.(request._id, "rejected")}
                            >
                                Reject
                            </button>
                        </>
                    ) : (
                        <Link to={`/chat/${user._id}`}>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                            >
                                <MessageSquare size={16} /> Chat
                            </button>
                        </Link>

                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="relative w-[90%] max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl text-white animate-fade-in">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-white text-2xl hover:scale-125 transition"
                            aria-label="Close"
                        >
                            &times;
                        </button>

                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-md">
                                {user.firstName?.[0]}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center mb-2">
                            {user.firstName} {user.lastName}
                        </h2>
                        <h4 className="text-center text-lg font-semibold mb-4 text-white italic tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent animate-pulse">
                            {user.about || "No bio provided."}
                        </h4>

                        <p className="text-center text-sm text-gray-200 mb-4 capitalize">
                            {user.gender || "Not specified"}
                        </p>

                        <div className="space-y-2 text-sm text-gray-100">
                            <p>
                                <span className="font-medium">Status:</span>{" "}
                                <span className="capitalize">{request.status}</span>
                            </p>
                            <p>
                                <span className="font-medium">Request ID:</span>{" "}
                                {request._id} {request.connectionId}
                            </p>
                            {showActions && (
                                <p>
                                    <span className="font-medium">Created:</span>{" "}
                                    {new Date(request.createdAt).toLocaleString()}
                                </p>
                            )}
                            {request.acceptedAt && (
                                <p>
                                    <span className="font-medium">Accepted:</span>{" "}
                                    {new Date(request.acceptedAt).toLocaleString()}
                                </p>
                            )}
                        </div>

                        <div className="mb-6 mt-7">
                            {user.skills && user.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-primary text-white px-3 py-1 rounded-full text-xs"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">No skills added.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConnectionRequestCard;
