"use client";

import { NAV_LINKS } from "@/Data/staticData";
import Link from "next/link";
import SvgIcon from "../Shared/SvgIcon";
import s from "./Navigator.module.scss";

const Navigator = () => {
  return (
    <nav className={s.nav}>
      {NAV_LINKS.map(({ id, name, path, iconName }) => (
        <Link href={path} key={id}>
          <SvgIcon name={iconName} />
          <span>{name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigator;
