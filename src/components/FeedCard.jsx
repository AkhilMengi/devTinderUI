import axios from "axios"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { removeFeed } from "../utils/FeedSlice"

const FeedCard = ({ post }) => {
  const [successMessage, setSuccessMessage] = useState("")
  const dispatch = useDispatch()

  const handleSwipe = async (userId, status) => {
    try {
      await axios.post(
        `/api/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      )

      dispatch(removeFeed(userId))

      if (status === "accepted") {
        setSuccessMessage("✅ You have accepted the request!")
      } else if (status === "rejected") {
        setSuccessMessage("❌ You have rejected the request.")
      }

      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Review failed:", err)
      alert("Something went wrong while updating request.")
    }
  }

  return (
    <div className="flex justify-center">
      <div className="relative bg-gray-800 text-white w-[90%] max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={
            post?.avatar ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt="avatar"
          className="w-full h-64 object-cover"
        />

        <div className="p-4">
          <h1 className="text-2xl font-bold capitalize">
            {post.firstName} {post.lastName}
            {post.age && <span className="text-gray-400 ml-2">{post.age}</span>}
          </h1>
          {post?.gender && (
            <p className="text-sm text-gray-400 mb-2 capitalize">{post.gender}</p>
          )}
          <p className="text-sm text-gray-300 mb-3">
            {post?.about || "No bio available."}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post?.skills && post.skills.length > 0 ? (
              post.skills.map((skill, idx) => (
                <span key={idx} className="bg-primary px-3 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">No skills listed</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              className="btn btn-primary btn-md text-white"
              onClick={() => handleSwipe(post._id, "interested")}
            >
              Accept
            </button>
            <button
              className="btn btn-secondary btn-md text-white"
              onClick={() => handleSwipe(post._id, "ignored")}
            >
              Ignore
            </button>
          </div>

          {successMessage && (
            <div className="text-sm text-green-400 mt-2">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedCard
