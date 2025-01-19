"use client";

import { NAV_LINKS } from "@/Data/staticData";
import s from "./Navigator.module.scss";
import NavLink from "./NavLink/NavLink";

const Navigator = () => {
  return (
    <nav className={s.nav}>
      {NAV_LINKS.map((linkData) => (
        <NavLink {...linkData} key={linkData.id} />
      ))}
    </nav>
  );
};

export default Navigator;
