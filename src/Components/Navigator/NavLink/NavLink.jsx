"use client";

import SvgIcon from "@/Components/Shared/SvgIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./NavLink.module.scss";

const NavLink = ({ path, name, iconName }) => {
  const currentPath = usePathname();
  const activeLink = path === currentPath ? s.active : "";

  return (
    <Link href={path} className={`${s.link} ${activeLink}`}>
      <SvgIcon name={iconName} />
      <span>{name}</span>
    </Link>
  );
};

export default NavLink;
