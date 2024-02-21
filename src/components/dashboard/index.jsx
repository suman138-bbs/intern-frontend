import { useEffect, useState, useContext } from "react";

import axios from "../../api/axios";
import { CoinContext } from "../../context/count.contex";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { coin, setCoin } = useContext(CoinContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internshipRes = await axios.get("app/get-internships");
        const jobRes = await axios.get("app/get-jobs");
        setData([...internshipRes.data.data, ...jobRes.data.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApply = async ({ company, title }) => {
    if (coin < 50) {
      toast.error("Oops! You don't have sufficient balance");
      return;
    }
    try {
      const res = await axios.post("/app/apply", { company, title });
      toast.success(res.data.message);
      setCoin(coin - 50);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.length === 0) {
    return <h1>Loading.......</h1>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex shadow-md justify-between items-end pb-5 "
          >
            <div className="flex flex-col  p-4">
              <div className="flex items-center gap-2">
                <img
                  src={item.logo}
                  alt={item.company}
                  className="h-10 w-auto"
                />
                <h3 className="font-bold">{item.company}</h3>
              </div>
              <div>
                <p>
                  <span className="font-bold">Title: </span>
                  {item.title}
                </p>
                <p>
                  <span className="font-bold">Location: </span>
                  {item.location}
                </p>
                <p>
                  <span className="font-bold">Duration: </span>
                  {item.duration}
                </p>
                <p>
                  <span className="font-bold">Stipend: </span>
                  {item.stipend}
                </p>
                <p>
                  <span className="font-bold">Posted: </span>
                  {item.posted}
                </p>
                <p>
                  <span className="font-bold">Start Date: </span>
                  {item.startDate}
                </p>
              </div>
            </div>
            <div>
              <button
                className="bg-blue-500 w-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                onClick={() => {
                  handleApply(item);
                }}
              >
                Apply using 50 coins
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
