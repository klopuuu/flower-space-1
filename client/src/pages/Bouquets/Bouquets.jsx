import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./Bouquets.module.css";
import { observer } from "mobx-react-lite";
import HomeMenu from "../../sections/HomeMenu/HomeMenu";
import imgclose from "../../assets/icons/icons-крестик.png";
import imgsearch from "../../assets/icons/free-icon-search.png";
import iconbtn from "../../assets/icons/icons-btn.png";
import { getAllFlowers } from "../../http/flowersApi";
import {
  getAllBouquet,
  deleteupdateBouquet,
  searchBouquet,
  bouquetcategory,
} from "../../http/bouquetAPI";
import { getAllCompositionWhere } from "../../http/compositionAPI";
import { getOneFlowers, updateFlowerforChange } from "../../http/flowersApi";
import { Context } from "../../index";
import iconadd from "../../assets/icons/free-icon-add.png";
import axios from "axios";
import deleteimg from "../../assets/icons/icons-delete.png";
import { createPdf } from "../../http/generatepdfAPI";

const Bouquets = observer(() => {
  const [btn, setBtn] = useState(false);
  const [btnadd, setBtnAdd] = useState(true);
  const [style, getStyle] = useState(0);
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const copy = Object.assign([], data);
  const [valflower, setValFlower] = useState([1]);
  const copyadd = Object.assign([], valflower);
  const [val, setVal] = useState("");
  const [valcol, setValcol] = useState(0);
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [info, setInfo] = useState([]);
  const [listFlower, setListFlower] = useState([]);
  const copyflower = Object.assign([], listFlower);
  const [listcolFlower, setListColFlower] = useState([1]);
  const [listcolFlowerAuthor, setListColFlowerAuthor] = useState([0]);
  const copycol = Object.assign([], listcolFlower);
  const priceflower = useRef(null);
  const idbouquet = useRef(null);
  const [sumPrice, setSumPrice] = useState(0);
  const [search, setSearch] = useState("");
  const [infosearch, setInfoSearch] = useState([]);
  const [typeBouquets, setTypeBouquets] = useState(1);
  const searchinput = useRef("");
  let imageDisplay = document.getElementById("imageDisplay");
  let error = document.getElementById("error");
  const [closeImage, setCloseImage] = useState(false);

  useEffect(() => {
    getAllBouquet(user.id, typeBouquets).then((res) => setInfo(res));
  });

  const handleMouseEnter = (id, index) => {
    getStyle(1);
    var elem = document.getElementById(index);
    elem.style.display = "block";
  };

  const handleMouseLeave = (id, index) => {
    getStyle(0);
    var elem = document.getElementById(index);
    elem.style.display = "none";
  };

  const AddBouquets = async () => {
    if (btnadd) {
      setBtnAdd(false);
      await getAllFlowers(user.id).then((res) => {
        res.map((res) => {
          copy.push(res);
        });
      });
      setData(copy);
      let htmlinput = document.getElementsByTagName("input");

      for (let i = 0; i < htmlinput.length; i++) {
        htmlinput[i].value = "";
      }
      setName("");
      setCloseImage(true);
      setValFlower([1]);
      changeName("");
      setVal("");
    } else {
      setBtnAdd(true);
      setData([]);
    }
  };

  const addFlower = async () => {
    quantity.current = 0;
    copyadd.push(1);
    setValFlower(copyadd);
  };

  const closeInput = () => {
    copyadd.pop();
    copyflower.pop();
    copycol.pop();
    setListColFlower(copycol);
    setListFlower(copyflower);
    setValFlower(copyadd);
  };

  const changeName = async (e) => {
    setName(e);
  };

  const [athorbouquetone, setAuthorBouquetOne] = useState([]);
  const [authorflower, setAuthorFlower] = useState([]);
  const copyauthorflower = Object.assign([], authorflower);
  const [imageboolean, setImageBoolean] = useState(false);
  const changeNameAuthor = async (e) => {
    var elem = document.getElementById("data11");
    var elem = elem.getElementsByTagName("option");
    const mas = [];
    setAuthorFlower([]);
    copyauthorflower.length = 0;
    console.log(copyauthorflower);
    for (const item of elem) {
      mas.push(item.value);
    }
    setName(e.value);
    if (mas.includes(e.value)) {
      await searchBouquet(e.value, user.id).then(async (res) => {
        setAuthorBouquetOne(res);
        setImageBoolean(true);
        await getAllCompositionWhere(user.id, res.id).then((result) =>
          result.map(
            async (res) =>
              await getOneFlowers(res.flowerId).then((i) =>
                copyauthorflower.push([i.name, res.qty])
              )
          )
        );
        setAuthorFlower(copyauthorflower);
      });
      e.style.border = "1px solid #39ff14";
    } else {
      setImageBoolean(false);
      e.style.border = "2px solid red";
    }
  };

  const quantity = useRef(0);

  const changeFlower = async (e, indexx) => {
    let id = data.find((emp) => emp.name === e.target.value);
    console.log(id);
    if (e.target.value === "") {
      document.getElementById(`${indexx}number`).disabled = true;
      //document.getElementById(`${indexx}image`).style.display = "none";
      document.getElementById(`${indexx}number`).value = "";
      booleanRef.current = false;
    } else if (e.target.value !== "" && id === undefined) {
      document.getElementById(`${indexx}number`).disabled = true;
      //document.getElementById(`${indexx}image`).style.display = "none";
      document.getElementById(`${indexx}number`).value = "";
      booleanRef.current = false;
    } else {
      document.getElementById(`${indexx}number`).disabled = false;
      //document.getElementById(`${indexx}image`).style.display = "block";
    }
    setVal(e.target.value);
    if (listFlower[indexx] === undefined) {
      if (listFlower.indexOf(id.id) !== -1) {
        e.target.style.border = "2px solid red";
        e.target.value = "";
        document.getElementById(`${indexx}number`).disabled = true;
        document.getElementById(`${indexx}image`).style.display = "none";
        document.getElementById(`${indexx}number`).value = "";
        booleanRef.current = false;
      } else {
        e.target.style.border = "1px solid #39ff14";
        copyflower.push(id.id);
        setListFlower(copyflower);
      }
    } else {
      copyflower[indexx] = id.id;
      listFlower[indexx] = id.id;
    }
    let summ = 0;
    let sum = 0;
    listFlower.map((res, index) => {
      getOneFlowers(parseInt(res)).then((res) => {
        sum = res.price * parseInt(listcolFlower[index]);
        summ = sum + summ;
        setSumPrice(summ);
        console.log("СУММА", summ);
      });
      if (sum === 0) {
        booleanRef.current = false;
      }
    });
  };

  const booleanRef = useRef(false);
  const changeColFlower = async (e, index) => {
    console.log(typeBouquets)
    if (typeBouquets === 2) {
      let idflower = listFlower[index];
      quantity.current = data.find((emp) => emp.id === idflower);
      e.target.max = quantity.current.quantity;
      console.log(e.target.max, e.target.value)
      if (e.target.value > parseInt(e.target.max) || e.target.value <= e.target.min) {
        e.target.style.border = "2px solid red";
        booleanRef.current = false;
        document.getElementById(`${index}image`).style.display = "none";
        booleanRef.current = false;
        setValcol(e.target.value);
        if (listcolFlower[index] === undefined) {
          copycol.push(e.target.value);
          setListColFlower(copycol);
        } else {
          copycol[index] = e.target.value;
          listcolFlower[index] = e.target.value;
        }
        let summ = 0;
        let indexx = 0;
        let sum = 0;
        for (const res of listFlower) {
          await getOneFlowers(parseInt(res)).then((res) => {
            sum = res.price * parseInt(listcolFlower[indexx]);
            summ = sum + summ;
            setSumPrice(summ);
          });
          indexx += 1;
          if (sum === 0) {
            booleanRef.current = false;
          }
          console.log("СУММА", summ);
        }
      } else {
        booleanRef.current = true;
        document.getElementById(`${index}image`).style.display = "flex";
        e.target.style.border = "1px solid #39ff14";
        setValcol(e.target.value);
        if (listcolFlower[index] === undefined) {
          copycol.push(e.target.value);
          setListColFlower(copycol);
        } else {
          copycol[index] = e.target.value;
          listcolFlower[index] = e.target.value;
        }
        let summ = 0;
        let indexx = 0;
        let sum = 0;
        for (const res of listFlower) {
          await getOneFlowers(parseInt(res)).then((res) => {
            sum = res.price * parseInt(listcolFlower[indexx]);
            summ = sum + summ;
            setSumPrice(summ);
          });
          indexx += 1;
          if (sum === 0) {
            booleanRef.current = false;
          }
        }
      }
    } else {
      if (e.target.value === "" || e.target.value <= 0) {
        e.target.style.border = "2px solid red";
        document.getElementById(`${index}image`).style.display = "none";
        booleanRef.current = false;
        setValcol(e.target.value);
        if (listcolFlower[index] === undefined) {
          copycol.push(e.target.value);
          setListColFlower(copycol);
        } else {
          copycol[index] = e.target.value;
          listcolFlower[index] = e.target.value;
        }
        let summ = 0;
        let indexx = 0;
        let sum = 0;
        for (const res of listFlower) {
          await getOneFlowers(parseInt(res)).then((res) => {
            sum = res.price * parseInt(listcolFlower[indexx]);
            summ = sum + summ;
            setSumPrice(summ);
          });
          index += 1;
          console.log(listcolFlower, listFlower);
          if (sum === 0) {
            booleanRef.current = false;
          }
        }
      } else {
        document.getElementById(`${index}image`).style.display = "flex";
        booleanRef.current = true;
        e.target.style.border = "1px solid #39ff14";
        setValcol(e.target.value);
        if (listcolFlower[index] === undefined) {
          copycol.push(e.target.value);
          setListColFlower(copycol);
        } else {
          copycol[index] = e.target.value;
          listcolFlower[index] = e.target.value;
        }
        let summ = 0;
        let indexx = 0;
        let sum = 0;
        for (const res of listFlower) {
          await getOneFlowers(parseInt(res)).then((res) => {
            sum = res.price * parseInt(listcolFlower[indexx]);
            summ = sum + summ;
            setSumPrice(summ);
          });
          index += 1;
          console.log(listcolFlower, listFlower);
          if (sum === 0) {
            booleanRef.current = false;
          }
        }
      }
    }
  };
  const create = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("avatar", filesimg);
    data.append("name", name);
    data.append("price", sumPrice);
    data.append("id_category", typeBouquets);

    await axios
      .post(
        `http://localhost:8000/api/bouquet/createbouquet/${user.id}`,
        data,
        {
          headers: {
            "content-type": "mulpipart/form-data",
          },
        }
      )
      .then((res) => {
        idbouquet.current = res.data.id;
        try {
          bouquetcategory(user.id, idbouquet.current, typeBouquets).then(
            (result) => {
              listFlower.map((flower, index) => {
                console.log(flower);
                try {
                  getOneFlowers(flower).then((res) => {
                    console.log(flower);
                    priceflower.current = res.price;
                    let sum =
                      priceflower.current * parseInt(listcolFlower[index]);
                    axios.post(
                      `http://localhost:8000/api/composition/createcomposition/${user.id}`,
                      {
                        qty: parseInt(listcolFlower[index]),
                        bouquetcategoryId: result.id,
                        flowerId: flower,
                        price: sum,
                      }
                    );
                    if (typeBouquets === 2) {
                      updateFlowerforChange(
                        res.id,
                        res.quantity - parseInt(listcolFlower[index])
                      );
                    }
                  });
                  changeName("");
                  setCloseImage(true);
                  setVal("");
                  setValFlower([1]);
                  let htmlinput = document.getElementsByTagName("input");

                  for (let i = 0; i < htmlinput.length; i++) {
                    htmlinput[i].value = "";
                  }
                } catch (error) {
                  alert(error.response.data.message);
                }
              });
            }
          );
        } catch (error) {
          alert(error.response.data.message);
        }
      })
      .catch((error) => alert(error.response.data.message));
  };

  const createAuthorForClient = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("price", sumPrice);
    data.append("id_category", typeBouquets);
    data.append("img", athorbouquetone.img);

    let img = athorbouquetone.img;
    let id_category = typeBouquets;
    let price = sumPrice;
    await axios
      .post(
        `http://localhost:8000/api/bouquet/createbouquetauthorforclient/${user.id}`,
        { name, id_category, price, img }
      )
      .then((res) => {
        idbouquet.current = res.data.id;
        console.log("AAAA", idbouquet.current, typeBouquets);
        try {
          bouquetcategory(user.id, idbouquet.current, typeBouquets).then(
            (result) => {
              listFlower.map((flower, index) => {
                console.log(flower);
                try {
                  getOneFlowers(flower).then((res) => {
                    priceflower.current = res.price;
                    let sum =
                      priceflower.current * parseInt(listcolFlower[index]);
                    axios.post(
                      `http://localhost:8000/api/composition/createcomposition/${user.id}`,
                      {
                        qty: parseInt(listcolFlower[index]),
                        bouquetcategoryId: result.id,
                        flowerId: flower,
                        price: sum,
                      }
                    );
                    if (typeBouquets === 2) {
                      updateFlowerforChange(
                        res.id,
                        res.quantity - parseInt(listcolFlower[index])
                      );
                    }
                  });
                  changeName("");
                  setCloseImage(true);
                  setVal("");
                  setValFlower([1]);
                  let htmlinput = document.getElementsByTagName("input");

                  for (let i = 0; i < htmlinput.length; i++) {
                    htmlinput[i].value = "";
                  }
                } catch (error) {
                  alert(error.response.data.message);
                }
              });
            }
          );
        } catch (error) {
          alert(error.response.data.message);
        }
      })
      .catch((error) => alert(error.response.data.message));
  };

  const click = async (e) => {
    e.preventDefault();
    if (typeBouquets === 2) {
      let idflower = listFlower[e.target.id];
      quantity.current = data.find((emp) => emp.id === idflower);
      e.target.max = quantity.current.quantity;
    }
    let summ = 0;
    listFlower.map((res, index) =>
      getOneFlowers(parseInt(res)).then((res) => {
        let sum = res.price * parseInt(listcolFlower[index]);
        summ = sum + summ;
        setSumPrice(summ);
      })
    );
  };

  const DeletedBouquets = async (e) => {
    e.preventDefault();
    const data = await deleteupdateBouquet(e.target.id)
      .then((res) => {
        alert("Букет успешно удален");
        searchinput.current.value = "";
        setInfoSearch([]);
        setSearch("");
      })
      .catch((error) => alert(error.response.data.message));
  };

  const changeSearch = async (e) => {
    setSearch(e.target.value);
  };

  const CleanInput = async (e) => {
    e.preventDefault();
    searchinput.current = e.target;
    e.target.value = "";
    setInfoSearch([]);
    setSearch("");
  };

  const SearchFlower = async (e) => {
    try {
      e.preventDefault();
      const data = await searchBouquet(search, user.id);
      setInfoSearch(data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const [dragActive, setDragActive] = useState(false);
  const [filesimg, handleFiles] = useState("");

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
      handleFiles(e.dataTransfer.files[0]);
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
    setCloseImage(false);
    let files = 0;

    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
      files = e.target.files;
      console.log(e.target);
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

  const changeTypeBouquets = function (e) {
    e.preventDefault();
    booleanRef.current = false;
    if (e.target.innerText === "Авторские букеты") {
      var elem = document.getElementById("type2");
      elem.style.backgroundImage = "none";
      elem.style.color = "black";
      elem.style.backgroundClip = "none";
      setTypeBouquets(1);
      e.target.style.backgroundImage =
        "linear-gradient(rgb(0, 183, 255), rgba(13, 255, 0, 0.874))";
      e.target.style.color = "transparent";
      e.target.style.backgroundClip = "text";
      changeName("");
      setCloseImage(true);
      setVal("");
      setValFlower([1]);
      setAuthorBouquetOne([]);
      setImageBoolean(false);
      getauthorbouquet.current = true;
      authorbouquet.current = [];
      let htmlinput = document.getElementsByTagName("input");

      for (let i = 0; i < htmlinput.length; i++) {
        htmlinput[i].value = "";
      }
    } else {
      var elem = document.getElementById("type1");
      elem.style.backgroundImage = "none";
      elem.style.color = "black";
      elem.style.backgroundClip = "none";
      setTypeBouquets(2);
      console.log(e.target);
      e.target.style.backgroundImage =
        "linear-gradient(rgb(0, 183, 255), rgba(13, 255, 0, 0.874))";
      e.target.style.color = "transparent";
      e.target.style.backgroundClip = "text";
      changeName("");
      setCloseImage(true);
      setVal("");
      setValFlower([1]);
      setAuthorBouquetOne([]);
      setImageBoolean(false);
      getauthorbouquet.current = true;
      authorbouquet.current = [];
      let htmlinput = document.getElementsByTagName("input");

      for (let i = 0; i < htmlinput.length; i++) {
        htmlinput[i].value = "";
      }
    }
  };

  const getauthorbouquet = useRef(true);
  const authorbouquet = useRef([]);
  const getAuthorBouquet = async (e) => {
    changeName("");
    setCloseImage(true);
    setVal("");
    setValFlower([1]);
    let htmlinput = document.getElementsByTagName("input");

    for (let i = 0; i < htmlinput.length; i++) {
      htmlinput[i].value = "";
    }
    getauthorbouquet.current = false;
    await getAllBouquet(user.id, 1).then((res) => {
      authorbouquet.current = res;
    });
  };

  const getClientBouquet = () => {
    getauthorbouquet.current = true;

    setImageBoolean(false);
    copyauthorflower.length = 0;
    setAuthorFlower([]);
  };


  const onButtonClick1 = () => {
    createPdf(user.id).then((res) => {
      alert("PDF успешно загружен")
      createPDF(`http://localhost:8000/pdf/bouquet${user.id}.pdf`)})
  };

  const createPDF = (file) => {
    fetch(file).then((response) => {
      console.log(file)
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
  }


  return (
    <div className={styles.bouquets}>
      <div className={styles.bouquets__container}>
        <div className={styles.bouquets__body}>
          <div className={styles.bouquets__menu}>
            <HomeMenu />
          </div>
          <div className={styles.bouquets__item}>
            <div className={styles.bouquets__container_flex}>
              <div className={styles.btn__flex}>
                <p className={styles.bouquets__paragraph}>БУКЕТЫ С ЦВЕТАМИ</p>
                <div
                  className={styles.btn__menu}
                  style={btn ? { display: "block" } : { display: "none" }}
                >
                  <p
                    className={styles.menu__item}
                    onClick={(e) => changeTypeBouquets(e)}
                    style={{
                      backgroundImage:
                        "linear-gradient(rgb(0, 183, 255), rgba(13, 255, 0, 0.874))",
                      color: "transparent",
                      backgroundClip: "text",
                    }}
                    id="type1"
                  >
                    Авторские букеты
                  </p>
                  <p
                    className={styles.menu__item}
                    onClick={(e) => changeTypeBouquets(e)}
                    id="type2"
                  >
                    Букеты клиентов
                  </p>
                </div>
              </div>
              <img
                src={iconbtn}
                className={styles.bouquets__btn}
                onClick={(e) => (btn ? setBtn(false) : setBtn(true))}
                style={btn ? { rotate: "270deg" } : { rotate: "90deg" }}
              />
              <div className={styles.bouquets__search}>
                <img
                  src={imgsearch}
                  className={styles.bouquets__flower}
                  onClick={SearchFlower}
                />
                <input
                  list="data"
                  className={styles.bouquets__form_search}
                  placeholder="Пример: Букет из роз"
                  onChange={(e) => changeSearch(e)}
                  onClick={CleanInput}
                />
                <datalist id="data">
                  {info.map((op) => (
                    <option id={op.id}>{op.name}</option>
                  ))}
                </datalist>
              </div>
            </div>
            <div
              className={styles.flower__list}
              style={btn ? { height: "480px" } : { height: "520px" }}
            >
              {infosearch.length === 0 ? (
                info.map((info, index) => (
                  <div
                    className={styles.flower__info}
                    onMouseEnter={(e) =>
                      handleMouseEnter(e.currentTarget, index)
                    }
                    onMouseLeave={(id) => handleMouseLeave(id, index)}
                  >
                    <div className={styles.img__block}>
                      <img
                        className={styles.flower__img}
                        src={`http://localhost:8000/${info.img}`}
                        id={info.id}
                      />
                    </div>
                    <div className={styles.flower__change} id={index}>
                      <img
                        src={deleteimg}
                        className={styles.flower__deleted}
                        onClick={(e) => DeletedBouquets(e)}
                        id={info.id}
                      />
                    </div>
                    <p>{info.name}</p>
                    <p>{info.price} &#8381;</p>
                  </div>
                ))
              ) : (
                <div
                  className={styles.flower__info}
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(id) => handleMouseLeave(id)}
                >
                  <div className={styles.img__block}>
                    <img
                      className={styles.flower__img}
                      src={`http://localhost:8000/${infosearch.img}`}
                      id={infosearch.id}
                    />
                  </div>
                  <div
                    className={styles.flower__change}
                    style={
                      style === 1 ? { display: "block" } : { display: "none" }
                    }
                  >
                    <img
                      src={deleteimg}
                      className={styles.flower__deleted}
                      onClick={(e) => DeletedBouquets(e)}
                      id={infosearch.id}
                    />
                  </div>
                  <p>{infosearch.name}</p>
                  <p>{infosearch.price} &#8381;</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.add_client}>
              <div className={styles.add_client__flex}>
                <p className={styles.add_client__title}>Новый букет</p>
                <img
                  src={iconbtn}
                  className={styles.bouquets__btn}
                  onClick={(e) => AddBouquets()}
                  style={btnadd ? { rotate: "90deg" } : { rotate: "270deg" }}
                />
              </div>
              {getauthorbouquet.current ? (
                <button
                  className={styles.add_client__author}
                  style={
                    btnadd || typeBouquets === 1
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  onClick={getAuthorBouquet}
                >
                  ВЫБРАТЬ ИЗ АВТОРСКИХ БУКЕТОВ
                </button>
              ) : (
                <button
                  className={styles.add_client__client}
                  style={
                    btnadd || typeBouquets === 1
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  onClick={getClientBouquet}
                >
                  СОЗДАТЬ БУКЕТ
                </button>
              )}
              <span
                className={styles.add_client__span}
                style={
                  btnadd || typeBouquets === 1
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                ИЛИ
              </span>
              <div
                id="imageDisplay"
                src={filesimg}
                style={
                  btnadd ||
                  closeImage === true ||
                  getauthorbouquet.current === false
                    ? { display: "none" }
                    : { display: "block" }
                }
              ></div>
              <form
                id={styles.form_file_upload}
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
                style={
                  btnadd || getauthorbouquet.current === false
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
                <div id={"error"}></div>
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
              {getauthorbouquet.current ? (
                <form
                  style={btnadd ? { display: "none" } : { display: "block" }}
                  onSubmit={create}
                >
                  <div className={styles.field}>
                    <label>НАЗВАНИЕ БУКЕТА</label>
                    <div className={styles.control} id="name">
                      <input
                        type="text"
                        style={{ border: "1px solid #39ff14" }}
                        className="input"
                        placeholder="НАЗВАНИЕ"
                        value={name}
                        onChange={(e) => changeName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>ДОБАВИТЬ ЦВЕТЫ</label>
                    {valflower.map((add, index) => (
                      <div className={styles.control}>
                        <input
                          type="text"
                          list="data1"
                          onChange={(e) => changeFlower(e, index)}
                          placeholder="ЦВЕТОК"
                        />
                        <datalist id="data1" onClick={click}>
                          {data.map((op) => (
                            <option id={op.id}>{op.name}</option>
                          ))}
                        </datalist>
                        <input
                          className={styles.control__col}
                          type="number"
                          onClick={click}
                          min="0"
                          onChange={(e) => changeColFlower(e, index)}
                          id={`${index}number`}
                          disabled
                        />
                        <div
                          className={styles.controol__flex}
                          id={`${index}image`}
                          style={{ display: "none" }}
                        >
                          <img
                            src={iconadd}
                            className={styles.control__addimg}
                            onClick={addFlower}
                            style={
                              valflower.length === 1 ||
                              valflower.length - 1 === index
                                ? { display: "block", marginTop: "8px" }
                                : { display: "none" }
                            }
                          />
                          <img
                            src={imgclose}
                            className={styles.control__addimg}
                            onClick={closeInput}
                            style={
                              valflower.length !== 1 &&
                              valflower.length - 1 === index
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.field}>
                    {booleanRef.current === true ? (
                      <button type="submit" className={styles.btn}>
                        ДОБАВИТЬ
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={styles.btn}
                        style={{ backgroundColor: "grey" }}
                        disabled
                      >
                        ДОБАВИТЬ
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <form
                  style={btnadd ? { display: "none" } : { display: "block" }}
                  onSubmit={createAuthorForClient}
                >
                  <div className={styles.field}>
                    <label>ВЫБЕРИТЕ БУКЕТ</label>
                    <div className={styles.control}>
                      <input
                        type="text"
                        list="data11"
                        className="input"
                        placeholder="НАЗВАНИЕ"
                        onChange={(e) => changeNameAuthor(e.target)}
                      />
                      <datalist id="data11" onClick={CleanInput}>
                        {authorbouquet.current.map((op) => (
                          <option id={op.id}>{op.name}</option>
                        ))}
                      </datalist>
                    </div>
                    <img src={iconbtn} className={styles.control__image} />
                  </div>
                  <div
                    className={styles.field}
                    style={
                      imageboolean === false
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <div
                      className={styles.field__image}
                      style={
                        imageboolean === false
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      <img
                        src={`http://localhost:8000/${athorbouquetone.img}`}
                      />
                    </div>
                    <p className={styles.field__label}>
                      ИЗ ЧЕГО СОСТОИТ БУКЕТ:
                    </p>
                    <div className={styles.field__info}>
                      {authorflower.map((add, index) => (
                        <p className={styles.field__info_item}>
                          {add[0]} - {add[1]} шт.
                        </p>
                      ))}
                    </div>
                    <div className={styles.field}>
                      <label>ДОБАВИТЬ ЦВЕТЫ</label>
                      {valflower.map((add, index) => (
                        <div className={styles.control}>
                          <input
                            type="text"
                            list="data1"
                            onChange={(e) => changeFlower(e, index)}
                            placeholder="ЦВЕТОК"
                          />
                          <datalist id="data1" onClick={click}>
                            {data.map((op) => (
                              <option id={op.id}>{op.name}</option>
                            ))}
                          </datalist>
                          <input
                            className={styles.control__col}
                            type="number"
                            onClick={click}
                            min="0"
                            onChange={(e) => changeColFlower(e, index)}
                            id={`${index}number`}
                            disabled
                          />
                          <div
                            className={styles.controol__flex}
                            id={`${index}image`}
                            style={{ display: "none" }}
                          >
                            <img
                              src={iconadd}
                              className={styles.control__addimg}
                              onClick={addFlower}
                              style={
                                valflower.length === 1 ||
                                valflower.length - 1 === index
                                  ? { display: "block", marginTop: "8px" }
                                  : { display: "none" }
                              }
                            />
                            <img
                              src={imgclose}
                              className={styles.control__addimg}
                              onClick={closeInput}
                              style={
                                valflower.length !== 1 &&
                                valflower.length - 1 === index
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className={styles.field}
                    style={
                      imageboolean === false
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    {booleanRef.current === true ? (
                      <button type="submit" className={styles.btn}>
                        ДОБАВИТЬ
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={styles.btn}
                        style={{ backgroundColor: "grey" }}
                        disabled
                      >
                        ДОБАВИТЬ
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
            {typeBouquets === 1 ? <div className={styles.savepdfflower} onClick={e=>onButtonClick1()}>Сохранить в .pdf</div> : <div></div> }
            
          </div>
        </div>
      </div>
    </div>
  );
});

export default Bouquets;
