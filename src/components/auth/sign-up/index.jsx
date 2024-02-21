import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

import EmailIcon from "../../../assets/Email.svg";
import ViewIcon from "../../../assets/view.svg";
import LockIcon from "../../../assets/lock.svg";
import Rolling from "../../../assets/Rolling.svg";
import { toast } from "react-toastify";

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    otp: "",
    email: "",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!data.email) {
      setIsLoading(false);
      return toast.error("Please provide email ");
    } else if (!isValidEmail(data.email)) {
      setIsLoading(false);
      return toast.error("Please provide a valid email address");
    }

    try {
      const { email } = data;

      const res = await axios.post("/auth/register", { email });
      console.log("RESPONSE FROM AUTH", res);
      toast.success(res.data.message);
      setSuccess(res.data.success);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!data.email || !data.otp) {
      setIsLoading(false);
      return toast.error("Please provide email and OTP");
    } else if (!isValidEmail(data.email)) {
      setIsLoading(false);
      return toast.error("Please provide a valid email address");
    }

    try {
      const { email, otp } = data;

      const res = await axios.post("/auth/verify", { email, otp });
      console.log("verify", res);
      toast.success(res.data.message);
      navigate("/app/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl">Register</h1>
      <form className="flex flex-col gap-4">
        {!success && (
          <div className="w-96 border border-gray-400 rounded-lg flex items-center">
            <img src={EmailIcon} alt="" className="p-2" />
            <input
              type="text"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Email"
              className="w-full py-2 px-4 outline-none"
            />
          </div>
        )}
        {success && (
          <div className="relative w-96 border border-gray-400 rounded-lg flex items-center">
            <img src={LockIcon} alt="" className="p-2" />
            <input
              onChange={(e) => setData({ ...data, otp: e.target.value })}
              placeholder="OTP"
              className="w-full py-2 px-4 outline-none"
            />
          </div>
        )}

        <div className="w-96">
          <button
            onClick={(e) => (success ? handleLogin(e) : handleRegister(e))}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
          >
            {isLoading && <img src={Rolling} className="animate-spin mr-2" />}
            {success ? "Login" : "Get Otp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
