import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Github, Linkedin, Facebook, Mail, Phone, MapPin,
  Download, ExternalLink, FileText, Menu, X, ChevronDown, Sparkles,
  Activity, BrainCircuit, Boxes, CircuitBoard, Code2, Cpu, Gauge, Radio, Waves, Zap
} from "lucide-react";
import portfolioData from "./data/portfolioData";

const nav = ["Home","About","Education","Experience","Skills","Projects","Research","Achievements","Contact"];
const categories = ["All","Electronics","Power","DSP","AI/ML","Robotics","Simulation","Web","Research"];

function safeLink(value) {
  return value && !value.startsWith("[") ? value : "";
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section-shell">
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

const toolLogos = {
  MATLAB: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg",
  Simulink: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg",
  AutoCAD: "https://cdn.simpleicons.org/autodesk",
  "PCB Design": "https://cdn.simpleicons.org/kicad",
  "Communication Lab": "https://cdn.simpleicons.org/gnubash",
  "DLD Expert": "https://cdn.simpleicons.org/intel",
  "ECG Classification": "",
  "Spiking Neural Networks": "",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/ffffff",
  "EasyEDA / KiCad": "https://cdn.simpleicons.org/kicad",
  "Power System Analysis": ""
};

const toolIcons = {
  MATLAB: Gauge,
  Simulink: CircuitBoard,
  AutoCAD: Boxes,
  "PCB Design": CircuitBoard,
  "Communication Lab": Radio,
  "DLD Expert": Cpu,
  "ECG Classification": Activity,
  "Spiking Neural Networks": BrainCircuit,
  Python: Code2,
  "Next.js": Code2,
  "EasyEDA / KiCad": CircuitBoard,
  "Power System Analysis": Waves
};

function Toolbox() {
  const [rotation, setRotation] = useState(0);
  const dragStart = useRef(null);
  useEffect(() => {
    const timer = setInterval(() => setRotation((value) => value + 0.35), 40);
    return () => clearInterval(timer);
  }, []);
  const startDrag = (event) => { dragStart.current = event.clientX; event.currentTarget.setPointerCapture?.(event.pointerId); };
  const moveDrag = (event) => {
    if (dragStart.current === null) return;
    setRotation((value) => value + (event.clientX - dragStart.current) * 0.45);
    dragStart.current = event.clientX;
  };
  const endDrag = () => { dragStart.current = null; };
  return <section id="skills" className="toolbox-section section-shell">
    <div className="section-heading"><span>04 / Moving toolbox</span><h2>Tools that keep the ideas <em>moving.</em></h2><p>Drag the orbit to explore the tools behind the work.</p></div>
    <div className="toolbox-orbit-wrap" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerLeave={endDrag}>
      <motion.div className="toolbox-orbit" style={{ transform: `rotate(${rotation}deg)` }}>
        {portfolioData.skills.map((skill, index) => { const Icon = toolIcons[skill.name] || Zap; const logo = toolLogos[skill.name]; const angle = (index * 2 * Math.PI) / portfolioData.skills.length; return <div className="tool-orbit-item" style={{ left: `${50 + Math.cos(angle) * 39}%`, top: `${50 + Math.sin(angle) * 39}%` }} key={`${skill.group}-${skill.name}`} title={skill.description}><span className={`tool-logo ${logo ? "" : "is-fallback"}`}>{logo && <img src={logo} alt={`${skill.name} logo`} onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.parentElement.classList.add("is-fallback"); }} />}<Icon size={25} strokeWidth={1.6} /></span><span>{skill.name}</span></div>; })}
      </motion.div>
      <div className="toolbox-center"><span>SB</span><small>EEE / TOOLBOX</small></div>
    </div>
  </section>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const [cursor, setCursor] = useState({x:0,y:0});

  useEffect(() => {
    const move = e => setCursor({x:e.clientX, y:e.clientY});
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const projects = portfolioData.projects.filter(p =>
    active === "All" || p.category === active
  );

  const skillGroups = useMemo(() => {
    const map = {};
    portfolioData.skills.forEach(s => (map[s.group] ??= []).push(s));
    return map;
  }, []);

  const go = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});
    setMenu(false);
  };

  return (
    <>
      <div className="cursor-glow" style={{left: cursor.x, top: cursor.y}} />
      <div className="grid-bg" />
      <nav className="navbar">
        <button className="brand" onClick={() => go("home")}>SB<span>.</span></button>
        <div className={`nav-links ${menu ? "open":""}`}>
          {nav.map(item => <button key={item} onClick={() => go(item)}>{item}</button>)}
        </div>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>
          {menu ? <X/> : <Menu/>}
        </button>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hero-orb orb-a"/><div className="hero-orb orb-b"/>
          <div className="hero-copy">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="kicker">
              <Sparkles size={15}/> Engineering × Technology
            </motion.div>
            <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.08}}>
              Hi, I'm <em>Swakhar</em><br/>Biswas.
            </motion.h1>
            <RotatingRoles roles={portfolioData.personal.roles}/>
            <p className="hero-bio">{portfolioData.personal.bio}</p>
            <div className="cta-row">
              <button className="primary-btn" onClick={() => go("projects")}>Explore My Work <ArrowUpRight size={17}/></button>
              <a className="secondary-btn" href={portfolioData.personal.cv} target="_blank" rel="noreferrer">Download CV <Download size={17}/></a>
            </div>
            <Socials/>
          </div>
          <motion.div className="hero-photo" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:.15}}>
            <div className="photo-ring"/>
            <img src={portfolioData.personal.image} alt={`${portfolioData.personal.name} profile`} />
            <div className="photo-label">EEE · TECH · RESEARCH</div>
          </motion.div>
          <div className="scroll-cue"><ChevronDown size={17}/> Scroll to explore</div>
        </section>

        <Toolbox />

        <Section id="about" eyebrow="01 / About" title="Building with curiosity.">
          <div className="about-grid">
            <div className="large-copy"><p>{portfolioData.about.academic}</p><p>{portfolioData.about.interests}</p></div>
            <div className="glass-card about-card"><span>FOCUS</span><h3>Engineering<br/>in the real world.</h3><p>{portfolioData.about.goals}</p></div>
          </div>
        </Section>

        <Section id="education" eyebrow="02 / Education" title="Academic journey.">
          <Timeline items={portfolioData.education} education/>
        </Section>

        <Section id="experience" eyebrow="03 / Experience" title="Experience & activities.">
          <Timeline items={portfolioData.experience}/>
        </Section>

        <Section id="skill-details" eyebrow="04 / Skills" title="A moving toolbox.">
          <div className="skill-stage">
            {portfolioData.skills.map((s,i) => (
              <motion.div key={`${s.group}-${i}`} className="skill-pill"
                animate={{y:[0,-8,0], x:[0,(i%2?5:-5),0], rotate:[0,(i%2?1:-1),0]}}
                transition={{duration:4+i*.25, repeat:Infinity, ease:"easeInOut", delay:i*.12}}>
                <b>{s.name}</b><small>{s.group}</small><span>{s.description}</span>
              </motion.div>
            ))}
          </div>
          <div className="skill-groups">
            {Object.entries(skillGroups).map(([group, list]) => (
              <div className="skill-group" key={group}><h3>{group}</h3>{list.map((s,i)=><div className="skill-line" key={i}><b>{s.name}</b><span>{s.description}</span></div>)}</div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="05 / Selected work" title="Projects, experiments & builds.">
          <div className="filter-row">
            {categories.map(c=><button className={active===c?"active":""} key={c} onClick={()=>setActive(c)}>{c}</button>)}
          </div>
          <div className="project-grid">
            {projects.map((p,i)=><ProjectCard key={i} project={p} onClick={()=>setSelected(p)}/>)}
          </div>
        </Section>

        <Section id="research" eyebrow="06 / Research" title="Questions worth exploring.">
          <div className="research-grid">
            {portfolioData.research.map((r,i)=><motion.article className="research-card" key={i} whileHover={{y:-6}}>
              <span>0{i+1}</span><h3>{r.title}</h3><p>{r.description}</p><div>{r.tags.map(t=><small key={t}>{t}</small>)}</div>
            </motion.article>)}
          </div>
        </Section>

        <Section id="achievements" eyebrow="07 / Achievements" title="Milestones & recognition.">
          <div className="achievement-list">
            {portfolioData.achievements.map((a,i)=><article className="achievement" key={i}>
              <div className="achievement-num">0{i+1}</div><div><h3>{a.title}</h3><p>{a.organization} · {a.date}</p><span>{a.description}</span></div>
              {safeLink(a.link) && <a href={a.link} target="_blank" rel="noreferrer"><ExternalLink size={18}/></a>}
            </article>)}
          </div>
          <div className="profile-extras">
            <div className="extra-panel">
              <span className="extra-label">WRITINGS & PUBLICATIONS</span>
              {portfolioData.publications.map((publication) => <article key={publication.title}><h3>“{publication.title}”</h3><p>{publication.organization} · {publication.date}</p><span>{publication.description}</span></article>)}
            </div>
            <div className="extra-panel">
              <span className="extra-label">LANGUAGE PROFICIENCY</span>
              <div className="language-list"><div className="language-head"><span>Language</span><span>Read</span><span>Write</span><span>Speak</span></div>{portfolioData.languages.map((language) => <div className="language-row" key={language.name}><strong>{language.name}</strong><span>{language.reading}</span><span>{language.writing}</span><span>{language.speaking}</span></div>)}</div>
            </div>
          </div>
        </Section>

        <Section id="contact" eyebrow="08 / Contact" title="Let's build something useful.">
          <div className="contact-grid">
            <div><h3 className="contact-title">Have a project, research idea, or opportunity?</h3><p className="contact-text">Use the details published in the portfolio or send a message through the form.</p><div className="contact-details">
              {safeLink(portfolioData.personal.email) && <a href={`mailto:${portfolioData.personal.email}`}><Mail/> {portfolioData.personal.email}</a>}
              {safeLink(portfolioData.personal.phone) && <a href={`tel:${portfolioData.personal.phone}`}><Phone/> {portfolioData.personal.phone}</a>}
              {safeLink(portfolioData.personal.location) && <span><MapPin/> {portfolioData.personal.location}</span>}
            </div></div>
            <form className="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
              <label>Name<input name="name" required placeholder="Your name"/></label>
              <label>Email<input type="email" name="email" required placeholder="you@example.com"/></label>
              <label>Message<textarea name="message" required rows="5" placeholder="Tell me about it..."/></label>
              <button className="primary-btn" type="submit">Send message <ArrowUpRight size={17}/></button>
            </form>
          </div>
        </Section>
      </main>

      <footer><div><b>Swakhar Biswas</b><span>Engineering · Technology · Research</span></div><div className="footer-links">{nav.slice(0,5).map(n=><button key={n} onClick={()=>go(n)}>{n}</button>)}</div><small>© 2026 Swakhar Biswas. All rights reserved.</small></footer>

      <AnimatePresence>{selected && <ProjectModal project={selected} close={()=>setSelected(null)}/>}</AnimatePresence>
    </>
  );
}

function RotatingRoles({roles=[]}) {
  const [i,setI] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setI(v=>(v+1)%Math.max(roles.length,1)),2400);return()=>clearInterval(t)},[roles.length]);
  return <div className="role-line"><span>I'm an</span><AnimatePresence mode="wait"><motion.strong key={roles[i]} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>{roles[i]}</motion.strong></AnimatePresence></div>
}

