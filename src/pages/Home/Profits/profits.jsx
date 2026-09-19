import { useState, useEffect, useRef } from "react";
import { UserCog, FileCog, Clock, ShieldCheck, Wrench } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const MENU_DATA = [
  {
    id: "kb",
    title: "Конструкторское бюро",
    text: "Собственное конструкторское бюро позволяет реализовать индивидуальные проекты клиента.",
    icon: <UserCog size={56} strokeWidth={1.2} />,
    coords: { top: "7.7%", left: "70.6%" },
  },
  {
    id: "dev",
    title: "Разработка",
    text: "Все проекты разработаны согласно мануал кузовостроителей.",
    icon: <FileCog size={56} strokeWidth={1.2} />,
    coords: { top: "28%", left: "89.6%" },
  },
  {
    id: "prod",
    title: "Производственная база",
    text: "Собственная производственная база позволяет максимально снизить себестоимость продукции, повышая её конкурентоспособность.",
    icon: <Clock size={56} strokeWidth={1.2} />,
    coords: { top: "50%", left: "95%" },
  },
  {
    id: "warranty",
    title: "Гарантия",
    text: "Предоставляем официальную гарантию на всю производимую технику.",
    icon: <ShieldCheck size={56} strokeWidth={1.2} />,
    coords: { top: "73%", left: "89.2%" },
  },
  {
    id: "service",
    title: "Сервис",
    text: "Круглосуточная сервисная поддержка и оперативная поставка запчастей.",
    icon: <Wrench size={56} strokeWidth={1.2} />,
    coords: { top: "92.5%", left: "70.6%" },
  },
];

export default function ArcNavigation() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // Desktop pinned scroll uchun
  const [scrollProgress, setScrollProgress] = useState(0); // Progress bar o'sishi uchun
  const [activeMobileId, setActiveMobileId] = useState("kb"); // Mobile intersection observer uchun

  // Desktop Scroll Pinning Logic
  useEffect(() => {
    const handleScroll = () => {
      // Faqat desktop uchun ishlaydi
      if (window.innerWidth < 768 || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const { top, height } = rect;
      const windowHeight = window.innerHeight;

      const maxScroll = height - windowHeight;
      if (maxScroll <= 0) return;

      const scrollDistance = -top;
      let progress = scrollDistance / maxScroll;

      // Progress 0 dan 1 gacha chegaralanadi
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      const numItems = MENU_DATA.length;
      let newIndex = Math.floor(progress * numItems);
      if (newIndex >= numItems) newIndex = numItems - 1;

      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Mobile Intersection Observer Logic
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace("mobile-content-", "");
          setActiveMobileId(id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    MENU_DATA.forEach((item) => {
      const el = document.getElementById(`mobile-content-${item.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative container hidden md:block font-sans"
        style={{ height: `${MENU_DATA.length * 100 + 20}vh` }}
      >
       <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden w-full">
          <div className="ml-0 mr-auto max-w-6xl w-full px-4 flex items-center justify-start gap-70">
            <div className="relative aspect-square w-7/12 flex items-center justify-start min-h-125">
              <div className="absolute inset-[5%] z-10 pointer-events-none rounded-full" />

              <motion.img
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                src="/benefits.png"
                alt="Truck Illustration"
                className="z-20 object-fit w-130"
              />

              <motion.nav
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                className="absolute inset-0 z-30"
              >
                {MENU_DATA.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <motion.button
                      variants={slideRight}
                      key={item.id}
                      className={`absolute flex items-center -translate-y-1/4 translate-x-3.5 bg-none border-none p-0 whitespace-nowrap group text-left transition-all duration-300 ${
                        isActive
                          ? "text-neutral-900 font-semibold"
                          : "text-neutral-400 font-normal"
                      }`}
                      style={{ top: item.coords.top, left: item.coords.left }}
                      onClick={() => handleDotClick(index)}
                    >
                      <span
                        className={`w-5 h-5 border-2 border-[#ffd000] rounded-full mr-3 shrink-0 transition-colors duration-300 ${
                          isActive ? "bg-[#ffd000]" : "bg-white"
                        }`}
                      />
                      <span className="text-[15px]">{item.title}</span>
                    </motion.button>
                  );
                })}
              </motion.nav>
            </div>

            <div className="relative w-5/12 h-120 flex items-center pl-10">
              <div
                className="absolute left-0 top-0 w-0.75 bg-[#ffd000]"
                style={{
                  height: `${Math.max(15, scrollProgress * 100)}%`,
                }}
              />

              <div className="relative w-full h-full ">
                {MENU_DATA.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={item.id}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-full transition-all duration-500 ${
                        isActive
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="mb-8 text-neutral-900">{item.icon}</div>
                      <p className="text-[17px] leading-relaxed text-neutral-900 font-medium max-w-100">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:hidden my-10 font-sans">
        <div className="top-0 bg-white/90 backdrop-blur-sm z-40 py-4 border-b border-neutral-100 flex justify-center">
          <img
            src="/benefits.png"
            alt="Truck"
            className="w-full max-w-60 h-auto object-contain"
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
          className="flex flex-col gap-10 py-10 px-4"
        >
          {MENU_DATA.map((item) => {
            const isActive = activeMobileId === item.id;
            return (
              <motion.div
                variants={fadeUp}
                key={item.id}
                id={`mobile-content-${item.id}`}
                className={`p-6 border-l-4 transition-all duration-300 rounded-r-xl scroll-mt-24 border-neutral-200 bg-neutral-50/50`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-neutral-800">{item.icon}</span>
                  <h4 className="font-bold text-neutral-800">{item.title}</h4>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}