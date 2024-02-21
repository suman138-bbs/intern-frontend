import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

/**
 * 
 * {
    personalDetails: {
      name: "",
      mobile: "",
      profilePic: "",
      linkedInLink: "",
      githubLink: "",
      resume: "",
    },
    educationDetails: {
      schoolOrCollegeName: "",
      startDate: "",
      endDate: "",
    },
    projectDetails: {
      projectName: "",
      projectDescription: "",
      soloOrGroup: "",
      projectLink: "",
    },
    experienceDetails: [
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
  }
 */
