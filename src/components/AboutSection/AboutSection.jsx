import './AboutSection.css';

const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'];

// Letters komponenti harflarni alohida span ichiga oladi
function Letters({ text }) {
  return (
    <>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={char === ' ' ? 'mr-[0.25em]' : 'letter inline-block'}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export default function AboutSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 bg-whitegit ">
      <div className="max-w-4xl mx-auto">
        <span className="text-orange-600 text-sm font-bold uppercase tracking-[0.2em] block mb-4">
          About me
        </span>

        <h1 className="font-extrabold leading-tight text-4xl md:text-7xl text-neutral-900 mb-10">
          <Letters text="Bahrom Nigmanbekov" />
        </h1>

        <div className="space-y-6 text-neutral-700">
          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            <Letters text="I'm a 16-year-old frontend developer from Uzbekistan." />
          </p>

          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            <Letters text="Currently working as an Intern Frontend Developer at Mars IT School, where I've been studying and working for 2 years." />
          </p>

          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            <Letters text="I build fast, clean and modern web interfaces, and I love turning ideas into real, working products." />
          </p>
        </div>

        <div className="mt-12">
          <span className="text-neutral-400 text-sm font-bold uppercase tracking-[0.15em] block mb-4">
            Tech I work with
          </span>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2 rounded-full bg-orange-50 text-orange-700 font-bold text-sm border border-orange-100 hover:border-orange-300 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}