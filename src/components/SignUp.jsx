import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);

    try {
      const res = await axios.post(
        BASE_URL +"/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age: Number(age),
          gender,
          about,
          skills: skillsArray,
        },
        { withCredentials: true }
      );

      console.log("Signup successful:", res.data);
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Dev Tinder 🔥
        </h1>

        <form  className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm font-medium">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="22"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium">Gender</label>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Male / Female / Other"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium">About You</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 w-full p-2 h-24 resize-none rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tell us a bit about yourself"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all"
            onClick={handleSignUpSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
