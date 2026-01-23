import { useEffect, useState } from "react";
import API from "../api/api";
import { replace, useNavigate } from "react-router-dom";

const SkillsSelector = () => {
  const [skills, setskills] = useState([]);
  const navigate = useNavigate();
  
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const [loading, setLoading] = useState(false);

  // Fetch domains & skills
  useEffect(() => {
    API.get("/skill").then(res => setskills(res.data));
  }, []);

  const handleDomainSelect = (domainId) => {
    setSelectedDomainId(domainId);
    setSelectedSkillId(null); // reset skill on domain change
  };

  const handleContinue = async () => {
    try {
      setLoading(true);
      
      console.log(selectedSkillId)
      await API.post("/skill/choose", {
        SkillId: selectedSkillId,
      });
      
      navigate('/',{replace:true})      
    } catch (err) {
      navigate('/login',{replace:true})
    } finally {
      setLoading(false);
    }
  };

  const uniquedomain = skills.filter(
    (item, index, self) =>
      index === self.findIndex(d => d.domain === item.domain)
    );
  // Filter skills by domain
  const filteredSkills = selectedDomainId
    ? skills.filter(skill => skill?.domain === selectedDomainId)
    : skills;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Choose a Skill you want to master
      </h2>

      {/* Domain Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {uniquedomain.map(domain => (
            <button
            key={domain._id}
            onClick={() => handleDomainSelect(domain.domain)}
            className={`px-4 py-2 rounded-full border transition
              ${
                selectedDomainId === domain.domain
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:border-black"
              }
              `}
              >
            {domain.domain}
          </button>
    ))}
      </div>

      Skills
      <div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSkills.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No skills available for this domain
          </p>
        ) : (
          filteredSkills.map(skill => (
            <div
              key={skill._id}
              onClick={() => setSelectedSkillId(skill._id)}
              className={`cursor-pointer border rounded-full p-4 transition
                ${
                  selectedSkillId === skill._id
                    ? "border-blue-600 border-2 bg-blue-50 shadow"
                    : "border-gray-200 hover:border-blue-400"
                }
              `}
            >
              <h4 className="font-medium text-xl text-center">
                {skill.name}
              </h4>
            </div>
          ))
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedSkillId || loading}
        className={`mt-8 w-full py-3 rounded text-white font-medium
          ${
            selectedSkillId
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
};

export default SkillsSelector;
