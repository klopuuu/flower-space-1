import styles from "./HomeAccount.module.css";
import { Context } from "../../index";
import logo from "../../assets/icons/florist.png";
import React, { useContext, useState, useEffect } from "react";
import { getAll } from "../../http/userAPI";
import iconupdate from "../../assets/icons/icon-update.png";
import { update } from "../../http/userAPI";

export default function HomeAccount() {
  const parametrs = [
    "ИМЯ: ",
    "ФАМИЛИЯ:",
    "ВОЗРАСТ:",
    "СТАЖ РАБОТЫ:",
    "АДРЕС:",
    "НОМЕР ТЕЛЕФОНА:",
  ];
  const { user } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [clickup, setClick] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [age, setAge] = useState("");
  const [workexperience, setExp] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    getAll(user.id).then((res) => {
      setInfo(res);
    });
  });

  user.setIsAuth(true);
  user.setUser(user);


  const updateUser = async (e) => {
    e.preventDefault();
    console.log(name)
    const data = await update(
      info.id,
      name,
      surname,
      age,
      workexperience,
      address,
      number
    );
    setClick(false);
    console.log(data);
  };

  const getUserById = async () => {
    getAll(user.id).then((res) => {
      setName(res.name);
      setSurName(res.surname);
      setAge(res.age);
      setExp(res.workexperience);
      setAddress(res.address);
      setNumber(res.number);
    });
  };

  const changeName = (e) => {
    console.log(e)
    setName("gbgfbdb");
    console.log("name", name)
  };

  const updateflower = async (id) => {
    getUserById();
    setClick(true);
  };
  return (
    <div className={styles.account__body}>
      <center>
        <img src={logo} className={styles.logo}></img>
      </center>
      {clickup === false ? (
        <div className={styles.account__info}>
          <center >
            <p className={styles.info}>
              ЛИЧНЫЕ ДАННЫЕ
              <img
                src={iconupdate}
                className={styles.icon__update}
                onClick={updateflower}
              />
            </p>
          </center>
          <p className={styles.info__item}>
            <span className={styles.item}>{parametrs[0]}</span>
            <p className={styles.item_info}>{info.name}</p>
          </p>
          <p className={styles.info__item}>
            <span className={styles.item}>{parametrs[1]}</span>
            <p className={styles.item_info}>{info.surname}</p>
          </p>
          <p className={styles.info__item}>
            <span className={styles.item}>{parametrs[2]}</span>
            <p className={styles.item_info}>{info.age}</p>
          </p>
          <p className={styles.info__item}>
            <span className={styles.item}>{parametrs[3]}</span>
            <p className={styles.item_info}>{info.workexperience}</p>
          </p>
          <p className={styles.info__item}>
            <span className={styles.item}>{parametrs[4]}</span>
            <p className={styles.item_info}>{info.address}</p>
          </p>
          <p className={styles.info__item}>
            <span className={styles.item}>{parametrs[5]}</span>
            <p className={styles.item_info}>{info.number}</p>
          </p>
        </div>
      ) : (
        <div className={styles.account__info}>
          <center>
            <p className={styles.info__update}>ЛИЧНЫЕ ДАННЫЕ</p>
          </center>
          <form onSubmit={updateUser}>
            <div className={styles.field}>
              <label>{parametrs[0]}</label>
              <div className={styles.control}>
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>{parametrs[1]}</label>
              <div className={styles.control}>
                <input
                  type="text"
                  className="input"
                  value={surname}
                  onChange={(e) => setSurName(e.target.value)}
                  placeholder="Surname"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>{parametrs[2]}</label>
              <div className={styles.control}>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>{parametrs[3]}</label>
              <div className={styles.control}>
                <input
                  type="text"
                  className="input"
                  value={workexperience}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="workexperience"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>{parametrs[4]}</label>
              <div className={styles.control}>
                <input
                  type="text"
                  className="input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="address"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>{parametrs[5]}</label>
              <div className={styles.control}>
                <input
                  type="text"
                  className="input"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="number"
                />
              </div>
            </div>
            <div className={styles.field}>
              <button type="submit" className={styles.btn}>
                Обновить
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
