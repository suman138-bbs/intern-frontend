import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

import { CoinContext } from "../../context/count.contex";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../context/auth.context";

const Settings = () => {
  const { coin, setCoin } = useContext(CoinContext);
  const { auth } = useAuth(AuthContext);
  console.log(auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get("/app/get-profile");
      console.log("Profile", res.data.user);
      setProfile(res.data.user.profile);
    };

    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setProfile((prevProfile) => ({
      ...prevProfile,
      [section]: {
        ...prevProfile[section],
        [field]: value,
      },
    }));
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    const idx = parseInt(section.match(/\[(\d+)\]/)[1]); // Extract index from section
    const updatedExperienceDetails = [...profile.experienceDetails];
    updatedExperienceDetails[idx] = {
      ...updatedExperienceDetails[idx],
      [field]: value,
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      experienceDetails: updatedExperienceDetails,
    }));
  };

  const handleAddMore = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      experienceDetails: [
        ...prevProfile.experienceDetails,
        {
          type: "",
          companyName: "",
          companyWebsite: "",
          role: "",
          startDate: "",
          endDate: "",
          coverLetter: "",
        },
      ],
    }));
  };

  const handleSubmit = async () => {
    await axios.post("app/update-coins", { profile });
  };

  useEffect(() => {
    handleSubmit();
    const getAvilableCoin = async () => {
      const res = await axios.get("/app/get-coins");

      setCoin(res.data.coins);
    };

    getAvilableCoin();
  }, [profile]);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/app/get-profile");

        setProfile(res.data.user.profile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return <h1>Loading......</h1>;
  }
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h2 className="font-bold text-2xl">Update Profile</h2>
      <div onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex flex-col gap-5">
          {" "}
          <h1>Personal Details</h1>
          <input
            type="text"
            name="personalDetails.name"
            placeholder="Name"
            value={profile?.personalDetails.name}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <input
            type="text"
            name="personalDetails.mobile"
            placeholder="Mobile"
            value={profile?.personalDetails.mobile}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <input
            type="text"
            name="personalDetails.profilePic"
            placeholder="Profile Pic Link"
            value={profile?.personalDetails.profilePic}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <input
            type="text"
            name="personalDetails.linkedInLink"
            placeholder="LinkedIn Link"
            value={profile?.personalDetails.linkedInLink}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <input
            type="text"
            name="personalDetails.githubLink"
            placeholder="Github Link"
            value={profile?.personalDetails.githubLink}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <input
            type="text"
            name="personalDetails.resume"
            placeholder="Resume Link"
            value={profile.personalDetails.resume}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1>Education Details</h1>
          <input
            type="text"
            name="educationDetails.schoolOrCollegeName"
            placeholder="School/College Name"
            value={profile.educationDetails.schoolOrCollegeName}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />

          <label htmlFor="">Start Date</label>
          <input
            type="date"
            name="educationDetails.startDate"
            placeholder="Start Date"
            value={profile.educationDetails.startDate?.split("T")[0]}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />

          <label htmlFor="">End Date</label>
          <input
            type="date"
            name="educationDetails.endDate"
            placeholder="End Date"
            value={profile.educationDetails.endDate?.split("T")[0]}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1>Project Details</h1>
          <input
            type="text"
            name="projectDetails.projectName"
            placeholder="Project Name"
            value={profile.projectDetails.projectName}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <textarea
            name="projectDetails.projectDescription"
            placeholder="Project Description"
            value={profile.projectDetails.projectDescription}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <input
            type="text"
            name="projectDetails.soloOrGroup"
            placeholder="Project Name"
            value={profile.projectDetails.soloOrGroup}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
          <input
            type="text"
            name="projectDetails.projectLink"
            placeholder="Project Name"
            value={profile.projectDetails.projectLink}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded-md"
          />
        </div>

        {/* Experience Details */}
        <div>
          <h1>Experience Details </h1>
          <div className="flex flex-col gap-4">
            {profile.experienceDetails.map((experience, index) => (
              <div key={index} className="flex flex-col gap-4">
                <input
                  type="text"
                  name={`experienceDetails[${index}].type`}
                  placeholder="Type"
                  value={experience.type}
                  onChange={(e) => {
                    handleExperienceChange(e, index);
                  }}
                  className="border border-black px-2 py-1 rounded-md"
                />
                <input
                  type="text"
                  name={`experienceDetails[${index}].companyName`}
                  placeholder="Company Name"
                  value={experience.companyName}
                  onChange={(e) => {
                    handleExperienceChange(e, index);
                  }}
                  className="border border-black px-2 py-1 rounded-md"
                />
                <input
                  type="text"
                  name={`experienceDetails[${index}].companyWebsite`}
                  placeholder="Company Website Link"
                  value={experience.companyWebsite}
                  onChange={(e) => {
                    handleExperienceChange(e, index);
                  }}
                  className="border border-black px-2 py-1 rounded-md"
                />
                <input
                  type="text"
                  name={`experienceDetails[${index}].role`}
                  placeholder="Role"
                  value={experience.role}
                  onChange={(e) => {
                    handleExperienceChange(e, index);
                  }}
                  className="border border-black px-2 py-1 rounded-md"
                />
                <label htmlFor="">Start Date</label>
                <input
                  type="Date"
                  name={`experienceDetails[${index}].startDate`}
                  placeholder="Start Date"
                  value={experience.startDate?.split("T")[0]}
                  onChange={(e) => {
                    handleExperienceChange(e, index);
                  }}
                  className="border border-black px-2 py-1 rounded-md"
                />
                <label htmlFor="">End Date</label>
                <input
                  type="date"
                  name={`experienceDetails[${index}].endDate`}
                  placeholder="End"
                  value={experience.endDate?.split("T")[0]}
                  onChange={(e) => {
                    handleExperienceChange(e, index);
                  }}
                  className="border border-black px-2 py-1 rounded-md"
                />
                <input
                  type="text"
                  name={`experienceDetails[${index}].coverLetter`}
                  placeholder="Cover Letter Link"
                  value={experience.coverLetter}
                  onChange={(e) => {
                    handleExperienceChange(e, index);
                  }}
                  className="border border-black px-2 py-1 rounded-md"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={handleAddMore}
              className="px-4 py-2 bg-lime-400 rounded"
            >
              Add {profile.experienceDetails.length > 0 ? "more" : null}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
