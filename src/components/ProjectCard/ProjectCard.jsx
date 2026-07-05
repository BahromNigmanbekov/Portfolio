export default function ProjectCard({ image, title = "View Collection", docNumber = "05", docLabel = "Doc", link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-[300px] h-[380px] rounded-[24px] overflow-hidden bg-neutral-900"
    >
      {/* Rasm — hoverda biroz yuqoriga siljiydi */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover
                   transition-transform duration-700 ease-out
                   group-hover:-translate-y-4 group-hover:scale-105"
      />

      {/* Orange panel — shaffof, TEKIS to'g'ri chiziq bilan, yuqori qismi shaffof qoladi */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-orange-600/70 backdrop-blur-sm flex flex-col justify-between p-6">
        <p className="text-white text-2xl font-semibold leading-tight">
          {title}
        </p>
        <div className="flex items-end gap-2">
          <span className="text-white text-4xl font-bold">{docNumber}</span>
          <span className="text-white/80 text-sm mb-1">{docLabel}</span>
        </div>
      </div>
    </a>
  );
}