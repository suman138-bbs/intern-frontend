import { NavLink, Outlet, useNavigate, useRoutes } from "react-router-dom";
import { Suspense, useContext, useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";

import Dashboard from "../../components/dashboard";
import Analytics from "../../components/analytics";
import Settings from "../../components/settings";
import axios from "../../api/axios";
import Logo from "../../assets/codesandbox.svg";
import BoardIcon from "../../assets/board.svg";
import DataBaseIcon from "../../assets/database.svg";
import SettingIcon from "../../assets/settings.svg";
import LogoutIcon from "../../assets/Logout.svg";
import { CoinContext } from "../../context/count.contex";

const Layout = () => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);

  const navigation = [
    {
      name: "Board",
      href: "dashboard",
      src: BoardIcon,
    },
    {
      name: "Analytics",
      href: "analytics",
      src: DataBaseIcon,
    },
    {
      name: "Settings",
      href: "settings",
      src: SettingIcon,
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      navigate("/auth/register");
    } catch (error) {
      console.log("ERROR");
    }
  };

  const handleSetLogOut = () => {
    setIsLogout(!isLogout);
  };
  const { coin, setCoin } = useContext(CoinContext);
  useEffect(() => {
    const getAvilableCoin = async () => {
      const res = await axios.get("/app/get-coins");

      setCoin(res.data.coins);
    };

    getAvilableCoin();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen relative overflow-x-hidden">
      <div className="flex  justify-between items-center px-11 py-5 bg-gray-100">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-6 h-6" />
          <h3 className="text-xl font-semibold">int job</h3>
        </div>

        <nav className="flex gap-10">
          {navigation.map((nav) => (
            <NavLink
              to={nav.href}
              key={nav.href}
              activeClassName="bg-gray-200 text-gray-800"
              className="flex items-center space-x-2 p-2 rounded-md transition-colors duration-300"
            >
              <img src={nav.src} alt="" className="w-6 h-6" />
              <span>{nav.name}</span>
            </NavLink>
          ))}
        </nav>
        <div>
          <p>Avilable Coin: {coin}</p>
        </div>
        <button
          onClick={handleSetLogOut}
          className="flex items-center space-x-2 text-red-600 font-semibold transition-colors duration-300 hover:text-red-800 focus:outline-none"
        >
          <img src={LogoutIcon} alt="" className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
      <div className="flex flex-col  items-center justify-center  w-full bg-white p-6">
        <Outlet />
      </div>
      {isLogout && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg space-y-4">
            <h4 className="text-lg font-semibold">
              Are you sure you want to Logout?
            </h4>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleSetLogOut}
                className="flex-1 px-4 py-2 border border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-100 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PrivateLayout = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <Suspense fallback={<SyncLoader />}>{routing}</Suspense>;
};

export default PrivateLayout;
