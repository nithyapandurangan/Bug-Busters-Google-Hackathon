import { motion } from "framer-motion";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { isAdmin, logout, ToggleAdminMode } from "../../utils/functions";
import { Avatar } from "../Assets"; 

const DropDown = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const [{ }, dispatch] = useStateValue();

  const menuItems = [
    ...(isAdmin(user) ? [{
      label: "Administrator",
      icon: <RiAdminLine />,
      action: () => ToggleAdminMode(dispatch, true),
      link: "/admin",
      color: "text-WGSDark"
    }] : []),
    {
      label: "Profile",
      icon: <FaUserCog />,
      link: "/profile",
      color: "text-textColor"
    },
    {
      label: "Logout",
      icon: <MdLogout />,
      action: () => logout(user, dispatch, navigate),
      color: "text-red-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="hidden group-hover:flex w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 flex-col absolute right-0 top-16 overflow-hidden z-50"
    >
      {/* User Info Header */}
      <div className="bg-gradient-to-r from-WGS to-WGSDark p-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || Avatar }
            alt="Profile"
            className="w-12 h-12 rounded-xl border-2 border-white/30"
          />
          <div>
            <p className="font-semibold text-white text-sm">
              {user?.displayName || "User"}
            </p>
            <p className="text-white/80 text-xs">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 4 }}
            className="group/item"
          >
            {item.link ? (
              <Link
                to={item.link}
                onClick={item.action}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${item.color}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ) : (
              <div
                onClick={item.action}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${item.color}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DropDown;