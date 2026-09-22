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
    <footer {...props} className={`relative bg-black text-white pt-15.5 pb-10 ${props.className || ""}`}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            className="mb-7.5"
          >
            <motion.span variants={fadeUp} className="inline-block mb-2">
              {t("footer_phone")}
            </motion.span>
            <br />
            <motion.span variants={fadeUp} className="inline-block mb-2">
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
              className="mt-6.25"
              width={200}
              src="/qr.svg"
              alt="QR Code image"
            />
          </motion.div>

          <div className="flex mb-10 gap-5 sm:gap-20 text-sm text-[#d1d1d1] font-semibold flex-col md:flex-row">
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
                className="flex gap-1 md:hidden cursor-pointer text-base mb-3 md:mb-8 text-white"
                type="button"
              >
                {t("about_us")} <ChevronDown className={isOnasOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </motion.button>

              <div
                className={`flex flex-col gap-3 lg:flex-row lg:gap-20 md:h-auto md:overflow-visible transition-all ease-in duration-300 overflow-hidden ${!isOnasOpen ? "h-0" : "h-110"}`}
              >
                <motion.ul
                  variants={containerSec}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-150px" }}
                  className="flex flex-col gap-3 mr-20 text-[#d1d1d1]"
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
                  className="flex flex-col gap-3 mr-20"
                >
                  {aboutLinks.slice(3).map((item) => (
                    <motion.li key={item.to} variants={shortFadeUp}>
                      <Link to={item.to}>{item.label}</Link>
                    </motion.li>
                  ))}
                </motion.ul>
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
                className="text-base flex gap-1 cursor-pointer mb-3 md:mb-8 text-white md:hidden"
                type="button"
              >
                {t("media")} <ChevronDown className={isMediaOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </motion.button>

              <motion.ul
                variants={containerSec}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                className={`flex flex-col gap-3 transition-all ease-in duration-300 md:h-auto md:overflow-visible overflow-hidden ${!isMediaOpen ? "h-0" : "h-20"}`}
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

        <div className="flex flex-col gap-5 md:flex-row justify-between lg:justify-start">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm md:order-1 order-2 lg:mr-60 text-[#d1d1d1] opacity-40 font-medium"
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
            className="flex gap-5 md:order-2"
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