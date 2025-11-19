import { useState } from "react";
import "./gallery.css";

import Img1 from "../../../Assets/Images/home/img1.png";
import Img2 from "../../../Assets/Images/home/img2.png";
import Img3 from "../../../Assets/Images/home/img3.png";
import Img4 from "../../../Assets/Images/home/img4.png";
import Img5 from "../../../Assets/Images/home/img5.png";
import Img6 from "../../../Assets/Images/home/img6.png";

const Gallery = () => {
  const images = [Img1, Img4, Img3, Img2, Img6, Img5];
const [selected, setSelected] = useState(null);

  return (
    <section className="gallery-section">
        <div className="container">
          <h2 className="gallery-title">On The Court With Us</h2>
      <p className="gallery-sub">Where skills, fun, and teamwork come alive.</p>

      <div className="masonry">
        {images.map((img, i) => (
          <div key={i} className="masonry-item" onClick={() => setSelected(img)}>
            <img src={img} alt="" />
          </div>
        ))}
      </div>

      {selected && (
        <div className="popup" onClick={() => setSelected(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={selected} alt="" />
            <span className="popup-close" onClick={() => setSelected(null)}>×</span>
          </div>
        </div>
      )}
        </div>
      
    </section>
  );
};

export default Gallery;
