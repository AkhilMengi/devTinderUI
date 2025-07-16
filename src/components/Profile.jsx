import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              alt="avatar"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-gray-700 shadow"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold capitalize mb-1">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">{user.emailId}</p>

            {/* About */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">About</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {user.about || "This user hasn't added an about section."}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
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

            {/* Edit Button */}
            <div className="flex justify-end">
              <button
                onClick={() => navigate('/profile/edit')}
                className="btn btn-primary px-6"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
