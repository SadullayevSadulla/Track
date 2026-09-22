import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

const shortFadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const slideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
};

const ContactSec = () => {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="lg:h-85.25 pb-7 lg:py-0 flex relative lg:overflow-hidden! bg-light-gray/20">
            <div className="container">
                <div className="pt-10 relative z-10">
                    <div className="mb-9.5">
                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-150px" }}
                            className="text-[42px] font-semibold"
                        >
                            {t("zapros_title")}
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true, margin: "-150px" }}
                            className="text-lg"
                        >
                            {t("zapros_subtitle")}
                        </motion.p>
                    </div>

                    <motion.form
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-150px" }}
                    >
                        <div className="flex items-end xl gap-5 flex-wrap sm:flex-nowrap lg:w-188 mb-4">
                            <div className="flex flex-col w-full">
                                <motion.label variants={shortFadeUp} htmlFor="name" className="text-sm">
                                    {t("zapros_name_label")}
                                </motion.label>
                                <motion.input
                                    variants={shortFadeUp}
                                    id="name"
                                    className="py-2.75 px-3 rounded-sm border outline-0"
                                    type="text"
                                    placeholder={t("zapros_name_placeholder")}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <motion.label variants={shortFadeUp} htmlFor="phone" className="text-sm">
                                    {t("zapros_phone_label")}
                                </motion.label>
                                <motion.input
                                    variants={shortFadeUp}
                                    id="phone"
                                    className="py-2.75 px-3 rounded-sm border outline-0"
                                    type="tel"
                                    onMouseLeave={() => setIsHovered(false)}
                                    onMouseEnter={() => setIsHovered(true)}
                                    placeholder={isHovered ? "+7 (___) ___-__-__" : t("zapros_phone_placeholder")}
                                />
                            </div>

                            <motion.button
                                variants={shortFadeUp}
                                className="px-[30px] py-[13px] bg-[#FEC80B] rounded-[4px] cursor-pointer"
                                type="submit"
                            >
                                {t("zapros_submit_btn")}
                            </motion.button>
                        </div>

                        <motion.div variants={shortFadeUp} className="flex gap-1 text-light-gray text-sm flex-col sm:flex-row">
                            <p>{t("zapros_consent_prefix")}</p>
                            <a href="#" className="text-indigo-700 underline opacity-50 hover:no-underline">
                                {t("zapros_consent_link")}
                            </a>
                        </motion.div>
                    </motion.form>
                </div>

                <motion.img
                    initial={slideRight.hidden}
                    whileInView={slideRight.visible}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ delay: 0.4 }}
                    className="absolute hidden lg:block lg:-right-200 lg:-top-10 xl:-right-150 xl:-top-10 2xl:-right-110 2xl:-top-15 z-0"
                    src="/feedback-truck_result.webp"
                    alt="Truck image"
                />
            </div>
        </section>
    );
};

export default ContactSec;