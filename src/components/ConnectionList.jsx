
import React, { useEffect, useState } from "react";

import axios from "axios";

import ConnectionRequestCard from "./ConnectionRequestCard";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constant";

const ConnectionList = () => {
  const dispatch = useDispatch()
  const connections = useSelector(store=>store.connection)


  useEffect(() => {
    // Replace with your actual API call
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL +"/user/connections",{withCredentials: true,}); // ← change endpoint
        
        dispatch(addConnections(res.data.data))
      } catch (err) {
        console.error("Failed to fetch connections", err);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-6">Your Connections</h1>

      <div className="grid gap-6">
        {connections.length > 0 ? (
          connections.map((conn) => (
            <ConnectionRequestCard key={conn.connectionId} request={conn} showActions={false} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No connections yet.</p>
        )}
      </div>
    </div>
  );
};

export default ConnectionList;
