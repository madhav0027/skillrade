import React, { useState, useEffect, useRef } from "react";
import API from "../api/api";
import { Camera, Save, UserCog } from "lucide-react";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [loading, setLoading] = useState(true);
  const [email, setemail] = useState("");
  const [fileselect, onFileSelect] = useState();
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await API.get("/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data;
        setUsername(data.username);
        setProfilePic(data.profilepic || "");
        setemail(data.email);
        setQualifications(data.qualification || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("qualification", qualifications);
    formdata.append("avatar", fileselect);

    try {
      const res = await API.put("/user/update", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.status === "DONE") {
        alert("Profile updated successfully!");
        setPassword("");
        window.location.reload();
      } else {
        alert("Invalid request");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <UserCog className="text-green-400" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Account Settings
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={handleClick}
              className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-700 cursor-pointer group"
            >
              <img
                src={preview || profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Camera className="text-green-400" />
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-3">
              Click to change profile picture
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-gray-200 focus:outline-none focus:border-green-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Change Password
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-600"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Qualifications
            </label>
            <input
              type="text"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-gray-200 focus:outline-none focus:border-green-600"
            />
            <p className="text-gray-500 text-sm mt-2">
              Separate qualifications using commas
            </p>
          </div>

          {/* Save */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-medium text-white bg-green-600 hover:bg-green-700 transition shadow-lg shadow-green-900/40"
          >
            <Save size={18} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