function Socials() {
  const s=portfolioData.socials;
  return <div className="socials">{safeLink(s.github)&&<a href={s.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>}{safeLink(s.linkedin)&&<a href={s.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>}{safeLink(s.facebook)&&<a href={s.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook/></a>}</div>
}

function Timeline({items=[],education=false}) {
  return <div className="timeline">{items.map((x,i)=><article className="timeline-item" key={i}><div className="timeline-dot"/><div className="timeline-meta">{x.period}</div><div className="timeline-content"><h3>{education?x.degree:x.title}</h3><h4>{education?x.institution:x.organization}</h4>{education&&<small>{x.department}</small>}<p>{x.details}</p></div></article>)}</div>
}

function ProjectCard({project,onClick}) {
  return <motion.article className="project-card" whileHover={{y:-7}} onClick={onClick}><div className="project-image"><img src={project.image} alt="" /><span>{project.category}</span></div><div className="project-body"><div className="project-top"><small>{project.year}</small><ArrowUpRight size={18}/></div><h3>{project.title}</h3><p>{project.description}</p><div className="tech-row">{project.technologies.map(t=><span key={t}>{t}</span>)}</div></div></motion.article>
}

function ProjectModal({project,close}) {
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={close}><motion.div className="modal" initial={{y:30,scale:.97}} animate={{y:0,scale:1}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={close}><X/></button><img src={project.image} alt="" /><span className="modal-category">{project.category} · {project.year}</span><h2>{project.title}</h2><p>{project.description}</p><div className="detail-grid">{[["Problem",project.problem],["Objective",project.objective],["Methodology",project.methodology],["Result",project.result],["Contribution",project.contribution]].map(([k,v])=>v&& !v.startsWith("[")&&<div key={k}><small>{k}</small><p>{v}</p></div>)}</div><div className="modal-actions">{safeLink(project.github)&&<a href={project.github} target="_blank" rel="noreferrer"><Github/> GitHub</a>}{safeLink(project.demo)&&<a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink/> Live demo</a>}{safeLink(project.report)&&<a href={project.report} target="_blank" rel="noreferrer"><FileText/> View report</a>}</div></motion.div></motion.div>
}

export default App;