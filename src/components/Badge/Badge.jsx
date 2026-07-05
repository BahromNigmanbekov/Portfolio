import React, { useEffect, useRef } from 'react';
import { initBadgeAnimation } from './badgeAnimation';

const Badge = ({
  photoSrc,
  name = 'Bahrom Nigmanbekov',
  title = 'Frontend Developer',
  site = 'https://marsit.uz',
  bgWord = 'Portfolio', // the big word shown behind the badge
}) => {
  const rigRef = useRef(null);     // strap + hardware + card — rotates together
  const strapRef = useRef(null);
  const bgRef = useRef(null);      // text that reveals behind the badge after it lands
  const lineRef1 = useRef(null);   // orange line, draws left -> right
  const lineRef2 = useRef(null);   // deep-orange line, draws right -> left

  useEffect(() => {
    const tl = initBadgeAnimation(
      rigRef.current,
      strapRef.current,
      bgRef.current,
      lineRef1.current,
      lineRef2.current
    );
    return () => tl && tl.kill && tl.kill();
  }, []);

  return (
    // relative so the background text can sit behind the badge (z-0 vs z-10)
    <div className="relative flex justify-center items-start min-h-screen bg-white overflow-hidden pb-[140px]">

      {/* TWO INTERLOCKING ORANGE LINES — one draws left->right, one draws right->left, behind the text */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[260px] w-full pointer-events-none" style={{ zIndex: 0 }}>
        <svg viewBox="0 -40 1000 300" preserveAspectRatio="none" className="w-full h-full">
          {/* vivid orange — draws left to right */}
          <path
            ref={lineRef1}
            d="M0,150 C920,60 260,20 360,80 C440,125 470,155 500,140 C730,125 570,55 650,25 C760,-15 900,55 1000,150"
            fill="none"
            stroke="#ff5a1f"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.95"
          />
          {/* deep burnt orange — draws right to left, interlocking with the first */}
          <path
            ref={lineRef2}
            d="M1000,90 C880,180 740,220 640,160 C560,115 530,85 500,100 C470,115 430,185 350,215 C240,255 100,185 0,90"
            fill="none"
            stroke="#9a3412"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* BACKGROUND TEXT — hidden at first, revealed once the badge finishes swinging */}
      <div
        ref={bgRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none select-none px-6"
        style={{ zIndex: 2 }}
      >
        <h2
          className="font-black uppercase leading-[0.9] text-[#0a0a0a]"
          style={{ fontSize: 'clamp(68px, 11vw, 330px)', letterSpacing: '-0.02em' }}
        >
          {bgWord}
        </h2>
        <p
          className="mt-3 font-medium text-[#f24405] uppercase tracking-[0.25em]"
          style={{ fontSize: 'clamp(14px, 1.8vw, 22px)' }}
        >
          {name}
        </p>
      </div>

      {/* BADGE RIG — sits above the background text */}
      <div ref={rigRef} className="relative z-10 origin-top flex flex-col items-center select-none">

        {/* LANYARD STRAP — touches the very top of the screen, no gap */}
        <div
          ref={strapRef}
          className="w-5 h-[110px] relative"
          style={{
            background:
              'linear-gradient(90deg, #050505 0%, #101010 12%, #1c1c1c 28%, #0c0c0c 45%, #050505 60%, #141414 78%, #060606 100%)',
            boxShadow:
              'inset 3px 0 4px rgba(255,255,255,0.06), inset -3px 0 6px rgba(0,0,0,0.9), 2px 0 10px rgba(0,0,0,0.25)',
          }}
        >
          {/* woven fabric ridges */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(255,255,255,0.05) 6px, rgba(255,255,255,0.05) 7px)',
            }}
          />
          {/* soft center sheen so it reads as fabric, not flat plastic */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] opacity-20"
            style={{ background: 'linear-gradient(90deg, transparent, #fff, transparent)' }}
          />
        </div>

        {/* METAL HARDWARE: plastic slider + swivel clip + hook */}
        <div className="flex flex-col items-center -mt-1 z-20">
          {/* black plastic cord-lock slider */}
          <div
            className="w-8 h-9 rounded-[4px]"
            style={{
              background: 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 35%, #0a0a0a 70%, #2b2b2b 100%)',
              boxShadow: '0 3px 6px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.15)',
            }}
          />
          {/* nickel swivel clip body */}
          <div
            className="w-9 h-12 -mt-[2px] rounded-t-sm rounded-b-[10px]"
            style={{
              background:
                'linear-gradient(115deg, #9aa1a7 0%, #f3f6f8 18%, #c7cdd1 34%, #6c7278 50%, #eef1f3 66%, #8b9197 82%, #d8dcde 100%)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.6)',
            }}
          />
          {/* the curved hook end that plugs into the badge grommet */}
          <div
            className="w-5 h-7 -mt-[3px]"
            style={{
              background: 'linear-gradient(160deg, #eef1f3 0%, #8b9197 45%, #f3f6f8 65%, #6c7278 100%)',
              borderRadius: '2px 2px 50% 50% / 2px 2px 70% 70%',
              boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
            }}
          />
        </div>

        {/* BADGE CARD */}
        <div
          className="w-[360px] h-[520px] bg-[#0a0a0a] rounded-[26px] p-7 -mt-4 relative flex flex-col"
          style={{
            boxShadow:
              '0 45px 70px -20px rgba(0,0,0,0.75), 0 10px 25px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* grommet hole where the hook plugs in */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-3.5 h-3.5 rounded-full bg-black border border-zinc-700/80 shadow-inner z-30" />

          {/* PHOTO + ACCENT BLOCK — fixed-height block so nothing below it ever overlaps */}
          <div className="relative w-full flex-none" style={{ height: 300 }}>
            {/* orange accent panel, taller than photo, peeks out beneath it */}
            <div
              className="absolute top-0 right-0 w-[36%] rounded-sm"
              style={{
                height: 340,
                background: 'linear-gradient(160deg, #ff5a1f 0%, #f24405 55%, #d63a03 100%)',
              }}
            />

            {/* photo — drop the person's own photo in via the `photoSrc` prop */}
            <div className="relative w-[92%] h-[290px] overflow-hidden rounded-sm bg-zinc-300">
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 font-semibold text-sm tracking-wide">
                  PHOTO
                </div>
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25)' }}
              />
            </div>
          </div>

          {/* NAME + TITLE */}
          <div className="mt-6 text-white flex-none">
            <h1 className="text-[30px] leading-tight font-bold tracking-tight">{name}</h1>
            <p className="text-zinc-400 text-lg mt-1">{title}</p>
          </div>

          {/* spacer pushes footer to the bottom no matter what */}
          <div className="flex-1" />

          {/* FOOTER: logo mark + url — separated row, never overlaps the title */}
          <div className="flex-none flex items-center justify-between">
            <svg width="38" height="38" viewBox="0 0 34 34" fill="none">
              <path
                d="M4 17c0-7 5-12.5 9-12.5S17 10 17 17s4.5 12.5 8.5 12.5S30 24 30 17"
                stroke="#f24405"
                strokeWidth="3.4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M4 17c0 7 5 12.5 9 12.5S17 24 17 17S21.5 4.5 25.5 4.5S30 10 30 17"
                stroke="#f24405"
                strokeWidth="3.4"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />
            </svg>
            <p className="text-zinc-300 text-sm font-light">{site}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badge;