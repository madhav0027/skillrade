import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // fixed: removed unused "replace"
import API from "../api/api";

// lucide-react icons (make sure it's installed: npm install lucide-react)
import {
  Brain,
  Code,
  Database,
  Globe,
  Cpu,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

const SkillsSelector = () => {
  const [skills, setSkills] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch all skills/domains
  useEffect(() => {
    API.get("/skill")
      .then((res) => setSkills(res.data))
      .catch((err) => {
        console.error("Failed to load skills", err);
        // Optional: navigate to error or login
      });
  }, []);

  const handleDomainSelect = (domain) => {
    setSelectedDomainId(domain);
    setSelectedSkillId(null); // reset skill when domain changes
  };

  const handleContinue = async () => {
    if (!selectedSkillId) return;

    try {
      setLoading(true);
      await API.post("/skill/choose", {
        SkillId: selectedSkillId,
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Skill selection failed:", err);
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  // Get unique domains
  const uniqueDomains = skills.filter(
    (item, index, self) =>
      index === self.findIndex((d) => d.domain === item.domain)
  );

  // Filter skills by selected domain
  const filteredSkills = selectedDomainId
    ? skills.filter((skill) => skill?.domain === selectedDomainId)
    : [];

  // Optional: domain icon mapping (you can expand this)
  const domainIcons = {
    "Web Development": Globe,
    "Data Science": Database,
    "Machine Learning": Brain,
    "Programming": Code,
    "DevOps": Cpu,
    // add more as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl shadow-black/40 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20">
              <Sparkles className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Choose Your Mastery Path
            </h2>
            <p className="mt-3 text-gray-400 text-lg">
              Select the domain and skill you want to master first
            </p>
          </div>

          {/* Domain Chips */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-200 mb-4 text-center md:text-left">
              Domains
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {uniqueDomains.length === 0 ? (
                <p className="text-gray-500">Loading domains...</p>
              ) : (
                uniqueDomains.map((domainItem) => {
                  const DomainIcon =
                    domainIcons[domainItem.domain] || Brain;
                  return (
                    <button
                      key={domainItem.domain}
                      onClick={() => handleDomainSelect(domainItem.domain)}
                      className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-200
                        ${
                          selectedDomainId === domainItem.domain
                            ? "bg-green-600/20 border-green-600 text-green-400 shadow-green-900/30 shadow-md"
                            : "border-gray-700 text-gray-300 hover:border-green-600/60 hover:text-green-400 hover:bg-green-950/30"
                        }`}
                    >
                      <DomainIcon className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity" />
                      {domainItem.domain}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-200 mb-5 text-center md:text-left">
              {selectedDomainId ? `Skills in ${selectedDomainId}` : "Select a domain to see skills"}
            </h3>

            {selectedDomainId ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500 py-8">
                    No skills found in this domain yet
                  </p>
                ) : (
                  filteredSkills.map((skill) => (
                    <div
                      key={skill._id}
                      onClick={() => setSelectedSkillId(skill._id)}
                      className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 text-center
                        ${
                          selectedSkillId === skill._id
                            ? "border-green-600 bg-green-950/30 shadow-green-900/20 shadow-lg scale-[1.02]"
                            : "border-gray-800 hover:border-green-700/60 hover:bg-gray-800/40 hover:scale-[1.02]"
                        }`}
                    >
                      <h4 className="font-semibold text-lg text-white">
                        {skill.name}
                      </h4>
                      {skill.description && (
                        <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 border border-dashed border-gray-700 rounded-xl">
                Choose a domain above to view available skills
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedSkillId || loading}
            className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-lg
              ${
                selectedSkillId && !loading
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-green-900/40"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue to Dashboard
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsSelector;