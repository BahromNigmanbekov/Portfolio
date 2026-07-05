import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactCard from '../ContactCard/ContactCard';
import { FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  { icon: FaGithub, name: 'GitHub', handle: '@BahromNigmanbekov', link: 'https://github.com/BahromNigmanbekov', copyValue: 'BahromNigmanbekov', bgFrom: '#333333', bgTo: '#0d1117' },
  { icon: FaLinkedin, name: 'LinkedIn', handle: 'Bahrom Nigmanbekov', link: 'https://linkedin.com/in/bahrom-nigmanbekov', copyValue: 'Bahrom Nigmanbekov', bgFrom: '#0A66C2', bgTo: '#004182' },
  { icon: SiGmail, name: 'Gmail', handle: 'bahromnigmanbekov@gmail.com', link: 'mailto:bahrom.nigmanbekov@gmail.com', copyValue: 'bahrom.nigmanbekov@gmail.com', bgFrom: '#EA4335', bgTo: '#C5221F' },
  { icon: FaTelegramPlane, name: 'Telegram', handle: '@n1gmnbkv', link: 'https://t.me/n1gmnbkv', copyValue: '@n1gmnbkv', bgFrom: '#26A5E4', bgTo: '#1088C4' },
];

const animationOrder = [3, 2, 1, 0];
const lineColors = ['', '', '', ''];
const startYOffsets = [30, 190, 80, 240];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildMessyPath(startX, startY, endX, endY, seed, strength) {
  const rand = seededRandom(seed * 97 + 13);
  const segments = 4;
  const dx = (endX - startX) / segments;
  const dy = (endY - startY) / segments;

  let d = `M${startX},${startY}`;
  let prevX = startX;
  let prevY = startY;

  for (let i = 1; i <= segments; i++) {
    const targetX = startX + dx * i;
    const targetY = startY + dy * i;

    const jitter1 = (rand() - 0.5) * strength * 0.4;
    const jitter2 = (rand() - 0.5) * strength * 0.2;

    const c1x = prevX + dx * 0.5 + jitter1;
    const c1y = prevY + dy * 0.5 + jitter2;
    const c2x = prevX + dx * 0.5 + jitter2;
    const c2y = prevY + dy * 0.5 + jitter1;

    d += ` C${c1x},${c1y} ${c2x},${c2y} ${targetX},${targetY}`;
    prevX = targetX;
    prevY = targetY;
  }

  return d;
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const cardRefs = useRef([]);
  const [dims, setDims] = useState({ w: 1000, h: 400 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function measure() {
      const rect = section.getBoundingClientRect();
      setDims({ w: rect.width, h: rect.height });
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const sectionRect = section.getBoundingClientRect();

        const paths = cardRefs.current.map((card, i) => {
          if (!card) return null;
          const cardRect = card.getBoundingClientRect();
          const startX = sectionRect.width;
          const endX = cardRect.left - sectionRect.left + cardRect.width / 2;
          const endY = cardRect.bottom - sectionRect.top - 8;
          const strength = 90 + i * 25;
          return buildMessyPath(startX, startYOffsets[i], endX, endY, i + 1, strength);
        });

        lineRefs.current.forEach((line, i) => {
          if (line && paths[i]) line.setAttribute('d', paths[i]);
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 10%',
            scrub: 1.5,
          },
        });

        gsap.set(cardRefs.current, { opacity: 0, x: 100 });

        animationOrder.forEach((idx, step) => {
          const line = lineRefs.current[idx];
          const card = cardRefs.current[idx];
          if (!line || !card) return;
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(line, { strokeDashoffset: 0, duration: 1.3, ease: 'power1.inOut' }, step === 0 ? 0 : '-=0.3');
          tl.to(card, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.5');
        });

        tl.set(cardRefs.current, { opacity: 1, x: 0 });

        return () => gsap.set(cardRefs.current, { clearProps: 'opacity,x' });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set(cardRefs.current, { opacity: 0, y: 30 });
        gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1,
          },
        });
        return () => gsap.set(cardRefs.current, { clearProps: 'opacity,y' });
      });
    }, sectionRef);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full py-20 md:py-28 overflow-hidden ">
      {/* Dumaloq yaltiraydigan nuqtali fon olib tashlandi */}

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        preserveAspectRatio="none"
      >
        {contacts.map((_, i) => (
          <path
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            fill="none"
            stroke={lineColors[i]}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 md:mb-20">
          <span className="text-orange-600 text-xs md:text-sm font-bold uppercase tracking-[0.2em] block mb-3">
            Get in touch
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Let's connect
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contacts.map((c, i) => (
            <div key={i} ref={(el) => (cardRefs.current[i] = el)}>
              <ContactCard {...c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}