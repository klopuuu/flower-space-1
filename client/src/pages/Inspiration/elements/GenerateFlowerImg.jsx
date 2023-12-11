import React from "react";
import styles from "./../Inspiration.module.css";

function GenerateFlowerImg({ generateFlowerImage, saveImage }) {
  return (
    <div className={styles.generate__image}>
      {generateFlowerImage.map((imgflower) => (
        <div
          className={styles.generate__body_img}
          onClick={(e) => saveImage(`http://127.0.0.1:8001/${imgflower.img}`)}
        >
          <img
            src={`http://127.0.0.1:8001/${imgflower.img}`}
            alt={`${imgflower.img}`}
          />
        </div>
      ))}
    </div>
  );
}

export default GenerateFlowerImg;
