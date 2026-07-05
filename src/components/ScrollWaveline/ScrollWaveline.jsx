import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

// Silliq chiziq hosil qiluvchi algoritm (faqat kerakli yirik nuqtalar uchun)
function catmullRom2bezier(points) {
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

// Siz chizgan qizil chiziqlar kabi KATTA va SILLIQ to'lqin yasash
function generateBigWave(width, height, isRightSide) {
  const pts = [];
  
  // 1. BOSH TUGUN: Aynan ekranning cheti (Chap=0, O'ng=width)
  const startX = isRightSide ? width : 0;
  pts.push({ x: startX, y: 10 }); // Sahifaning eng tepa qismi

  // 2. O'RTA TUGUNLAR: Siz chizgandek bir-birini kesib o'tishi uchun katta burilishlar
  const direction = isRightSide ? -1 : 1;
  
  // Chiziq sahifaning 1/3 qismida ichkariga kiradi
  pts.push({ 
    x: startX + (direction * width * 0.7), 
    y: height * 0.33 
  });
  
  // Chiziq sahifaning 2/3 qismida orqaga qaytadi
  pts.push({ 
    x: startX + (direction * width * 0.2), 
    y: height * 0.66 
  });

  // 3. OXIRGI TUGUN: Yana ekranning chetiga borib taqaladi
  pts.push({ x: startX, y: height }); 

  return catmullRom2bezier(pts);
}

export default function ScrollWaveline({ strokeWidth = 15 }) {
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  
  // Uzunliklarni saqlash
  const [lengths, setLengths] = useState({ left: 0, right: 0 });
  const pathLeftRef = useRef(null);
  const pathRightRef = useRef(null);

  // Ekranni aniq o'lchash (vw/vh muammosiz)
  useLayoutEffect(() => {
    function measure() {
      setDims({ 
        width: window.innerWidth, // Butun oyna kengligi
        height: document.documentElement.scrollHeight // Butun sahifa uzunligi
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Chiziqlar yo'lini generatsiya qilish
  const pathLeft = useMemo(() => dims.width ? generateBigWave(dims.width, dims.height, false) : "", [dims]);
  const pathRight = useMemo(() => dims.width ? generateBigWave(dims.width, dims.height, true) : "", [dims]);

  // SVG chizilgandan keyin haqiqiy uzunligini o'lchab olish (animatsiya uzilib qolmasligi uchun)
  useLayoutEffect(() => {
    if (pathLeftRef.current && pathRightRef.current && pathLeft && pathRight) {
      setLengths({ 
        left: pathLeftRef.current.getTotalLength(), 
        right: pathRightRef.current.getTotalLength() 
      });
    }
  }, [pathLeft, pathRight, dims]);

  // Scroll hodisasini ulash
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll <= 0) {
        setProgress(1);
      } else {
        setProgress(Math.min(Math.max(scrollY / maxScroll, 0), 1));
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Sahifa yuklanganda to'g'rilash
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dims.height]);

  if (!dims.width) return null;

  return (
    // position: absolute va top: 0, left: 0 uni aynan burchakka yopishtiradi
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: dims.height, pointerEvents: "none", zIndex: -1, overflow: "hidden" }}>
      <svg width={dims.width} height={dims.height} style={{ display: "block" }}>
        
        {/* CHAP chiziq */}
        <path 
          ref={pathLeftRef} 
          d={pathLeft} 
          fill="none" 
          stroke="#ff6a1a" // Apelsin rang
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          style={{ 
            strokeDasharray: lengths.left, 
            strokeDashoffset: lengths.left * (1 - progress) 
          }} 
        />
        
        {/* O'NG chiziq */}
        <path 
          ref={pathRightRef} 
          d={pathRight} 
          fill="none" 
          stroke="#7a1c08" // To'q jigarrang
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          style={{ 
            strokeDasharray: lengths.right, 
            strokeDashoffset: lengths.right * (5 - progress) 
          }} 
        />
      </svg>
    </div>
  );
}