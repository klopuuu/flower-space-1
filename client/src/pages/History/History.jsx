import styles from "./History.module.css";
import { observer } from "mobx-react-lite";
import HomeMenu from "../../sections/HomeMenu/HomeMenu";
import { useState, useContext, useRef, useEffect } from "react";
import imgsearch from "../../assets/icons/free-icon-search.png";
import { getAllclient, searchClient, getOneClient } from "../../http/clientAPI";
import {
  getAllBouquet,
  searchBouquet,
  getonebouquetcategory,
  getonebouquet,
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

const History = observer(() => {
  var today = new Date().toISOString().slice(0, 10);
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
  }

  async function getClickInfo() {
    copybouquet.length = 0;
    copyclient.length = 0;
    copytlf.length = 0;
    copystatus.length = 0;
    if (infosearch.current.length === 0) {
      await getAllOrder(user.id, false).then((data) => {
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
      console.log("SSDS",oneorder.current.price)
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

  return (
    <div className={styles.order}>
      <div className={styles.order__container}>
        <div className={styles.order__body}>
          <div className={styles.order__menu}>
            <HomeMenu />
          </div>
          <div className={styles.order__data}>
            <div className={styles.container_flex}>
              <p className={styles.order__paragraph}>ИСТОРИЯ ЗАКАЗОВ</p>
              <div className={styles.order__search}>
                <img
                  src={imgsearch}
                  className={styles.search__order}
                  onClick={SearchOrder}
                />
                <input
                  list="data"
                  className={styles.form__search}
                  placeholder="Поиск по номеру тел."
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={CleanInput}
                />
                <datalist id="data">
                  {userinfo.map((res) => (
                    <option>{res.phonenumber}</option>
                  ))}
                </datalist>
              </div>
            </div>
            <div className={styles.order__criteria}>
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
                  descrorder === false
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
                  />
                </div>
              </div>
              {infosearch.current.length === 0 ? (
                <div className={styles.order__view}>
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
                        {statusInfoOrder[index]}
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
                              <div>{oneorder.current.dateOFcreation}</div>
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
                              <div>{oneorder.current.dateField}</div>
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
                <div className={styles.order__view}>
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
                      <div className={styles.order__view_bouquet}>
                        {statusInfoOrder[index]}
                      </div>
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
                              <div>{oneorder.current.dateOFcreation}</div>
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
                              <div>{oneorder.current.dateField}</div>
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

export default History;
