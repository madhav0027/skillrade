import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Printer,
  User,
  Award,
  PlusCircle,
} from "lucide-react";

export default function Dashboard() {
  const [user, setuser] = useState({});
  const [skills, setskills] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      API.get("/skill/myskill").then((res) => setskills(res.data));

      API.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => setuser(res.data));
    }
  }, []);

  const renderContent = (text) =>
    text?.split(",").map((line, i) => (
      <p key={i} className="text-gray-300">
        {line}
      </p>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-12">

      {/* Print Button */}
      <div className="fixed top-25 right-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="p-3 rounded-full bg-green-600/20 border border-green-600/40 text-green-400 hover:bg-green-600/30 transition"
        >
          <Printer />
        </button>
      </div>

      {/* Dashboard Card */}
      <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/40">

        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {user.username?.length > 0
                ? `Welcome, ${user.username}`
                : "Welcome"}
            </h1>

            <p className="text-gray-400 mt-1">
              {skills.length > 0
                ? "Your Skill Progress Overview"
                : "Start building your skill profile"}
            </p>

            {user.credits > 0 && (
              <p className="mt-2 text-green-400 font-medium">
                Credits: {user.credits}
              </p>
            )}
          </div>

          {/* Profile */}
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-700">
            <img
              src={
                user.profilepic?.length > 0
                  ? user.profilepic
                  : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fstorage%2Fimg%2Fthumb%2Fabstract-user-flat-3.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Skills Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-green-400" />
            <h2 className="text-xl font-semibold text-white uppercase">
              Skills
            </h2>
          </div>

          {skills.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-300 text-lg">
                No skills added yet
              </p>
              <p className="text-gray-500 mt-2">
                Upgrade your skills and track progress 🚀
              </p>

              <button
                onClick={() => navigate("/login", { replace: true })}
                className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
              >
                Start Now
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {skills.map((us) => (
                <div key={us._id}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-medium text-white">
                      {us.SkillId.name}
                    </h4>

                    <div className="flex items-center gap-3 text-sm text-gray-400 capitalize">
                      <span>{us.status}</span>
                      <button
                        onClick={() =>
                          navigate("/quiz", {
                            state: {
                              skillId: us.SkillId._id,
                              skillName: us.SkillId.name,
                            },
                          })
                        }
                        className="p-2 rounded-full bg-green-600/20 hover:bg-green-600/30 transition"
                      >
                        <ArrowRight className="text-green-400" size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${us.progress}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    proficiency
                  </p>
                </div>
              ))}

              <button
                onClick={() => navigate("/skills")}
                className="print:hidden mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
              >
                <PlusCircle size={18} />
                Add More Skills
              </button>
            </div>
          )}
        </section>

        {/* Qualification Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <User className="text-green-400" />
            <h2 className="text-xl font-semibold text-white uppercase">
              Qualification
            </h2>
          </div>

          {user.qualification?.length === 0 ? (
            <p className="text-gray-400">
              No qualifications added yet
            </p>
          ) : (
            <div className="space-y-2">{renderContent(user.qualification)}</div>
          )}

          <button
            onClick={() =>
              user.username?.length > 0
                ? navigate("/settings")
                : navigate("/login")
            }
            className="print:hidden mt-6 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          >
            Add Qualification
          </button>
        </section>
      </div>
    </div>
  );
}
