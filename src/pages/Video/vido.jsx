import React from 'react'
import "./video.css"
import videoData from "./videoData"
import { useLanguage } from "../../i18n/LanguageContext"
import { useNavigate } from "react-router-dom"

const Vido = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const navigateAndClose = (path) => {
        navigate(path);
    };

    return (
        <div className='container'>
            <div className="video">
                <div className="video_top flex justify-between py-8">
                    <div className="video_top_text">
                        <h1>{t("video_page_title")}</h1>
                    </div>
                    <div className="video_top_button">
                        <button onClick={(event) => { event.preventDefault(); navigateAndClose("/foto"); }}>{t("video_view_photos_btn")}</button>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between gap-10">
                    {videoData.map((video) => (
                        <div className="video_cards" key={video.id}>
                            <iframe
                                width="633"
                                height="475"
                                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                title={t(video.titleKey)}
                                allowFullScreen
                            ></iframe>
                            <p className='mt-5'>{t(video.titleKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Vido