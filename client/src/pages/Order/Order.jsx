import styles from "./Order.module.css";
import { observer } from "mobx-react-lite";
import HomeMenu from "../../sections/HomeMenu/HomeMenu";
import { useState, useContext, useRef, useEffect } from "react";
import imgsearch from "../../assets/icons/free-icon-search.png";
import { getAllclient, searchClient, getOneClient } from "../../http/clientAPI";
import {
  getAllBouquet,
  getonebouquetcategory,
  getonebouquet,
  searchBouquetCategories,
} from "../../http/bouquetAPI";
import { getAllStatus, getOneStatus, getOneStatusId } from "../../http/status";
import {
  createOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  getAllOrderWhere,
} from "../../http/order";
import { getAllCompositionWhere } from "../../http/compositionAPI";
import { getAllReseiving, getOneReseiving } from "../../http/reseiving";
import { Context } from "../../index";
import React from "react";
import deleteimg from "../../assets/icons/icons-delete.png";
import closeimg from "../../assets/icons/icons-крестик.png";
import loop from "../../assets/icons/free-icon-loop.png";
import { getOneFlowers } from "../../http/flowersApi";
import "react-phone-number-input/style.css";

const Order = observer(() => {
  var offset = +3;
  var today = new Date(new Date().getTime() + offset * 3600 * 1000)
    .toISOString()
    .slice(0, 10);
  const [article, setArticle] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data_reg, setDataReg] = useState(today);
  const [data_res, setDataRes] = useState(today);
  const [receiving, setReceiving] = useState("Без доставки");
  const status = useRef("Принято в работу");
  const [adress, setAdress] = useState("");
  const [bouquet, setBouquet] = useState("");
  const { user } = useContext(Context);
  const [userinfo, setUserInfo] = useState([]);
  const [bouquetinfo, setBouquetInfo] = useState([]);
  const [reseivinginfo, setReseivingInfo] = useState([]);
  const [statusInfo, setStatusInfo] = useState([]);
  const [statusInfoOrder, setStatusInfoOrder] = useState([]);
  const copystatus = Object.assign([], statusInfoOrder);
  const info = useRef([]);
  const telephoneref = useRef("");
  const bouquetref = useRef("");
  const pricebouquetref = useRef("");
  const reseivingref = useRef("");
  const [descrorder, setDescrOrder] = useState(false);
  const [client, setClient] = useState([]);
  const copyclient = Object.assign([], client);
  const [tlf, setTlf] = useState([]);
  const copytlf = Object.assign([], tlf);
  const [bouquetord, setBouquetOrd] = useState([]);
  const copybouquet = Object.assign([], bouquetord);
  const oneorder = useRef("");
  const onebouquet = useRef("");
  const oneclient = useRef("");
  const onereseiving = useRef("");
  const [allcomposition, setAllComposition] = useState([]);
  const copyallcomposition = Object.assign([], allcomposition);
  const [search, setSearch] = useState("");
  const infosearch = useRef([]);
  const [price, setPrice] = useState(0);

  const InfoUser = async () => {
    await getAllclient(user.id).then((res) => {
      setUserInfo(res);
    });
    getClickInfo();
  };

  const InfoBouquet = async () => {
    await getAllBouquet(user.id, 2).then((res) => {
      setBouquetInfo(res);
    });
    getClickInfo();
  };

  async function getItemInfo(item) {
    await getOneClient(item.clientbaseId).then((data) => {
      copyclient.push(data.name);
      copytlf.push(data.phonenumber);
    });
    await getonebouquetcategory(user.id, item.bouquetcategoryId).then(
      async (res) => {
        await getonebouquet(user.id, res.bouquetId).then((date) =>
          copybouquet.push(date.name)
        );
      }
    );
    await getOneStatusId(item.statusorderId).then((res) =>
      copystatus.push(res.status)
    );
    console.log(copybouquet);
  }

  const changeStatus = async (e, id) => {
    status.current = e.target.value;
    await getOneStatus(status.current).then(async (res) => {
      await updateOrder(id, res.id);
    });
  };

  async function getClickInfo() {
    copybouquet.length = 0;
    copyclient.length = 0;
    copytlf.length = 0;
    copystatus.length = 0;
    await getAllBouquet(user.id, 2).then((res) => {
      setBouquetInfo(res);
    });
    if (infosearch.current.length === 0) {
      await getAllOrder(user.id, true).then((data) => {
        info.current = data;
      });
    } else {
      info.current = infosearch.current;
    }
    for (const item of info.current) {
      await getItemInfo(item);
    }
    setClient(copyclient);
    setTlf(copytlf);
    setBouquetOrd(copybouquet);
    setStatusInfoOrder(copystatus);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllStatus().then((data) => setStatusInfo(data));
      await getAllReseiving().then((res) => {
        setReseivingInfo(res);
      });
      await getAllclient(user.id).then((res) => {
        setUserInfo(res);
      });
    };
    fetchData();
  }, []);

  const CreateOrder = async (e) => {
    e.preventDefault();
    if (name === "" || bouquet === "") {
      alert("Заполниет поля с данными о клиенете и букете");
    } else {
      await searchClient(name)
        .then((res) => (telephoneref.current = res.id))
        .catch((error) => alert(error.response.data.message));
      await searchBouquetCategories(bouquet, user.id)
        .then((res) => {
          bouquetref.current = res.id;
          pricebouquetref.current = parseInt(res.price) + parseInt(price);
          console.log(pricebouquetref.current);
        })
        .catch((error) => alert(error.response.data.message));

      await getOneReseiving(receiving).then(
        (res) => (reseivingref.current = res.id)
      );
      await createOrder(
        user.id,
        description,
        data_reg,
        data_res,
        pricebouquetref.current,
        adress,
        telephoneref.current,
        bouquetref.current,
        reseivingref.current,
        1
      )
        .then((res) => {
          getClickInfo();
          setArticle(false);
          setName("");
          setBouquet("");
          setDescription("");
          setDataReg(today);
          setDataRes(today);
          setAdress("");
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleMouseEnter = (id, index) => {
    var elem = document.getElementById(index);
    elem.style.display = "block";
  };

  const handleMouseLeave = (id, index) => {
    var elem = document.getElementById(index);
    elem.style.display = "none";
  };

  const OrderInfo = async (e) => {
    copyallcomposition.length = 0;
    await getOneOrder(user.id, e).then(async (res) => {
      oneorder.current = res;
      await getonebouquetcategory(user.id, res.bouquetcategoryId).then(
        async (res) => {
          await getonebouquet(user.id, res.bouquetId).then(async (date) => {
            onebouquet.current = date;
            await getAllCompositionWhere(user.id, date.id).then((res) => {
              res.map(async (result1) => {
                await getOneFlowers(result1.flowerId).then((result2) => {
                  copyallcomposition.push([result2.name, result1.qty]);
                  console.log(copyallcomposition);
                });
              });
              setAllComposition(copyallcomposition);
            });
          });
        }
      );
      await getOneClient(res.clientbaseId).then((data) => {
        oneclient.current = data;
      });
      res.receivingId === 1
        ? (onereseiving.current = "Без доставки")
        : (onereseiving.current = "Доставка");
    });
    console.log("PSPPS", oneorder.current.price);
    setDescrOrder(true);
  };

  const CleanInput = async (e) => {
    e.preventDefault();
    e.target.value = "";
    infosearch.current = [];
    setSearch("");
    getClickInfo();
  };

  const SearchOrder = async (e) => {
    try {
      e.preventDefault();
      const data = await getAllOrderWhere(user.id, search);
      infosearch.current = data;
      getClickInfo();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const getTrueArticle = async (e) => {
    getClickInfo();
    setArticle(true);
  };

  const getFalseArticle = async (e) => {
    getClickInfo();
    setArticle(false);
  };

  const isValid = useRef(false);
  const getSearch = async (e) => {
    var pattern = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    console.log(pattern.test(e.value));
    if (!pattern.test(e.value)) {
      e.style.border = "3px solid red";
    } else if (e.value.length != 11) {
      e.style.border = "3px solid red";
    }
    if (pattern.test(e.value) && e.value.length === 11) {
      e.style.border = "none";
      setSearch(e.value);
    }
  };
  return (
    <div className={styles.order}>
      <div className={styles.order__container}>
        <div className={styles.order__body}>
          <div className={styles.order__menu}>
            <HomeMenu />
          </div>
          <div className={styles.order__data}>
            <div className={styles.container_flex}>
              <p className={styles.order__paragraph}>ЗАКАЗЫ</p>
              <img
                src={deleteimg}
                className={styles.order__article_image}
                onClick={(e) => getTrueArticle(e)}
                style={
                  article === false ? { display: "block" } : { display: "none" }
                }
              />
              <div className={styles.order__search}>
                <img
                  src={imgsearch}
                  className={styles.search__order}
                  onClick={SearchOrder}
                />
                <input
                  list="data"
                  type="tel"
                  className={styles.form__search}
                  placeholder="Поиск по номеру тел."
                  onChange={(e) => getSearch(e.target)}
                  onClick={CleanInput}
                />
                <datalist id="data">
                  {userinfo.map((res) => (
                    <option>{res.phonenumber}</option>
                  ))}
                </datalist>
              </div>
            </div>
            <div
              className={styles.order__criteria}
              style={
                article === false ? { display: "block" } : { display: "none" }
              }
            >
              <ul
                style={
                  descrorder === false
                    ? { display: "flex" }
                    : { display: "none" }
                }
              >
                <li>Дата заказа</li>
                <li>Клиент</li>
                <li>Номер тел.</li>
                <li>Букет</li>
                <li>Дата получения</li>
                <li>Статус</li>
              </ul>
            </div>
            <div className={styles.order__list}>
              <img
                style={
                  (article === false) & (descrorder === false)
                    ? { display: "block" }
                    : { display: "none" }
                }
                src={loop}
                className={styles.order__imageloop}
                onClick={getClickInfo}
              />
              <div className={styles.order__add}>
                <div className={styles.order__add_icons}>
                  <img
                    src={closeimg}
                    className={styles.order__article_image_close}
                    onClick={(e) => getFalseArticle(e)}
                    style={
                      article === false
                        ? { display: "none " }
                        : { display: "block" }
                    }
                  />
                </div>
                <div className={styles.order__add_info_order}>
                  <form
                    style={
                      article === false
                        ? { display: "none" }
                        : { display: "block" }
                    }
                    onSubmit={CreateOrder}
                  >
                    <label className={styles.order__add_label}>
                      Данные заказа
                    </label>
                    <div className={styles.order__add_info}>
                      <div className={styles.order__add_input}>
                        <input
                          list="data1"
                          placeholder="Тел. клиента"
                          value={name}
                          onClick={InfoUser}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <datalist id="data1">
                          {userinfo.map((res) => (
                            <option>{res.phonenumber}</option>
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <div className={styles.order__add_info}>
                      <div className={styles.order__add_input}>
                        <input
                          list="data2"
                          placeholder="Букет"
                          value={bouquet}
                          onClick={InfoBouquet}
                          onChange={(e) => setBouquet(e.target.value)}
                        />
                        <datalist id="data2">
                          {bouquetinfo.map((res) => (
                            <option id={res.id}>{res.name}</option>
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <div className={styles.order__add_info}>
                      <div className={styles.order__add_input}>
                        <textarea
                          type="text"
                          className={styles.input_addly}
                          placeholder="Доп. описание"
                          value={description}
                          maxLength="120"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className={styles.order__add_info}>
                      <div className={styles.order__add_input}>
                        <label>Дата заказа</label>
                        <input
                          className={styles.order__add_datereq}
                          type="date"
                          placeholder="Дата заказа"
                          value={data_reg}
                          onChange={(e) => setDataReg(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className={styles.order__add_info}>
                      <div className={styles.order__add_input}>
                        <label>Дата выдачи</label>
                        <input
                          className={styles.order__add_dateres}
                          type="date"
                          placeholder="Дата выдачи"
                          value={data_res}
                          onChange={(e) => setDataRes(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className={styles.order__add_info}>
                      <div className={styles.order__add_input}>
                        <select
                          id="data4"
                          className={styles.order__add_select}
                          onChange={(e) => setReceiving(e.target.value)}
                        >
                          {reseivinginfo.map((res) => (
                            <option selected={res.id === 1 ? "selected" : null}>
                              {res.choisercv}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div
                      className={styles.order__add_info}
                      style={
                        receiving === "Доставка"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <div className={styles.order__add_input}>
                        <input
                          type="text"
                          placeholder="Адрес"
                          value={adress}
                          onChange={(e) => setAdress(e.target.value)}
                        />
                      </div>
                      <div className={styles.order__add_price}>
                        <label>Стоимость доставки</label>
                        <input
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        &#8381;
                      </div>
                    </div>
                    <div className={styles.order__add_info}>
                      <button type="submit" className={styles.btn}>
                        ДОБАВИТЬ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {infosearch.current.length === 0 ? (
                <div
                  className={styles.order__view}
                  style={
                    article === false
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  {info.current.map((res, index) => (
                    <div
                      className={styles.order__view_info}
                      onMouseEnter={(e) =>
                        handleMouseEnter(e.currentTarget, res.id)
                      }
                      onMouseLeave={(id) => handleMouseLeave(id, res.id)}
                      style={
                        descrorder === false
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      <div className={styles.order__view_datereg}>
                        {res.dateOFcreation.split("T")[0]}
                      </div>
                      <div className={styles.order__view_dateres}>
                        {client[index]}
                      </div>
                      <div className={styles.order__view_phone}>
                        {tlf[index]}
                      </div>
                      <div className={styles.order__view_bouquet}>
                        {bouquetord[index]}
                      </div>
                      <div className={styles.order__view_bouquet}>
                        {res.dateField.split("T")[0]}
                      </div>
                      <div className={styles.order__view_bouquet}>
                        <select
                          className={styles.order__view_select}
                          onChange={(e) => changeStatus(e, res.id)}
                        >
                          {statusInfo.map((result) => (
                            <option
                              selected={
                                statusInfoOrder[index] === result.status
                                  ? "selected"
                                  : undefined
                              }
                            >
                              {result.status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className={styles.order__view_tools}
                        id={res.id}
                        style={{ display: "none" }}
                        onClick={(e) => OrderInfo(e.target.id)}
                      >
                        кликни, чтобы узнать подробнсоти заказа
                      </div>
                    </div>
                  ))}
                  <div
                    className={styles.order__view_description}
                    style={
                      descrorder === true
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className={styles.descriptionorder}>
                      <p
                        className={styles.descriptionorder__link}
                        onClick={() => setDescrOrder(false)}
                      >
                        &larr; К заказам
                      </p>
                      <div className={styles.descriptionorder__body}>
                        <div className={styles.descriptionorder__bouquet}>
                          <img
                            src={`http://localhost:8000/${onebouquet.current.img}`}
                            className={styles.bouquet__image}
                          />
                        </div>
                        <div className={styles.descriptionorder__info}>
                          <div className={styles.descriptionorder__data}>
                            <div className={styles.descriptionorder__item}>
                              <p>ДАТА ЗАКАЗА - </p>
                              <div>
                                {descrorder === true
                                  ? oneorder.current.dateOFcreation.split(
                                      "T"
                                    )[0]
                                  : oneorder.current.dateOFcreation}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>КЛИЕНТ - </p>
                              <div>
                                {oneclient.current.name}{" "}
                                {oneclient.current.surname}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ТЕЛЕФОН - </p>{" "}
                              <div>{oneclient.current.phonenumber}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>БУКЕТ - </p>
                              <div>{onebouquet.current.name}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>СОСТАВ БУКЕТА - </p>
                              <div>
                                {allcomposition.map((res) => (
                                  <div>
                                    {res[0]} - {res[1]}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ДОП. ОПИСАНИЕ - </p>
                              <div className={styles.descriptionorder__elem}>
                                {oneorder.current.adddescription}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ДАТА ПОЛУЧЕНИЯ - </p>
                              <div>
                                {descrorder === true
                                  ? oneorder.current.dateField.split("T")[0]
                                  : oneorder.current.dateField}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>СПОСОБ ПОЛУЧЕНИЯ - </p>
                              <div>{onereseiving.current}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>АДРЕС - </p>
                              <div>{oneorder.current.addres}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ЦЕНА - </p>
                              <div>{oneorder.current.price} &#8381;</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.order__view}
                  style={
                    article === false
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  {infosearch.current.map((res, index) => (
                    <div
                      className={styles.order__view_info}
                      onMouseEnter={(e) =>
                        handleMouseEnter(e.currentTarget, res.id)
                      }
                      onMouseLeave={(id) => handleMouseLeave(id, res.id)}
                      style={
                        descrorder === false
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      <div className={styles.order__view_datereg}>
                        {res.dateOFcreation.split("T")[0]}
                      </div>
                      <div className={styles.order__view_dateres}>
                        {client[index]}
                      </div>
                      <div className={styles.order__view_phone}>
                        {tlf[index]}
                      </div>
                      <div className={styles.order__view_bouquet}>
                        {bouquetord[index]}
                      </div>
                      <div className={styles.order__view_bouquet}>
                        {res.dateField.split("T")[0]}
                      </div>
                      <div className={styles.order__view_bouquet}>
                        <select
                          className={styles.order__view_select}
                          onChange={(e) => changeStatus(e, res.id)}
                        >
                          {statusInfo.map((result) => (
                            <option
                              selected={
                                statusInfoOrder[index] === result.status
                                  ? "selected"
                                  : undefined
                              }
                            >
                              {result.status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className={styles.order__view_tools}
                        id={res.id}
                        style={{ display: "none" }}
                        onClick={(e) => OrderInfo(e.target.id)}
                      >
                        кликни, чтобы узнать подробнсоти заказа
                      </div>
                    </div>
                  ))}
                  <div
                    className={styles.order__view_description}
                    style={
                      descrorder === true
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className={styles.descriptionorder}>
                      <p
                        className={styles.descriptionorder__link}
                        onClick={() => setDescrOrder(false)}
                      >
                        &larr; К заказам
                      </p>
                      <div className={styles.descriptionorder__body}>
                        <div className={styles.descriptionorder__bouquet}>
                          <img
                            src={`http://localhost:8000/${onebouquet.current.img}`}
                            className={styles.bouquet__image}
                          />
                        </div>
                        <div className={styles.descriptionorder__info}>
                          <div className={styles.descriptionorder__data}>
                            <div className={styles.descriptionorder__item}>
                              <p>ДАТА ЗАКАЗА - </p>
                              <div>
                                {descrorder === true
                                  ? oneorder.current.dateOFcreation.split(
                                      "T"
                                    )[0]
                                  : oneorder.current.dateOFcreation}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>КЛИЕНТ - </p>
                              <div>
                                {oneclient.current.name}{" "}
                                {oneclient.current.surname}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ТЕЛЕФОН - </p>{" "}
                              <div>{oneclient.current.phonenumber}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>БУКЕТ - </p>
                              <div>{onebouquet.current.name}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ОПИСАНИЕ - </p>
                              <div>{onebouquet.current.name}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ДОП. ОПИСАНИЕ - </p>
                              <div className={styles.descriptionorder__elem}>
                                {oneorder.current.adddescription}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ДАТА ПОЛУЧЕНИЯ - </p>
                              <div>
                                {descrorder === true
                                  ? oneorder.current.dateField.split("T")[0]
                                  : oneorder.current.dateField}
                              </div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>СПОСОБ ПОЛУЧЕНИЯ - </p>
                              <div>{onereseiving.current}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>АДРЕС - </p>
                              <div>{oneorder.current.addres}</div>
                            </div>
                            <div className={styles.descriptionorder__item}>
                              <p>ЦЕНА - </p>
                              <div>{oneorder.current.price} &#8381;</div>
                            </div>
                          </div>
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
    </div>
  );
});

export default Order;
