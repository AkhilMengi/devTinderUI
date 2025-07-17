import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"

const UpdateProfile = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [about, setAbout] = useState("")
    const [skills, setSkills] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()

    // 🚀 Fetch user profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/profile", {
                    withCredentials: true,
                })

                const data = res.data.user
                setFirstName(data.firstName || "")
                setLastName(data.lastName || "")
                setEmailId(data.emailId || "")
                setAge(data.age?.toString() || "")
                setGender(data.gender || "")
                setAbout(data.about || "")
                setSkills(data.skills?.join(", ") || "")
            } catch (err) {
                console.error("Failed to load profile:", err)
                setErrorMessage("Failed to load profile. Try again later.")
            }
        }

        fetchProfile()
    }, [])

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setSuccessMessage("")

        const skillsArray = skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)

        try {
            const res = await axios.patch(
                "http://localhost:3000/api/update/me",
                {
                    lastName,
                    about,
                    skills: skillsArray,
                },
                {
                    withCredentials: true
                }
            )
            dispatch(addUser(res.data.user))
            setSuccessMessage("Profile updated successfully!")
        } catch (err) {
            console.error("Update failed:", err)
            if (err.response?.status === 401) {
                setErrorMessage("Unauthorized. Please log in again.")
            } else {
                setErrorMessage("Failed to update profile. Try again.")
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    Update Profile ✏️
                </h1>

                {errorMessage && (
                    <div className="mb-4 text-red-500 text-sm text-center">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="mb-4 text-green-500 text-sm text-center">{successMessage}</div>
                )}

                <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-300 text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white"
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
                            className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-300 text-sm font-medium">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white"
                                placeholder="22"
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 text-sm font-medium">Gender</label>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white"
                                placeholder="Male / Female / Other"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm font-medium">About You</label>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="mt-1 w-full p-2 h-24 resize-none rounded-lg bg-gray-700 text-white"
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
                            className="mt-1 w-full p-2 rounded-lg bg-gray-700 text-white"
                            placeholder="e.g. React, Node.js, MongoDB"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile
