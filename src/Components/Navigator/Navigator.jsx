"use client";

import { NAV_LINKS } from "@/Data/staticData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgIcon from "../Shared/SvgIcon";
import s from "./Navigator.module.scss";

const Navigator = () => {
  return (
    <nav className={s.nav}>
      {NAV_LINKS.map(({ id, name, path, iconName }) => {
        const currentPath = usePathname();
        const activeLink = path === currentPath ? s.active : "";

        return (
          <Link href={path} key={id} className={activeLink}>
            <SvgIcon name={iconName} />
            <span>{name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigator;
