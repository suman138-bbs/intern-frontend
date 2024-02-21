import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";

const Analytics = () => {
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedInternships = async () => {
      try {
        const res = await axios.get("/app/get-profile");
        console.log("Profile", res.data.user.applied);
        setAppliedInternships(res.data.user.applied);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchAppliedInternships();
  }, []);

  if (loading) {
    return <h1>Loading .......</h1>;
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {appliedInternships.map((internship) => (
        <div key={internship._id} className="shadow-md px-4 py-2 rounded">
          <h1>
            <span className="font-bold">Company Name :</span> {internship.name}
          </h1>
          <h1>
            <span className="font-bold">Role :</span> {internship.role}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
