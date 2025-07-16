import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/Feed"
import { useEffect, useState } from "react"
import FeedCard from "./FeedCard"

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)
  const [loading, setLoading] = useState(true)

  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
    } catch (err) {
      console.error("Error fetching feed:", err)
    } finally {
      setLoading(false) // ✅ Ensure loading is false regardless of success
    }
  }

  useEffect(() => {
    if (!feed || !feed.data || feed.data.length === 0) {
      getFeed()
    } else {
      setLoading(false) // ✅ If feed already present, set loading to false
    }
  }, [feed])

  return (
    <div className="p-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Latest Feed</h2>
      <div className="space-y-6">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : feed?.data?.length > 0 ? (
          feed.data.map((item, index) => <FeedCard key={index} post={item} />)
        ) : (
          <p className="text-center text-gray-400">No feed items found.</p>
        )}
      </div>
    </div>
  )
}

export default Feed
