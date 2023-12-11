import styles from "./SignUp.module.css";
import Header from "../../sections/Header/Header";
import { registration } from "../../http/userAPI";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../index";
import { LOGIN_ROUTE } from "../../utils/consts";
import { createBinderClient } from "../../http/clientAPI";
import { createBinderFlower } from "../../http/flowersApi";
import { createBinderBouquet } from "../../http/bouquetAPI";
import { createBinderComposition } from "../../http/compositionAPI";
import { createBinderCategory } from "../../http/bouquetAPI";
import { createBinderOrder } from "../../http/order";
import { createBinderInspiration } from "../../http/inspirationAPI";
import validator from "validator";

const SignUp = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [age, setAge] = useState("");
  const [workexperience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [numbertelephone, setNumber] = useState("");
  const { user } = useContext(Context);
  const history = useNavigate();
  const [checked, setChecked] = useState(false);
  const [boolean, setBoolean] = useState(false);
  let elname = document.getElementsByName("name");
  let elsurname = document.getElementsByName("surname");
  let elage = document.getElementsByName("age");
  let elexperience = document.getElementsByName("workexperience");
  let eladdress = document.getElementsByName("address");
  let eltelephone = document.getElementsByName("numbertelephone");
  let elemail = document.getElementsByName("email");
  let elpassword = document.getElementsByName("password");
  const handleClick = () => setChecked(!checked);

  const getPassword = (e) => {
    if (
      validator.isStrongPassword(e.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPassword(e.value);
      e.style.border = "none";
    } else {
      setPassword(e.value);
      e.style.border = "2px solid red";
    }
    if (
      elname[0].style.border === "3px solid red" ||
      elsurname[0].style.border === "3px solid red" ||
      elage[0].style.border === "3px solid red" ||
      elexperience[0].style.border === "3px solid red" ||
      eladdress[0].style.border === "3px solid red" ||
      eltelephone[0].style.border === "3px solid red" ||
      elemail[0].style.border === "3px solid red" ||
      elpassword[0].style.border === "3px solid red"
    ) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  const getEmail = (e) => {
    if (validator.isEmail(e.value)) {
      setEmail(e.value);
      e.style.border = "none";
    } else {
      setEmail(e.value);
      e.style.border = "2px solid red";
    }
    if (
      elname[0].style.border === "3px solid red" ||
      elsurname[0].style.border === "3px solid red" ||
      elage[0].style.border === "3px solid red" ||
      elexperience[0].style.border === "3px solid red" ||
      eladdress[0].style.border === "3px solid red" ||
      eltelephone[0].style.border === "3px solid red" ||
      elemail[0].style.border === "3px solid red" ||
      elpassword[0].style.border === "3px solid red"
    ) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  const getTelephone = async (e) => {
    setNumber(e.value);
    var pattern = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    if (!pattern.test(e.value)) {
      if (e.value.length === 0) {
        e.style.border = "none";
      } else {
        e.style.border = "3px solid red";
      }
    } else if (e.value.length != 11) {
      if (e.value.length === 0) {
        e.style.border = "none";
      } else {
        e.style.border = "3px solid red";
      }
    }
    if (pattern.test(e.value) && e.value.length === 11) {
      e.style.border = "none";
    }
    if (
      elname[0].style.border === "3px solid red" ||
      elsurname[0].style.border === "3px solid red" ||
      elage[0].style.border === "3px solid red" ||
      elexperience[0].style.border === "3px solid red" ||
      eladdress[0].style.border === "3px solid red" ||
      eltelephone[0].style.border === "3px solid red" ||
      elemail[0].style.border === "3px solid red" ||
      elpassword[0].style.border === "3px solid red"
    ) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  const getAge = async (e) => {
    setAge(e.value);
    var pattern = /^\d+$/;
    if (!pattern.test(e.value)) {
      if (e.value.length === 0) {
        e.style.border = "none";
      } else {
        e.style.border = "3px solid red";
      }
    }
    if (pattern.test(e.value) && e.value >= 18) {
      e.style.border = "none";
    }
    if (
      elname[0].style.border === "3px solid red" ||
      elsurname[0].style.border === "3px solid red" ||
      elage[0].style.border === "3px solid red" ||
      elexperience[0].style.border === "3px solid red" ||
      eladdress[0].style.border === "3px solid red" ||
      eltelephone[0].style.border === "3px solid red" ||
      elemail[0].style.border === "3px solid red" ||
      elpassword[0].style.border === "3px solid red"
    ) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  const getExperiense = async (e) => {
    setExperience(e.value);
    var pattern = /^\d+$/;
    if (!pattern.test(e.value)) {
      if (e.value.length === 0) {
        e.style.border = "none";
      } else {
        e.style.border = "3px solid red";
      }
    }
    if (pattern.test(e.value) && e.value <= 50) {
      e.style.border = "none";
    }
    if (
      elname[0].style.border === "3px solid red" ||
      elsurname[0].style.border === "3px solid red" ||
      elage[0].style.border === "3px solid red" ||
      elexperience[0].style.border === "3px solid red" ||
      eladdress[0].style.border === "3px solid red" ||
      eltelephone[0].style.border === "3px solid red" ||
      elemail[0].style.border === "3px solid red" ||
      elpassword[0].style.border === "3px solid red"
    ) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  const getName = async (e) => {
    setName(e.value);
    var pattern = /^[а-яА-Я]+$/;
    if (!pattern.test(e.value)) {
      e.style.border = "3px solid red";
    }
    if (pattern.test(e.value)) {
      e.style.border = "none";
    }
    if (
      elname[0].style.border === "3px solid red" ||
      elsurname[0].style.border === "3px solid red" ||
      elage[0].style.border === "3px solid red" ||
      elexperience[0].style.border === "3px solid red" ||
      eladdress[0].style.border === "3px solid red" ||
      eltelephone[0].style.border === "3px solid red" ||
      elemail[0].style.border === "3px solid red" ||
      elpassword[0].style.border === "3px solid red"
    ) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  const getSurName = async (e) => {
    setSurName(e.value);
    var pattern = /^[а-яА-Я]+$/;
    if (!pattern.test(e.value)) {
      e.style.border = "3px solid red";
    }
    if (pattern.test(e.value)) {
      e.style.border = "none";
    }
    if (
      elname[0].style.border === "3px solid red" ||
      elsurname[0].style.border === "3px solid red" ||
      elage[0].style.border === "3px solid red" ||
      elexperience[0].style.border === "3px solid red" ||
      eladdress[0].style.border === "3px solid red" ||
      eltelephone[0].style.border === "3px solid red" ||
      elemail[0].style.border === "3px solid red" ||
      elpassword[0].style.border === "3px solid red"
    ) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  const signup = async (e) => {
    if (email != "" && password != "" && name != "" && checked && surname) {
      e.preventDefault();
      try {
        let data,
          id_user,
          id_flower,
          id_bouquet,
          id_composition,
          id_category,
          id_order,
          id_inspiration;
        data = await registration(
          email,
          password,
          name,
          surname,
          age,
          workexperience,
          address,
          numbertelephone
        );
        id_user = await createBinderClient(data.id);
        id_flower = await createBinderFlower(data.id);
        id_bouquet = await createBinderBouquet(data.id);
        id_composition = await createBinderComposition(data.id);
        id_category = await createBinderCategory(data.id);
        id_order = await createBinderOrder(data.id);
        id_inspiration = await createBinderInspiration(data.id);
        user.setIsAuth(true);
        history(LOGIN_ROUTE);
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Заполнены не все поля под *");
    }
  };
  return (
    <div className={styles.login}>
      <Header />
      <div className={styles.login__container}>
        <div className={styles.login__body}>
          <div className={styles.login__name}>ВАШЕ ПРОСТРАНСТВО</div>
          <div className={styles.form__body}>
            <div className={styles.form__item}>
              <center>
                <form className={styles.form}>
                  <div className={styles.signup__body}>
                    <input
                      type="name"
                      name="name"
                      placeholder="* Имя"
                      className={styles.signin}
                      value={name}
                      onChange={(e) => getName(e.target)}
                    ></input>
                    <input
                      type="surname"
                      name="surname"
                      placeholder="* Фамилия"
                      className={styles.signin}
                      value={surname}
                      onChange={(e) => getSurName(e.target)}
                    ></input>
                    <input
                      type="age"
                      name="age"
                      placeholder="Возраст"
                      className={styles.signin}
                      value={age}
                      onChange={(e) => getAge(e.target)}
                    ></input>
                    <input
                      type="workexperience"
                      name="workexperience"
                      placeholder="Стаж работы"
                      className={styles.signin}
                      value={workexperience}
                      onChange={(e) => getExperiense(e.target)}
                    ></input>
                    <input
                      type="address"
                      name="address"
                      placeholder="Адрес"
                      className={styles.signin}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></input>
                    <input
                      type="numbertelephone"
                      name="numbertelephone"
                      placeholder="Номер телефона"
                      className={styles.signin}
                      value={numbertelephone}
                      onChange={(e) => getTelephone(e.target)}
                    ></input>
                  </div>
                  <div className={styles.signin__body}>
                    <input
                      type="email"
                      name="email"
                      placeholder="* Почта"
                      className={styles.signin}
                      value={email}
                      onChange={(e) => getEmail(e.target)}
                    ></input>
                    <input
                      type="password"
                      name="password"
                      placeholder="* Пароль"
                      className={styles.signin}
                      value={password}
                      onChange={(e) => getPassword(e.target)}
                    ></input>

                    <label className={styles.label}>
                      <input
                        type="checkbox"
                        onClick={handleClick}
                        cheked={checked.toString()}
                        required
                      />
                      <p>Я согласен с политикой конфидециальности</p>
                    </label>
                    {boolean === false ? (
                      <button
                        className={styles.btn__form}
                        onClick={(e) => signup(e)}
                        style={{ backgroundColor: "grey" }}
                        disabled
                      >
                        Зарегистрироваться
                      </button>
                    ) : (
                      <button
                        className={styles.btn__form}
                        onClick={(e) => signup(e)}
                      >
                        Зарегистрироваться
                      </button>
                    )}
                    <p style={{ marginTop: "10px" }}>* обязательные поля</p>
                  </div>
                </form>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default SignUp;
