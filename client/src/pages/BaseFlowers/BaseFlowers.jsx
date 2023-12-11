import styles from "./BaseFlowers.module.css";
import { observer } from "mobx-react-lite";
import HomeMenu from "../../sections/HomeMenu/HomeMenu";
import { useState, useContext, useRef, useEffect } from "react";
import iconupdate from "../../assets/icons/icons-карандаш.png";
import imgsearch from "../../assets/icons/free-icon-search.png";
import {
  getAllFlowers,
  getOneFlowers,
  updateFlower,
  searchFlowers,
} from "../../http/flowersApi";
import axios from "axios";
import { Context } from "../../index";
import React from "react";
import { action } from "mobx";

const handleMouseEnter = (index, getStyleOverlay) => {
  getStyleOverlay(1);
  var element = document.getElementById(index);
  element.style.display = "block";
};

const handleMouseLeave = (index, getStyleOverlay) => {
  getStyleOverlay(0);
  var element = document.getElementById(index);
  element.style.display = "none";
};

const createFlower = async (e, user, flowerForm, setFlowerForm, set) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append("avatar", flowerForm.filesImg);
    data.append("name", flowerForm.name);
    data.append("price", flowerForm.price);
    data.append("quantity", flowerForm.quantity);
    await axios.post(
      `http://localhost:8000/api/flowers/createflowers/${user.id}`,
      data,
      {
        headers: {
          "content-type": "mulpipart/form-data",
        },
      }
    );
    setFlowerForm({
      filesImg: "",
      name: "",
      price: "",
      quantity: "",
    });
    // setCloseImage(true);
  } catch (error) {
    alert(error.response.data.message);
  }
};

const searchFlower = async (e, search, setInfoSearch) => {
  e.preventDefault();
  try {
    const data = await searchFlowers(search);
    setInfoSearch(data);
  } catch (error) {
    alert(error.response.data.message);
  }
};

