import { React, useState, useContext } from "react";
import styles from "./Inspiration.module.css";
import { observer } from "mobx-react-lite";
import HomeMenu from "./../../sections/HomeMenu/HomeMenu";
import { Context } from "../../index";
import * as inspirations from "../../http/inspirationAPI";
import FlowerList from "./elements/FlowerList";
import GenerateFlowerImg from "./elements/GenerateFlowerImg";

const generateImage = async (
  activeCheckbox,
  user,
  setGenerate,
  setActiveCheckbox
) => {
  switch (activeCheckbox) {
    case null:
      await inspirations.createInspiration(user.id).then((res) => {
        setGenerate(res);
      });
      setActiveCheckbox(null);
      break;
    case 0:
      await inspirations.createInspiratioRose(user.id).then((res) => {
        setGenerate(res);
      });
      setActiveCheckbox(null);
      break;
    case 1:
      await inspirations.createInspiratioChamomile(user.id).then((res) => {
        setGenerate(res);
      });
      setActiveCheckbox(null);
      break;
    case 2:
      await inspirations.createInspiratioGipsohila(user.id).then((res) => {
        setGenerate(res);
      });
      setActiveCheckbox(null);
      break;
    case 3:
      await inspirations.createInspiratioPeonies(user.id).then((res) => {
        setGenerate(res);
      });
      setActiveCheckbox(null);
      break;
    case 4:
      await inspirations.createInspiratioChrysant(user.id).then((res) => {
        setGenerate(res);
      });
      setActiveCheckbox(null);
      break;
    default:
      setActiveCheckbox(null);
  }
};

const saveImage = (file) => {
  // using Java Script method to get PDF file
  fetch(file).then((response) => {
    response.blob().then((blob) => {
      // Creating new object of PDF file
      const fileURL = window.URL.createObjectURL(blob);
      // Setting various property values
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = file;
      alink.click();
    });
  });
};

const Inspiration = observer(() => {
  const { user } = useContext(Context);
  const [generateFlowerImage, setGenerateFlowerImage] = useState([]);
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const flowerList = ["Роза", "Ромашки", "Гипсофилы", "Пионы", "Хризантемы"];

  return (
    <div className={styles.inspiration}>
      <div className={styles.inspiration__container}>
        <div className={styles.inspiration__body}>
          <div className={styles.inspiration__menu}>
            <HomeMenu />
          </div>
          <div className={styles.inspiration__data}>
            <div className={styles.inspiration__checkbox}>
              <p className={styles.generate__paragraph}>
                Сгенерируйте уникальное изображение
              </p>
              <div className={styles.generate__flex}>
                <FlowerList
                  flowerList={flowerList}
                  activeCheckbox={activeCheckbox}
                  setActiveCheckbox={setActiveCheckbox}
                />
                <button
                  onClick={() =>
                    generateImage(
                      activeCheckbox,
                      user,
                      setGenerateFlowerImage,
                      setActiveCheckbox
                    )
                  }
                  className={styles.generate__btn}
                >
                  Сгенерировать изображения
                </button>
              </div>
              <p style={{ marginTop: "180px" }}>
                *нажмите на картинку, чтобы скачать её
              </p>
            </div>
            <GenerateFlowerImg
              generateFlowerImage={generateFlowerImage}
              saveImage={saveImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Inspiration;
