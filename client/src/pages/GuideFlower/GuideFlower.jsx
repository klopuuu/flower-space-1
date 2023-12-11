import styles from "./GuideFlower.module.css";
import { observer } from "mobx-react-lite";
import { useState, useContext, useRef } from "react";
import HomeMenu from "../../sections/HomeMenu/HomeMenu";
import imgsearch from "../../assets/icons/free-icon-search.png";
import deleteimg from "../../assets/icons/icons-delete.png";
import closeimg from "../../assets/icons/icons-крестик.png";
import axios from "axios";
import { Context } from "../../index";
import { getAllGuidFlower, searchGuid } from "../../http/guideApi";
const GuideFlower = observer(() => {
  const [name, setName] = useState("");
  const [descr, setDescr] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [filesimg, handleFiles] = useState("");
  const [imageGuide, setImageGuide] = useState(false);
  const inputRef = useRef(null);
  const [style, getStyle] = useState(0);
  const { user } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [article, setArticle] = useState(false);
  const searchinput = useRef("");
  const [infosearch, setInfoSearch] = useState([]);
  const [search, setSearch] = useState("");

  getAllGuidFlower().then((res) => {
    setInfo(res.reverse());
  });

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
    let imageDisplay = document.getElementById("imageDisplay");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
      files = e.target.files;
    }
    setDragActive(false);
    console.log(imageDisplay);
    imageDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
    setImageGuide(true);
  };

  const handleChange = function (e) {
    e.preventDefault();
    let error = document.getElementById("error");
    let imageDisplay = document.getElementById("imageDisplay");
    let files = 0;
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
      files = e.target.files;
    }
    console.log(imageDisplay);
    imageDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
    setImageGuide(true);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const fileHandler = (file, name, type) => {
    let error = document.getElementById("error");
    let imageDisplay = document.getElementById("imageDisplay");
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
      imageDisplayStyle.style.width = "400px";
      imageDisplayStyle.style.height = "400px";
      imageDisplayStyle.style.position = "relative";
      imageDisplayStyle.style.marginTop = "10px";
      let image = document.getElementsByTagName("figure")[0];
      let imagestyle = image.getElementsByTagName("img")[0];
      imagestyle.style.width = "100%";
      imagestyle.style.height = "100%";
      imagestyle.style.borderRadius = "20px";
      imagestyle.style.border = "1px dashed #39ff14";
      imagestyle.style.objectFit = "cover";
    };
  };

  const changeName = (e) => {
    setName(e);
  };

  const changeDescrip = (e) => {
    setDescr(e);
  };

  const handleMouseEnter = (id, index) => {
    getStyle(1);
    var elem = document.getElementById(index);
    console.log(elem);
    elem.style.display = "block";
  };

  const handleMouseLeave = (id, index) => {
    getStyle(0);
    var elem = document.getElementById(index);
    elem.style.display = "none";
  };

  const createguideflower = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("avatar", filesimg);
      data.append("name", name);
      data.append("descripe", descr);
      data.append("userId", user.id);

      await axios.post(
        `http://localhost:8000/api/guideflower/createguide`,
        data,
        {
          headers: {
            "content-type": "mulpipart/form-data",
          },
        }
      );
      changeName("");
      changeDescrip("");
      setImageGuide(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const CleanInput = async (e) => {
    e.preventDefault();
    searchinput.current = e.target;
    e.target.value = "";
    setInfoSearch([]);
    setSearch("");
  };

  const SearchGuid = async (e) => {
    e.preventDefault();
    console.log(search);
    await searchGuid(search)
      .then((res) => {
        setInfoSearch(res);
        console.log(res);
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div className={styles.guideflower}>
      <div className={styles.guideflower__container}>
        <div className={styles.guideflower__body}>
          <div className={styles.guideflower__menu}>
            <HomeMenu />
          </div>
          <div className={styles.guideflower__client}>
            <div className={styles.container_flex}>
              <p className={styles.guidflower__paragraph}>
                СТАТЬИ О ФЛОРИСТИКЕ
              </p>
              <div className={styles.guidflower__search}>
                <img
                  src={imgsearch}
                  className={styles.search_guidflower}
                  onClick={SearchGuid}
                />
                <input
                  list="data"
                  className={styles.form_search}
                  placeholder="Навание статьи"
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
            {infosearch.length === 0 ? (
              <div className={styles.guideflower__list}>
                <img
                  src={deleteimg}
                  className={styles.guideflower__article_image}
                  onClick={(e) => setArticle(true)}
                  style={
                    article === false
                      ? { display: "block" }
                      : { display: "none" }
                  }
                />
                <img
                  src={closeimg}
                  className={styles.guideflower__article_image_close}
                  onClick={(e) => setArticle(false)}
                  style={
                    article === false
                      ? { display: "none" }
                      : { display: "block" }
                  }
                ></img>
                <div className={styles.guideflower__info}>
                  <div
                    className={styles.guideflower__guid_add}
                    style={
                      article === false
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <div className={styles.guideflower__flex}>
                      <div
                        id="imageDelete"
                        onMouseEnter={(e) =>
                          handleMouseEnter(e.currentTarget, e.target.id)
                        }
                        onMouseLeave={(id) => handleMouseLeave(id)}
                      >
                        <div id="error"></div>
                        <div
                          id="imageDisplay"
                          src={filesimg}
                          style={
                            imageGuide
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        ></div>
                        <div
                          className={styles.flower__change}
                          style={
                            style === 1
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <img
                            src={deleteimg}
                            className={styles.flower__deleted}
                            onClick={(e) => setImageGuide(false)}
                          />
                        </div>
                      </div>
                      <form
                        id={styles.form_file_upload}
                        onDragEnter={handleDrag}
                        onSubmit={(e) => e.preventDefault()}
                        style={
                          imageGuide
                            ? { display: "none" }
                            : { display: "block" }
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
                      <div className={styles.guidflower__description}>
                        <form
                          className={styles.guideflower__form}
                          onSubmit={createguideflower}
                        >
                          <div className={styles.field}>
                            <label>✧</label>
                            <div className={styles.control_name}>
                              <input
                                type="text"
                                className="input"
                                placeholder="НАЗВАНИЕ СТАТЬИ"
                                value={name}
                                onChange={(e) => changeName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={styles.field}>
                            <label>✧</label>
                            <div className={styles.control_description}>
                              <textarea
                                type="text"
                                className="input"
                                value={descr}
                                cols={400}
                                rows={200}
                                maxLength="1200"
                                placeholder="СОДЕРЖИМОЕ ВАШЕЙ СТАТЬИ"
                                onChange={(e) => changeDescrip(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={styles.field}>
                            <button type="submit" className={styles.btn}>
                              ДОБАВИТЬ
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {info.map((res) => (
                    <div className={styles.guideflower__guid_add}>
                      <div className={styles.guidflower__guid_image}>
                        <img src={`http://localhost:8000/${res.img}`} />
                      </div>
                      <div className={styles.guideflower__guid_info}>
                        <div className={styles.guideflower__guid_name}>
                          {res.name}
                        </div>
                        <div className={styles.guideflower__guid_descr}>
                          <textarea
                            disabled="true"
                            value={res.descripe}
                            className={styles.guideflower__guid_input}
                          ></textarea>
                        </div>
                        <div className={styles.guideflower__guid_author}>
                          Автор статьи - {res.nameuser}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.guideflower__list}>
                <img
                  src={deleteimg}
                  className={styles.guideflower__article_image}
                  onClick={() => setArticle(true)}
                  style={
                    article === false
                      ? { display: "block" }
                      : { display: "none" }
                  }
                />
                <img
                  src={closeimg}
                  className={styles.guideflower__article_image_close}
                  onClick={() => setArticle(false)}
                  style={
                    article === false
                      ? { display: "none" }
                      : { display: "block" }
                  }
                ></img>
                <div
                  className={styles.guideflower__info}
                >
                  <div
                    className={styles.guideflower__guid_add}
                    style={
                      article === false
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <div className={styles.guideflower__flex}>
                      <div
                        id="imageDelete"
                        onMouseEnter={(e) =>
                          handleMouseEnter(e.currentTarget, e.target.id)
                        }
                        onMouseLeave={(id) => handleMouseLeave(id)}
                      >
                        <div id="error"></div>
                        <div
                          id="imageDisplay"
                          src={filesimg}
                          style={
                            imageGuide
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        ></div>
                        <div
                          className={styles.flower__change}
                          style={
                            style === 1
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <img
                            src={deleteimg}
                            className={styles.flower__deleted}
                            onClick={(e) => setImageGuide(false)}
                          />
                        </div>
                      </div>
                      <form
                        id={styles.form_file_upload}
                        onDragEnter={handleDrag}
                        onSubmit={(e) => e.preventDefault()}
                        style={
                          imageGuide
                            ? { display: "none" }
                            : { display: "block" }
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
                      <div className={styles.guidflower__description}>
                        <form
                          className={styles.guideflower__form}
                          onSubmit={createguideflower}
                        >
                          <div className={styles.field}>
                            <label>✧</label>
                            <div className={styles.control_name}>
                              <input
                                type="text"
                                className="input"
                                placeholder="НАЗВАНИЕ СТАТЬИ"
                                value={name}
                                onChange={(e) => changeName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={styles.field}>
                            <label>✧</label>
                            <div className={styles.control_description}>
                              <textarea
                                type="text"
                                className="input"
                                maxLength="1200"
                                cols={400}
                                rows={200}
                                placeholder="СОДЕРЖИМОЕ ВАШЕЙ СТАТЬИ"
                                onChange={(e) => changeDescrip(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={styles.field}>
                            <button type="submit" className={styles.btn}>
                              ДОБАВИТЬ
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className={styles.guideflower__guid_add}>
                    <div className={styles.guidflower__guid_image}>
                      <img src={`http://localhost:8000/${infosearch.img}`} />
                    </div>
                    <div className={styles.guideflower__guid_info}>
                      <div className={styles.guideflower__guid_name}>
                        {infosearch.name}
                      </div>
                      <div className={styles.guideflower__guid_descr}>
                        <textarea
                          disabled="true"
                          value={infosearch.descripe}
                          className={styles.guideflower__guid_input}
                        ></textarea>
                      </div>
                      <div className={styles.guideflower__guid_author}>
                        Автор статьи - {infosearch.nameuser}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default GuideFlower;
