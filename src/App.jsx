import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useMotionTemplate, useAnimate, useTransform } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowRight, Menu, X, FileText } from 'lucide-react';
// import { motion, useTransform, useScroll } from "framer-motion"; // Removido duplicado
// import { useRef } from "react"; // Removido duplicado

// --- DADOS DO PORTFÓLIO (em PT e EN) ---
const portfolioContent = {
  pt: {
    name: "Richard Victor",
    headline: "Desenvolvedor de Software | Python | Backend | Inteligência Artificial",
    about: "Sou estudante de Análise e Desenvolvimento de Sistemas pela FACES Sorocaba, com experiência em liderança e gestão de pessoas no setor de varejo. Atualmente estudo Python, Backend, APIs e Inteligência Artificial, com o objetivo de atuar na área de tecnologia, desenvolvendo soluções modernas, escaláveis e com foco em boas práticas. Tenho interesse em construir um portfólio sólido de projetos e ingressar futuramente no mercado internacional de TI.",
    contactButton: "Entre em Contato",
    nav: { about: "Sobre", projects: "Projetos", contact: "Contato" },
    sections: {
      about: "Sobre Mim",
      skills: "Habilidades Principais",
      projects: "Projetos Recentes",
      contact: "Vamos Conversar!",
    },
    // ALTERAÇÃO 1: Lista de habilidades movida para cá
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "APIs REST" },
      { name: "Git" },
      { name: "Inglês (Básico)" }
    ],
    contactText: "Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato através do e-mail ou das minhas redes.",
    projects: [
      {
        title: "QuebraDica Sorocaba",
        description: "Portal colaborativo para moradores de Sorocaba compartilharem dicas úteis da comunidade (comércio, serviços, lazer).",
        linkText: "Ver no GitHub",
        link: "https://github.com/rvalves10",
        demoLink: "https://rvalves10.github.io/Quebra-Dica-Sorocaba/", // Exemplo de demo
        tags: ["HTML", "CSS", "IA"]
      },
      {
        title: "Novo Projeto em Andamento",
        description: "Um novo projeto de backend está sendo desenvolvido. Mais detalhes em breve!",
        linkText: "Em Breve",
        link: "",
        tags: ["Em Breve"]
      },
      {
        title: "Novo Projeto em Andamento",
        description: "Explorando novas tecnologias para criar soluções inovadoras. Volte em breve para mais atualizações.",
        linkText: "Em Breve",
        link: "",
        tags: ["Em Breve"]
      },
    ],
    footer: "Todos os direitos reservados."
  },
  en: {
    name: "Richard Victor",
    headline: "Software Developer | Python | Backend",
    about: "I am a student of Systems Analysis and Development at FACES Sorocaba, with experience in leadership and people management in the retail sector. I am currently studying Python, Backend, APIs, and Artificial Intelligence, aiming to work in the technology field, developing modern, scalable solutions with a focus on best practices. I am interested in building a solid project portfolio and eventually entering the international IT market.",
    contactButton: "Get in Touch",
    nav: { about: "About", projects: "Projects", contact: "Contact" },
    sections: {
      about: "About Me",
      skills: "Core Skills",
      projects: "Recent Projects",
      contact: "Let's Talk!",
    },
    // ALTERAÇÃO 1: Lista de habilidades traduzida e movida para cá
    skills: [
        { name: "Python" },
        { name: "JavaScript" },
        { name: "REST APIs" },
        { name: "Git" },
        { name: "English (Basic)" }
    ],
    contactText: "I'm always open to new opportunities and collaborations. Feel free to reach out via email or my social networks.",
    projects: [
      {
        title: "QuebraDica Sorocaba",
        description: "A collaborative portal for Sorocaba residents to share useful community tips (commerce, services, leisure).",
        linkText: "View on GitHub",
        link: "https://github.com/rvalves10",
        demoLink: "https://quebradica.vercel.app/", // Example demo
        tags: ["Python", "Flask", "HTML", "CSS", "JavaScript"]
      },
      {
        title: "New Project in Progress",
        description: "A new backend project is under development. More details coming soon!",
        linkText: "Coming Soon",
        link: "",
        tags: ["Backend", "Python", "API"]
      },
      {
        title: "New Project in Progress",
        description: "Exploring new technologies to create innovative solutions. Check back soon for more updates.",
        linkText: "Coming Soon",
        link: "",
        tags: ["AI", "Innovation"]
      },
    ],
    footer: "All rights reserved."
  }
};


// A constante 'skillsData' foi removida daqui.

// --- VARIANTES DE ANIMAÇÃO (Framer Motion) ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const menuContainerVariants = {
  open: { x: 0, transition: { type: "spring", stiffness: 120, damping: 20, staggerChildren: 0.1 } },
  closed: { x: "100%", transition: { type: "spring", stiffness: 120, damping: 20 } }
};

const menuItemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 50 }
};

