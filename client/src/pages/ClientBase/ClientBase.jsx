import styles from "./ClientBase.module.css";
import { observer } from "mobx-react-lite";
import HomeMenu from "../../sections/HomeMenu/HomeMenu";
import {
  getAllclient,
  createClient,
  deleteClient,
  getOneClient,
  updateClient,
  searchClient,
} from "../../http/clientAPI";
import { useState, useContext, useRef } from "react";
import { Context } from "../../index";
import imgclose from "../../assets/icons/icons-delete.png";
import iconupdate from "../../assets/icons/icon-update.png";
import imgsearch from "../../assets/icons/free-icon-search.png";

const ClientBase = observer(() => {
  const [info, setInfo] = useState([]);
  const { user } = useContext(Context);
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [phonenumber, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [update, setUpdate] = useState(false);
  const [idclient, setIdclient] = useState(null);
  const infoone = useRef([]);
  const [search, setSearch] = useState("");
  const [infosearch, setInfoSearch] = useState([]);
  const searchinput = useRef("");

  getAllclient(user.id).then((res) => {
    setInfo(res);
  });

  const DeletedClient = async (e) => {
    e.preventDefault();
    const data = await deleteClient(e.target.id);
    searchinput.current.value = "";
    setInfoSearch([]);
    setSearch("");
  };

  const createclient = async (e) => {
    e.preventDefault();
    try {
      await createClient(user.id, name, surname, phonenumber, address);
      user.setIsAuth(true);
      setName("");
      setAddress("");
      setSurName("");
      setNumber("");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const changeName = (e) => {
    setName(e);
  };

  const changeSurname = (e) => {
    setSurName(e);
  };

  const changePhone = (e) => {
    setNumber(e);
  };

  const changeAddress = (e) => {
    setAddress(e);
  };

  const updateclient = async (id) => {
    setUpdate(true);
    setIdclient(id);

    getOneClient(id).then((res) => {
      infoone.current = res;
      changeName(infoone.current.name);
      changeSurname(infoone.current.surname);
      changeAddress(infoone.current.address);
      changePhone(infoone.current.phonenumber);
    });
  };

  const updateOneClient = async (e) => {
    e.preventDefault();
    const data = await updateClient(
      idclient,
      name,
      surname,
      phonenumber,
      address
    );
    if (infosearch.length !== 0) {
      setInfoSearch(data);
    }
    setUpdate(false);
    // setInfoSearch(data);
    changeName("");
    changeSurname("");
    changeAddress("");
    changePhone("");
  };

  const SearchClient = async (e) => {
    try {
      e.preventDefault();
      const data = await searchClient(search);
      setInfoSearch(data);
    } catch (error) {
      alert(error.response.data.message);
    }
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

  const SearchСlient = async (e) => {
    try {
      e.preventDefault();
      const data = await searchClient(search);
      setInfoSearch(data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={styles.clientbase}>
      <div className={styles.clientbase__container}>
        <div className={styles.clientbase__body}>
          <div className={styles.clientbase__menu}>
            <HomeMenu />
          </div>
          <div className={styles.clientbase__client}>
            <div className={styles.container_flex}>
              <p className={styles.client__paragraph}>КЛИЕНТЫ</p>
              <div className={styles.client__search}>
                <img
                  src={imgsearch}
                  className={styles.search_flower}
                  onClick={SearchСlient}
                />
                <input
                  list="data"
                  className={styles.form_search}
                  placeholder="Номер телефона"
                  onChange={(e) => changeSearch(e)}
                  onClick={CleanInput}
                />
                <datalist id="data">
                  {info.map((res) => (
                    <option id={res.id}>{res.phonenumber}</option>
                  ))}
                </datalist>
              </div>
            </div>
            <div className={styles.client__data}>
              <p>ИМЯ</p>
              <p>ФАМИЛИЯ</p>
              <p>ТЕЛЕФОН</p>
              <p>АДРЕС</p>
            </div>
            <div className={styles.client__list}>
              {infosearch.length === 0 ? (
                info.map((info) => (
                  <div className={styles.client__info}>
                    <p>{info.name}</p>
                    <p>{info.surname}</p>
                    <p>{info.phonenumber}</p>
                    <p>{info.address}</p>
                    <img
                      src={iconupdate}
                      className={styles.client__update}
                      id={info.id}
                      onClick={(e) => updateclient(e.target.id)}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.client__info}>
                  <p>{infosearch.name}</p>
                  <p>{infosearch.surname}</p>
                  <p>{infosearch.phonenumber}</p>
                  <p>{infosearch.address}</p>
                  <img
                    src={iconupdate}
                    className={styles.client__update}
                    id={infosearch.id}
                    onClick={(e) => updateclient(e.target.id)}
                  />
                </div>
              )}
            </div>
          </div>
          {update === false ? (
            <div className={styles.add_client}>
              <p className={styles.add_client__title}>Новый клиент</p>
              <form onSubmit={createclient}>
                <div className={styles.field}>
                  <label>ИМЯ</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Имя"
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>ФАМИЛИЯ</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Фамилия"
                      value={surname}
                      onChange={(e) => changeSurname(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>ТЕЛЕФОН</label>
                  <div className={styles.control}>
                    <input
                      type="tel"
                      className="input"
                      placeholder="Телефон"
                      value={phonenumber}
                      onChange={(e) => changePhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>АДРЕС</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Адрес"
                      value={address}
                      onChange={(e) => changeAddress(e.target.value)}
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
          ) : (
            <div className={styles.add_client}>
              <p className={styles.add_client__title}>Изменить клиента</p>
              <form onSubmit={createclient}>
                <div className={styles.field}>
                  <label>ИМЯ</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Имя"
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>ФАМИЛИЯ</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Фамилия"
                      value={surname}
                      onChange={(e) => changeSurname(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>ТЕЛЕФОН</label>
                  <div className={styles.control}>
                    <input
                      type="tel"
                      className="input"
                      placeholder="Телефон"
                      value={phonenumber}
                      onChange={(e) => changePhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>АДРЕС</label>
                  <div className={styles.control}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Адрес"
                      value={address}
                      onChange={(e) => changeAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={updateOneClient}
                  >
                    ИЗМЕНИТЬ
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ClientBase;