const BaseFlowers = observer(() => {
  const { user } = useContext(Context);

  const [flowerForm, setFlowerForm] = useState({
    filesImg: "",
    name: "",
    quantity: "",
    price: "",
  });

  // const [filesimg, setHaandleFiles] = useState("");
  // const [name, setName] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [price, setPrice] = useState("");

  const [info, setInfo] = useState([]);

  const [styleOverlay, getStyleOverlay] = useState(0);
  const [update, setUpdate] = useState(false);
  const [idflower, setIdflower] = useState(null);

  const infoone = useRef([]);
  const [search, setSearch] = useState("");
  const [infosearch, setInfoSearch] = useState([]);
  const searchinput = useRef("");
  let imageDisplay = document.getElementById("imageDisplay");
  let error = document.getElementById("error");
  // const [closeImage, setCloseImage] = useState(false);

  // const handleMouseEnter = (id, index) => {
  //   getStyle(1);
  //   var elem = document.getElementById(index);
  //   console.log(elem);
  //   elem.style.display = "block";
  // };

  // const handleMouseLeave = (id, index) => {
  //   getStyle(0);
  //   var elem = document.getElementById(index);
  //   elem.style.display = "none";
  // };

  // const DeletedFlower = async (e) => {
  //   e.preventDefault();
  //   const data = await deleteFlower(e.target.id).then(() =>
  //     alert("Цветок успешно удален")
  //   );
  //   searchinput.current.value = "";
  //   setInfoSearch([]);
  //   setSearch("");
  // };

  // useEffect(() => {
  //   getAllFlowers(user.id).then((res) => {
  //     setInfo(res);
  //   });
  // });
  getAllFlowers(user.id).then((res) => {
    setInfo(res);
  });

  const updateflower = async (id) => {
    setUpdate(true);
    setIdflower(id);
    await getOneFlowers(id).then((res) => {
      infoone.current = res;
      setFlowerForm({
        name: infoone.current.name,
        price: infoone.current.price,
        quantity: infoone.current.quantity,
      });
      // setName(infoone.current.name);
      // setPrice(infoone.current.price);
      // setQuantity(infoone.current.quantity);
    });
    // setCloseImage(true);
  };

  const updateOneflower = async (e) => {
    e.preventDefault();
    const data = await updateFlower(
      idflower,
      flowerForm.name,
      flowerForm.price,
      flowerForm.quantity
    );
    if (infosearch.length !== 0) {
      setInfoSearch(data);
    }
    setUpdate(false);
    setFlowerForm({
      name: infoone.current.name,
      price: infoone.current.price,
      quantity: infoone.current.quantity,
    });
    // setName("");
    // setPrice("");
    // setQuantity("");
    // setCloseImage(true);
  };

  const CleanInput = async (e) => {
    e.preventDefault();
    searchinput.current = e.target;
    e.target.value = "";
    setInfoSearch([]);
    setSearch("");
  };

  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    let files = 0;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFlowerForm({ ...flowerForm, filesImg: e.dataTransfer.files[0] });
      files = e.target.files;
    }
    setDragActive(false);
    imageDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
  };

  const handleChange = function (e) {
    e.preventDefault();
    // setCloseImage(false);
    let files = 0;
    if (e.target.files && e.target.files[0]) {
      setFlowerForm({ ...flowerForm, filesImg: e.target.files[0] });
      // setHaandleFiles(e.target.files[0]);
      files = e.target.files;
    }
    imageDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const fileHandler = (file, name, type) => {
    if (type.split("/")[0] !== "image") {
      //File Type Error
      error.innerText = "Please upload an image file";
      return false;
    }
    error.innerText = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      //image and file name
      let imageContainer = document.createElement("figure");
      let img = document.createElement("img");
      img.src = reader.result;
      imageContainer.appendChild(img);
      imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
      imageDisplay.appendChild(imageContainer);
      let imageDisplayStyle = document.getElementsByTagName("figure")[0];
      imageDisplayStyle.style.width = "140px";
      imageDisplayStyle.style.height = "140px";
      imageDisplayStyle.style.position = "relative";
      imageDisplayStyle.style.marginBottom = "20px";
      imageDisplayStyle.style.marginLeft = "80px";
      let image = document.getElementsByTagName("figure")[0];
      let imagestyle = image.getElementsByTagName("img")[0];
      imagestyle.style.width = "100%";
      imagestyle.style.height = "100%";
      imagestyle.style.borderRadius = "10px";
      imagestyle.style.objectFit = "cover";
    };
  };
  return (
    <div className={styles.baseflowers}>
      <div className={styles.baseflowers__container}>
        <div className={styles.baseflowers__body}>
          <div className={styles.baseflowers__menu}>
            <HomeMenu />
          </div>
          <div className={styles.baseflowers__flower}>
            <div className={styles.container_flex}>
              <p className={styles.flower__paragraph}>ЦВЕТЫ</p>
              <div className={styles.flower__search}>
                <img
                  src={imgsearch}
                  className={styles.search_flower}
                  onClick={searchFlower}
                />
                <input
                  list="data"
                  className={styles.form_search}
                  placeholder="Пример: роза"
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={CleanInput}
                />
                <datalist id="data">
                  {info.map((res) => (
                    <option id={res.id}>{res.name}</option>
                  ))}
                </datalist>
              </div>
            </div>
            <div className={styles.flower__list}>
              {infosearch.length === 0 ? (
                info.map((info, index) => (
                  <div
                    className={styles.flower__info}
                    onMouseEnter={() =>
                      handleMouseEnter(index, getStyleOverlay)
                    }
                    onMouseLeave={() =>
                      handleMouseLeave(index, getStyleOverlay)
                    }
                    id={info.id}
                  >
                    <div className={styles.img__block}>
                      <img
                        src={`http://localhost:8000/${info.img}`}
                        alt={info.img}
                        className={styles.flower__img}
                        id={info.id}
                      />
                    </div>
                    <div className={styles.flower__change} id={index}>
                      {/* <img
                        src={deleteimg}
                        className={styles.flower__deleted}
                        onClick={(e) => DeletedFlower(e)}
                        id={info.id}
                      /> */}
                      <img
                        src={iconupdate}
                        className={styles.flower__update}
                        id={info.id}
                        onClick={(e) => updateflower(e.target.id)}
                      />
                    </div>
                    <p style={{ marginTop: "5px" }}>
                      {info.name} - {info.price} &#8381;
                    </p>
                    <p style={{ marginTop: "7px" }}>{info.quantity} шт.</p>
                  </div>
                ))
              ) : (
                <div
                  className={styles.flower__info}
                  onMouseEnter={(e) =>
                    handleMouseEnter(e.currentTarget, getStyleOverlay)
                  }
                  onMouseLeave={(id) => handleMouseLeave(id, getStyleOverlay)}
                >
                  <div className={styles.img__block}>
                    <img
                      src={`http://localhost:8000/${infosearch.img}`}
                      className={styles.flower__img}
                      id={infosearch.id}
                    />
                  </div>
                  <div
                    className={styles.flower__change}
                    style={
                      styleOverlay === 1
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {/* <img
                      src={deleteimg}
                      className={styles.flower__deleted}
                      onClick={(e) => DeletedFlower(e)}
                      id={infosearch.id}
                    /> */}
                    <img
                      src={iconupdate}
                      className={styles.flower__update}
                      id={infosearch.id}
                      onClick={(e) => updateflower(e.target.id)}
                    />
                  </div>
                  <p style={{ marginTop: "5px" }}>
                    {infosearch.name} - {infosearch.price} &#8381;
                  </p>
                  <p style={{ marginTop: "7px" }}>{infosearch.quantity} шт.</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.add_client}>
            {update === false ? (
              <p className={styles.add_client__title}>Новый цветок</p>
            ) : (
              <p className={styles.add_client__title}>Изменить цветок</p>
            )}
            <div id="error"></div>
            <div
              id="imageDisplay"
              src={flowerForm.filesimg}
              // style={
              //   closeImage === false
              //     ? { dispaly: "block" }
              //     : { display: "none" }
              // }
            ></div>
            <form
              id={styles.form_file_upload}
              onDragEnter={handleDrag}
              onSubmit={(e) => e.preventDefault()}
              style={
                update === false ? { dispaly: "block" } : { display: "none" }
              }
            >
              <input
                ref={inputRef}
                type="file"
                id={styles.input_file_upload}
                multiple={true}
                onChange={handleChange}
              />
              <label
                id={styles.label_file_upload}
                htmlFor={styles.input_file_upload}
                className={dragActive ? styles.drag_active : ""}
              >
                <div>
                  <p>Перетащите файл</p>
                  <p style={{ padding: "0.25em" }}>или</p>
                  <button
                    className={styles.upload_button}
                    onClick={onButtonClick}
                  >
                    Кликните
                  </button>
                </div>
              </label>
              {dragActive && (
                <div
                  id={styles.drag_file_element}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                ></div>
              )}
            </form>
            {update === false ? (
              <form
                onSubmit={(e) =>
                  createFlower(e, user, flowerForm, setFlowerForm)
                }
              >
                <div className={styles.field}>
                  <label>НАЗВАНИЕ</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Имя"
                      value={flowerForm.name}
                      onChange={(e) =>
                        setFlowerForm({ ...flowerForm, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>КОЛИЧЕСТВО</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Количество"
                      value={flowerForm.quantity}
                      onChange={(e) =>
                        setFlowerForm({
                          ...flowerForm,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>ЦЕНА</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Цена"
                      value={flowerForm.price}
                      onChange={(e) =>
                        setFlowerForm({ ...flowerForm, price: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <button type="submit" className={styles.btn}>
                    ДОБАВИТЬ
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={updateOneflower}>
                <div className={styles.field}>
                  <label>НАЗВАНИЕ</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Имя"
                      value={flowerForm.name}
                      onChange={(e) =>
                        setFlowerForm({ ...flowerForm, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>КОЛИЧЕСТВО</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Количество"
                      value={flowerForm.quantity}
                      onChange={(e) =>
                        setFlowerForm({
                          ...flowerForm,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>ЦЕНА</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Цена"
                      value={flowerForm.price}
                      onChange={(e) =>
                        setFlowerForm({ ...flowerForm, price: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <button type="submit" className={styles.btn}>
                    ИЗМЕНИТЬ
                  </button>
                </div>
              </form>
            )}
          </div>
          {/* <div className={styles.savepdfflower} onClick={e=>onButtonClick1(`http://localhost:8000/pdf/bouquet${user.id}.pdf`)}>Сохранить букеты в .pdf</div> */}
        </div>
      </div>
    </div>
  );
});

export default BaseFlowers;