// --- COMPONENTE MAGNÉTICO (usado no Hero) ---
const Magnetic = ({ children }) => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => { setPosition({ x: 0, y: 0 }); };

  const { x, y } = position;
  return (
    <motion.div onMouseMove={handleMouse} onMouseLeave={handleMouseLeave} ref={ref} animate={{ x, y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>
      {children}
    </motion.div>
  );
};

// --- COMPONENTE DE SELEÇÃO DE IDIOMA ---
const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1.5 rounded-full font-medium transition-colors ${language === "pt" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"}`}
        onClick={() => setLanguage("pt")}
      >
        PT
      </button>
      <button
        className={`px-3 py-1.5 rounded-full font-medium transition-colors ${language === "en" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
};


// --- COMPONENTES ---

const Header = ({ portfolioData, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: portfolioData.nav.about, id: "about" },
    { title: portfolioData.nav.projects, id: "projects" },
    { title: portfolioData.nav.contact, id: "contact" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/30 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-white tracking-wider" translate="no">{portfolioData.name.split(' ')[0]}</span>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-slate-300 hover:text-white transition-colors duration-300 text-lg">
                  {link.title}
                </button>
              ))}
            </nav>
            <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-50 relative">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
        </div>
      </div>
        {/* Mobile Menu */}
      <motion.div variants={menuContainerVariants} initial="closed" animate={isMenuOpen ? "open" : "closed"} className="md:hidden fixed top-0 right-0 h-screen w-3/4 bg-[#1a1a1a] p-8 pt-24 shadow-lg">
        <nav className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <motion.button key={link.id} variants={menuItemVariants} onClick={() => scrollToSection(link.id)} className="text-2xl text-left font-semibold text-slate-300 hover:text-white">
                {link.title}
              </motion.button>
            ))}
            <motion.div variants={menuItemVariants} className="pt-8">
              <LanguageToggle language={language} setLanguage={setLanguage} />
            </motion.div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

const HeroSection = ({ portfolioData, language }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-grid-white/[0.05]">
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight flex justify-center whitespace-nowrap tracking-tight"
          translate="no"
        >
          {portfolioData.name}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto flex justify-center"
          translate="no"
        >
          {portfolioData.headline}
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-8 inline-block"
        >
           <Magnetic>
             <motion.button
               onClick={scrollToContact}
               className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
               whileHover={{ scale: 1.06 }}
               whileTap={{ scale: 0.97 }}
             >
               {portfolioData.contactButton}
             </motion.button>
           </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};

// --- COMPONENTE DE TÍTULO DE SEÇÃO ---
const ShiftHighlightTitle = ({ children }) => {
  return (
    <motion.div variants={itemVariants} className="mb-16">
      <div className="relative w-fit mx-auto">
        <motion.h2 className="relative z-10 text-4xl font-bold text-white px-6 py-3">
          {children}
        </motion.h2>
        <motion.div
          className="absolute inset-0 bg-blue-600 rounded-lg"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: { scaleX: 1, originX: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }
          }}
        />
      </div>
    </motion.div>
  );
};

const AboutSection = ({ portfolioData }) => {
  return (
    <motion.section id="about" className="py-20 md:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
      <div className="container mx-auto px-6 flex flex-col items-center">
        <ShiftHighlightTitle>{portfolioData.sections.about}</ShiftHighlightTitle>
        <motion.div variants={itemVariants} className="max-w-5xl w-full mx-auto bg-slate-900/50 rounded-xl p-8 md:p-12 border border-slate-800 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 md:gap-12">
            <div className="flex-shrink-0">
               <img 
                 src="https://media.licdn.com/dms/image/v2/D4D03AQEFhXaU8Sd5Ig/profile-displayphoto-scale_200_200/B4DZmAh03KJMAY-/0/1758797977014?e=1764806400&v=beta&t=XUgaFBLdh_QLm4fQpvIHfQ8UqfpDnIW8LMTNNUsfo_E" 
                 alt="Foto de Richard Victor" 
                 className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-slate-800 shadow-lg" 
               />
            </div>
            <div className="flex-grow">
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {portfolioData.about}
              </p>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 text-center md:text-left">{portfolioData.sections.skills}</h3>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {/* ALTERAÇÃO 2: Mapeando "portfolioData.skills" que agora vem das props */}
                  {portfolioData.skills.map((skill) => (
                    <div key={skill.name} className="bg-slate-800/70 border border-slate-700 rounded-full px-4 py-2">
                      <span className="text-slate-300 font-medium text-sm" translate="no">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};


// --- CONSTANTES DE ANIMAÇÃO 3D ---
const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;


const TiltProjectCard = ({ project }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = (e.clientX - left) * ROTATION_RANGE;
    const mouseY = (e.clientY - top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rY);
    y.set(rX);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transformStyle: "preserve-3d", transform }} className="relative h-96 w-72 rounded-xl bg-slate-900 border border-slate-800">
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="absolute inset-4 flex flex-col justify-between rounded-xl bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm">
        <div className="flex-grow">
           <h3 style={{ transform: "translateZ(50px)" }} className="text-2xl font-bold text-white mb-2">{project.title}</h3>
           <p style={{ transform: "translateZ(40px)" }} className="text-slate-300 text-sm mb-4">{project.description}</p>
        </div>
        <div>
            <div className="mb-4">
              {project.tags.map(tag => (
                  <span key={tag} style={{ transform: "translateZ(30px)" }} className="inline-block bg-blue-600/50 text-blue-300 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div style={{ transform: "translateZ(20px)" }} className="flex gap-2">
              <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="font-semibold inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                {project.linkText} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="font-semibold inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                  Ver Demo <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ portfolioData }) => {
  return (
    <motion.section id="projects" className="py-20 md:py-32 bg-slate-950/40" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
      <div className="container mx-auto px-6 text-center">
        <ShiftHighlightTitle>{portfolioData.sections.projects}</ShiftHighlightTitle>
        <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16">
          {portfolioData.projects.map((project, index) => (
             <motion.div variants={itemVariants} key={index}>
               <TiltProjectCard project={project} />
             </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// --- COMPONENTES DA SEÇÃO DE CONTATO (ClipPath) ---
const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = { left: [BOTTOM_RIGHT_CLIP, NO_CLIP], bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP], top: [BOTTOM_RIGHT_CLIP, NO_CLIP], right: [TOP_LEFT_CLIP, NO_CLIP] };
const EXIT_KEYFRAMES = { left: [NO_CLIP, TOP_RIGHT_CLIP], bottom: [NO_CLIP, TOP_RIGHT_CLIP], top: [NO_CLIP, TOP_RIGHT_CLIP], right: [NO_CLIP, BOTTOM_LEFT_CLIP] };

const LinkBox = ({ Icon, href }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();
    const proximityToLeft = { proximity: Math.abs(box.left - e.clientX), side: "left" };
    const proximityToRight = { proximity: Math.abs(box.right - e.clientX), side: "right" };
    const proximityToTop = { proximity: Math.abs(box.top - e.clientY), side: "top" };
    const proximityToBottom = { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" };
    const sortedProximity = [proximityToLeft, proximityToRight, proximityToTop, proximityToBottom].sort((a, b) => a.proximity - b.proximity);
    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => { animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] }) };
  const handleMouseLeave = (e) => { animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] }) };

  return (
    <a href={href} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36" target="_blank" rel="noopener noreferrer">
      <Icon className="text-xl sm:text-3xl lg:text-4xl text-slate-400" />
      <div ref={scope} style={{ clipPath: BOTTOM_RIGHT_CLIP }} className="absolute inset-0 grid place-content-center bg-blue-600 text-white">
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};


const ContactSection = ({ portfolioData, language }) => {
  const socials = {
    linkedin: "https://linkedin.com/in/richard-victor-3611a5303",
    github: "https://github.com/rvalves10",
    email: "richardvic12@gmail.com",
    curriculo: "https://drive.google.com/file/d/1Nn_HjmO1F46gSMQ5RlgGBGoC23UfMgbc/view?usp=sharing",
  };
  return (
    <motion.section id="contact" className="py-20 md:py-32 bg-slate-950/40" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
      <div className="container mx-auto px-6 text-center">
        <ShiftHighlightTitle>{portfolioData.sections.contact}</ShiftHighlightTitle>
        <motion.p variants={itemVariants} className="text-slate-300 text-lg max-w-2xl mx-auto mb-12">{portfolioData.contactText}</motion.p>
        <motion.div variants={itemVariants} className="max-w-lg mx-auto border border-slate-800">
             <div className="grid grid-cols-4 divide-x divide-slate-800">
               <LinkBox Icon={Linkedin} href={socials.linkedin} />
               <LinkBox Icon={Github} href={socials.github} />
               <LinkBox Icon={Mail} href={`mailto:${socials.email}`} />
                <LinkBox Icon={FileText} href={socials.curriculo} />
             </div>
        </motion.div>
      </div>
    </motion.section>
  );
};


const Footer = ({ portfolioData }) => {
  return (
    <footer className="py-6 bg-slate-950">
      <div className="container mx-auto px-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} {portfolioData.name}. {portfolioData.footer}</p>
      </div>
    </footer>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [language, setLanguage] = useState('pt');
  // Debug: mostrar o idioma atual e o headline no console
  const portfolioData = portfolioContent[language];
  console.log("Idioma atual:", language, "| Headline:", portfolioData.headline);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-slate-950 text-white font-sans antialiased">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" style={{ scaleX }} />
      <Header portfolioData={portfolioData} language={language} setLanguage={setLanguage} />
  <main key={language} translate="no">
        <HeroSection portfolioData={portfolioData} />
        <AboutSection portfolioData={portfolioData} />
        <ProjectsSection portfolioData={portfolioData} />
        <ContactSection portfolioData={portfolioData} />
      </main>
      <Footer portfolioData={portfolioData} />
    </div>
  );
}