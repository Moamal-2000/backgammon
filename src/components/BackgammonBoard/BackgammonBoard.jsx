"use client";

import s from "./BackgammonBoard.module.scss";

const BackgammonBoard = () => {
  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <div className={`${s.place} ${s.black}`}>
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
          </div>

          <div className={`${s.place} ${s.white}`}></div>
          <div className={`${s.place} ${s.black}`}></div>
          <div className={`${s.place} ${s.white}`}></div>

          <div className={`${s.place} ${s.black}`}>
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
          </div>

          <div className={`${s.place} ${s.white}`}></div>
        </div>

        <div className={s.bottom}>
          <div className={`${s.place} ${s.white}`}>
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
          </div>
          <div className={`${s.place} ${s.black}`}></div>
          <div className={`${s.place} ${s.white}`}></div>
          <div className={`${s.place} ${s.black}`}></div>

          <div className={`${s.place} ${s.white}`}>
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
          </div>

          <div className={`${s.place} ${s.black}`}></div>
        </div>
      </div>

      <div className={s.rightTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <div className={`${s.place} ${s.black}`}>
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
          </div>

          <div className={`${s.place} ${s.white}`}></div>
          <div className={`${s.place} ${s.black}`}></div>
          <div className={`${s.place} ${s.white}`}></div>
          <div className={`${s.place} ${s.black}`}></div>

          <div className={`${s.place} ${s.white}`}>
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
          </div>
        </div>

        <div className={s.bottom}>
          <div className={`${s.place} ${s.white}`}>
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
            <div className={`${s.piece} ${s.white}`} />
          </div>

          <div className={`${s.place} ${s.black}`}></div>
          <div className={`${s.place} ${s.white}`}></div>
          <div className={`${s.place} ${s.black}`}></div>
          <div className={`${s.place} ${s.white}`}></div>

          <div className={`${s.place} ${s.black}`}>
            <div className={`${s.piece} ${s.black}`} />
            <div className={`${s.piece} ${s.black}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgammonBoard;
