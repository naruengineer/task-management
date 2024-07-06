import {
  FaRegCheckSquare,
  FaRegClock,
  FaTasks,
  FaCalendarAlt,
} from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import NavItem from "./NavItem/NavItem";

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavList = () => {
  const navlist: NavItemType[] = [
    {
      id: 1,
      label: "All Task",
      link: "/",
      icon: <FaTasks className="size-5" />,
    },
    {
      id: 2,
      label: "Completed Tasks",
      link: "/completed",
      icon: <FaRegCheckSquare className="size-5" color="green" />,
    },
    {
      id: 3,
      label: "Incompleted Tasks",
      link: "/incompleted",
      icon: <FaRegSquareCheck className="size-5" color="red" />,
    },
    {
      id: 4,
      label: "Expire Tasks",
      link: "/expire",
      icon: <FaRegClock className="size-5" />,
    },
    {
      id: 5,
      label: "Calendar",
      link: "/calendar",
      icon: <FaCalendarAlt className="size-5" />,
    },
  ];
  return (
    <div className="mt-20 font-bold">
      {navlist.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          link={item.link}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default NavList;
