// https://medium.com/@dhilipkmr/react-hooks-carousel-200d0f5a042
// https://blog.logrocket.com/building-carousel-component-react-hooks/
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [idx, setIdx] = useState(0);

  async function getImages() {
    let data = await fetch("https://picsum.photos/v2/list?limit=3");
    let res = await data.json();
    setImages(res);
    setCurrentImage(res[0]);
  }

  function updateImage(val) {
    setIdx((prevIdx) => {
      let newIdx = prevIdx + val;
      if (newIdx < 0) newIdx = images.length - 1;
      if (newIdx === images.length) newIdx = 0;
      setCurrentImage(images[newIdx]);
      return newIdx;
    });
  }

  useEffect(() => {
    getImages();

    let id = setInterval(() => {
      updateImage(1);
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="App">
      <div className="carousel">
        <button
          className="carousel-button prev"
          onClick={() => updateImage(-1)}
        >
          {"<<"}
        </button>
        <button className="carousel-button next" onClick={() => updateImage(1)}>
          {">>"}
        </button>
        <img
          className="carousel-img"
          src={`${currentImage.download_url}`}
          alt={`${currentImage.id}`}
        />
      </div>
      <div className="gallery">
        {images.map((i, idx) => (
          <img
            onClick={() => {
              setCurrentImage(images[idx]);
            }}
            src={`${i.download_url}`}
            alt={`${i.id}`}
          />
        ))}
      </div>
    </div>
  );
}
