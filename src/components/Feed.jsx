import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/FeedSlice"
import { useEffect, useState } from "react"
import FeedCard from "./FeedCard"

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)
  const [loading, setLoading] = useState(true)

  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/feed", {
        withCredentials: true,
      })
      dispatch(addFeed(res.data.data)) // assuming response is { data: [...] }
    } catch (err) {
      console.error("Error fetching feed:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  return (
    <div className="p-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Swipe Feed</h2>
      <div className="flex justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : feed.length > 0 ? (
          <FeedCard post={feed[0]} />
        ) : (
          <p className="text-gray-400 text-center">No more profiles to show.</p>
        )}
      </div>
    </div>
  )
}

export default Feed
