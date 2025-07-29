import React, { useEffect, useState } from "react"
import axios from "axios"
import ConnectionRequestCard from "./ConnectionRequestCard"
import { useDispatch, useSelector } from "react-redux"
import { setRequests, removeRequest } from "../utils/requestSlice"
import { addConnections } from "../utils/connectionSlice"
import { BASE_URL } from "../utils/constant"

const ConnectionRequestList = () => {
  const dispatch = useDispatch()
  const requests = useSelector((store) => store.request)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL +"/user/requests", {
          withCredentials: true,
        })
        // console.log(res.data)
        dispatch(setRequests(res.data.data || []))
      } catch (err) {
        console.error("Failed to load connection requests:", err)
        setError("Failed to fetch connection requests.")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // 🔁 Handle Accept/Reject
  const handleReview = async (requestId, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      )

      // 1. Remove from requests
      dispatch(removeRequest(requestId))

      // 2. Optionally, add to accepted connections if accepted
      if (status === "accepted") {
        dispatch(addConnections([res.data.connection]));
        setSuccessMessage("✅ You have accepted the request!");
      } else if (status === "rejected") {
        setSuccessMessage("❌ You have rejected the request.");
      }
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Review failed:", err)
     
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📬 Connection Requests</h1>
      {successMessage && (
        <div className="mb-4 text-center text-green-400 font-medium">
          {successMessage}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400">No pending requests.</p>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {requests.map((req) => (
            <ConnectionRequestCard
              key={req._id}
              request={req}
              showActions={true}
              onReview={handleReview}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ConnectionRequestList
