import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.35,
    },
  },
};

const containerSec = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const shortFadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Footer = (props) => {
  const { t } = useLanguage();
  const [isOnasOpen, setIsOnasOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const aboutLinks = [
    { to: "/onac", label: t("menu_about_company") },
    { to: "/news", label: t("menu_about_news") },
    { to: "/hamkor", label: t("menu_about_partners") },
    { to: "/certeficat", label: t("menu_about_certificates") },
    { to: "/vaqansiya", label: t("menu_about_vacancies") },
    { to: "/kredit", label: t("menu_about_leasing") },
  ];

  const mediaLinks = [
    { to: "/foto", label: t("menu_media_gallery") },
    { to: "/vido", label: t("menu_media_video") },
    { to: "/reklama", label: t("menu_media_ads") },
  ];

  const socialLinks = [
    { href: "#", src: "/max-messenger-sign-logo.svg", alt: "Max messenger" },
    { href: "#", src: "/telegram.svg", alt: "Telegram logo" },
    { href: "#", src: "/VK_com-logo.svg", alt: "Vkontakte logo" },
    { href: "#", src: "/Rutube_icon.png", alt: "Rutube logo" },
    { href: "#", src: "/YouTube_full-color_icon.png", alt: "Youtube logo", className: "w-10" },
    { href: "#", src: "/Yandex_Zen_logo_icon.png", alt: "Yandex Zen logo" },
  ];

  return (
    <footer
      {...props}
      className={`relative bg-black text-white pt-12 md:pt-15.5 pb-20 md:pb-10 ${props.className || ""}`}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between md:gap-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            className="mb-7.5 shrink-0"
          >
            <motion.span variants={fadeUp} className="block mb-2">
              {t("footer_phone")}
            </motion.span>
            <motion.span variants={fadeUp} className="block mb-2">
              {t("footer_email")}
            </motion.span>

            <motion.address variants={fadeUp} className="mb-4 not-italic text-white/80">
              {t("footer_address")}
            </motion.address>

            <motion.button
              variants={fadeUp}
              type="button"
              className="py-3.25 px-7.5 bg-[#FEC80B] text-black rounded-sm cursor-pointer hover:bg-[#f5c938] transition ease duration-200"
            >
              {t("footer_call_btn")}
            </motion.button>

            <motion.img
              variants={fadeUp}
              className="mt-6.25 w-40 sm:w-50 max-w-full"
              src="/qr.svg"
              alt="QR Code image"
            />
          </motion.div>

          <div className="flex flex-col gap-5 mb-10 text-sm text-[#d1d1d1] font-semibold md:flex-row md:gap-12 lg:gap-20">
            <div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                className="text-base hidden md:block mb-8 text-white"
              >
                {t("about_us")}
              </motion.h2>

              <motion.button
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                onClick={() => setIsOnasOpen((prev) => !prev)}
                viewport={{ once: true, margin: "-50px" }}
                aria-expanded={isOnasOpen}
                className="flex items-center gap-1 md:hidden cursor-pointer text-base text-white"
                type="button"
              >
                {t("about_us")}
                <ChevronDown
                  className={`transition-transform duration-300 ${isOnasOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:grid-rows-[1fr] ${
                  isOnasOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden md:overflow-visible">
                  <div className="flex flex-col gap-3 pt-3 md:pt-0 lg:flex-row lg:gap-20">
                    <motion.ul
                      variants={containerSec}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-150px" }}
                      className="flex flex-col gap-3 text-[#d1d1d1]"
                    >
                      {aboutLinks.slice(0, 3).map((item) => (
                        <motion.li key={item.to} variants={shortFadeUp}>
                          <Link to={item.to}>{item.label}</Link>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.ul
                      variants={containerSec}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-150px" }}
                      className="flex flex-col gap-3 text-[#d1d1d1]"
                    >
                      {aboutLinks.slice(3).map((item) => (
                        <motion.li key={item.to} variants={shortFadeUp}>
                          <Link to={item.to}>{item.label}</Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                className="text-base md:mb-8 text-white hidden md:block"
              >
                {t("media")}
              </motion.h2>

              <motion.button
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                onClick={() => setIsMediaOpen((prev) => !prev)}
                viewport={{ once: true, margin: "-50px" }}
                aria-expanded={isMediaOpen}
                className="text-base flex items-center gap-1 cursor-pointer text-white md:hidden"
                type="button"
              >
                {t("media")}
                <ChevronDown
                  className={`transition-transform duration-300 ${isMediaOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:grid-rows-[1fr] ${
                  isMediaOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden md:overflow-visible">
                  <motion.ul
                    variants={containerSec}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-150px" }}
                    className="flex flex-col gap-3 pt-3 md:pt-0"
                  >
                    {mediaLinks.map((item) => (
                      <motion.li key={item.to} variants={shortFadeUp}>
                        <Link to={item.to}>{item.label}</Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row justify-between lg:justify-start">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm md:order-1 order-2 lg:mr-60 text-[#d1d1d1] opacity-40 font-medium md:max-w-md lg:max-w-none"
          >
            {t("footer_copyright")}
            <br />
            {t("footer_disclaimer")}
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 md:order-2 md:pr-16 lg:pr-0"
          >
            {socialLinks.map((item) => (
              <motion.a key={item.alt} variants={shortFadeUp} href={item.href}>
                <img
                  width={30}
                  src={item.src}
                  alt={item.alt}
                  className={item.className || ""}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#d1d1d1] text-black transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#FEC80B]"
      >
        <ArrowUp size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </footer>
  );
};

export default Footer;