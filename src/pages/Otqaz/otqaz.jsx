import React from "react";
import LightGallery from "lightgallery/react";

import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import "./otqaz.css";

export const Otqaz = () => {
  const images = [
    "/7u12ta4cdxf4tqwzb0vh3nqjt7k5kjux.jpg",
    "/a7iv00aar2i7nmpnyswd34mni510v25b.jpg",
    "/wsb0pbbv102y8p9m8b4phetk9femdxzu.jpg",
    "/0u4m64b105kgp51tew3i8g70c6ya3307.jpg",
    "/9zy8n8lz22nhzwk24v6adwbnbbqdnkti.jpg",
  ];

  return (
    <div className="container">
      <div className="certeficat flex flex-col gap-10">
        <div className="certeficat_text">
          <h1>Отзывы</h1>
        </div>

        <LightGallery
          speed={500}
          plugins={[lgZoom, lgThumbnail]}
          elementClassNames="certeficat_img flex flex-wrap gap-7"
        >
          {images.map((image, index) => (
            <a
              href={image}
              key={index}
              className="certeficat_item"
            >
              <img src={image} alt={`Отзыв ${index + 1}`} />
            </a>
          ))}
        </LightGallery>
      </div>
    </div>
  );
};