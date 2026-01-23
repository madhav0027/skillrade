import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import API from "../api/api";

const Settings = () => {

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [loading, setLoading] = useState(true);
  const [email,setemail]= useState("");
  const [fileselect,onFileSelect] = useState();


   const [preview, setPreview] = useState(profilePic || null);
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click(); // trigger hidden input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setPreview(URL.createObjectURL(file)); // preview locally
    onFileSelect(file); // send to parent component
  };

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try { 
        const res = await API.get("/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.statusText !== "OK") throw new Error("Failed to fetch user data");
        const data = await res.data;
        setUsername(data.username);
        setProfilePic(data.profilepic || "");
        setemail(data.email)
        setQualifications(data.qualification)
      } catch (err) {
        if(err) throw err
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
    console.log(fileselect)

    try {
        const res = await API.put(
        "/user/update",
        formdata
        ,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
        );

      if(res.data.status === "DONE"){

          alert("Profile updated successfully!");
          setPassword(""); // clear password field
          window.location.reload()
        }
        else{
            new Error("Cannot Proceed Request now");
            alert("invalid Request")
        }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Profile Picture URL */}
        <div className="flex flex-col items-center">
            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                name="avatar"
                id="avatar"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Clickable Profile Pic */}
            <div
                onClick={handleClick}
                className="w-30 h-30 rounded-full overflow-hidden border-6 border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
            >
                <img
                src={preview || profilePic} // fallback if no image
                alt="Profile"
                className="w-full h-full object-cover"
                />
            </div>
            </div>
        {/* Email (not editable) */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>


        {/* Password */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Change Password</label>
          <input
            type="password"
            placeholder="Leave blank to keep current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Qualifications */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Qualifications</label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          <p
            className="mt-1 px-3 py-1 text-gray-600 rounded"
          >
            Please Seperate qualifications by commas.
          </p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
