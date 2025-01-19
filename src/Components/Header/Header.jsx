"use client";

import s from "./Header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <h1>Backgammon</h1>

      <div className={s.shape}>
        <div className={s.line} />
      </div>

      <p>Master one of the oldest and most strategic board games in history</p>
    </header>
  );
};

export default Header;
