import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../ProjectCard/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { image: 'https://i.pinimg.com/736x/cf/3d/f0/cf3df0175c036f4c46d94c20800093ff.jpg', link: 'https://site1.example.com', docNumber: '01' },
  { image: 'https://i.pinimg.com/736x/cf/3d/f0/cf3df0175c036f4c46d94c20800093ff.jpg', link: 'https://site2.example.com', docNumber: '02' },
  { image: 'https://i.pinimg.com/736x/cf/3d/f0/cf3df0175c036f4c46d94c20800093ff.jpg', link: 'https://site3.example.com', docNumber: '03' },
];

const lineColors = ['#F97316', '#C2410C', '#7C2D12'];
// Har bir chiziq ekranning chap chetida boshlanadigan Y nuqtasi — tartibsiz ko'rinish uchun har xil
const startYOffsets = [40, 220, 90];

// Har doim bir xil chiqadigan, lekin "qo'lda chizilgandek" tartibsiz egri chiziq
function buildMessyPath(startX, startY, endX, endY, seed) {
  const midX1 = startX + (endX - startX) * 0.35 + Math.sin(seed) * 60;
  const midY1 = startY + (endY - startY) * 0.25 + Math.cos(seed * 1.7) * 50;
  const midX2 = startX + (endX - startX) * 0.65 + Math.sin(seed * 2.3) * 70;
  const midY2 = startY + (endY - startY) * 0.7 + Math.cos(seed * 0.9) * 40;
  return `M${startX},${startY} C${midX1},${midY1} ${midX2},${midY2} ${endX},${endY}`;
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const cardRefs = useRef([]);
  const [dims, setDims] = useState({ w: 1000, h: 600 });

  useEffect(() => {
    function measure() {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) setDims({ w: rect.width, h: rect.height });
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionRect = section.getBoundingClientRect();

    // Har bir chiziqning yo'lini o'ziga tegishli kartaning haqiqiy joylashuviga qarab hisoblaymiz
    const paths = cardRefs.current.map((card, i) => {
      if (!card) return null;
      const cardRect = card.getBoundingClientRect();
      const endX = cardRect.left - sectionRect.left + cardRect.width / 2;
      const endY = cardRect.top - sectionRect.top + 8; // karta tepasiga yetganda to'xtaydi
      return buildMessyPath(0, startYOffsets[i % startYOffsets.length], endX, endY, i + 1);
    });

    lineRefs.current.forEach((line, i) => {
      if (line && paths[i]) line.setAttribute('d', paths[i]);
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 15%',
          scrub: 1,
        },
      });

      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        // 1) chiziq chiziladi
        tl.to(line, { strokeDashoffset: 0, duration: 1, ease: 'none' });

        // 2) karta — chiziq TO'LIQ to'xtashidan biroz OLDIN, silliq chiqadi (overlap)
        tl.fromTo(
          cardRefs.current[i],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
        // 3) keyingi chiziq shu tugagandan keyin avtomatik ketma-ket boshlanadi
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [dims]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 flex items-center justify-center overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
      >
        {projects.map((_, i) => (
          <path
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            fill="none"
            stroke={lineColors[i % lineColors.length]}
            strokeWidth="10"
            strokeLinecap="round"
          />
        ))}
      </svg>

      <div className="relative z-10 flex flex-wrap gap-10 justify-center">
        {projects.map((p, i) => (
          <div key={i} ref={(el) => (cardRefs.current[i] = el)}>
            <ProjectCard {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}