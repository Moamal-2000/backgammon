"use client";

import { NAV_LINKS } from "@/Data/staticData";
import Link from "next/link";
import s from "./Navigator.module.scss";

const Navigator = () => {
  return (
    <nav className={s.nav}>
      {NAV_LINKS.map(({ id, name, path }) => (
        <Link href={path} key={id}>
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigator;
