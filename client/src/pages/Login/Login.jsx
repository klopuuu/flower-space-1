import styles from "./Login.module.css";
import Header from "../../sections/Header/Header";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { login } from "../../http/userAPI";
import { CLIENTENV_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../index";
import validator from "validator";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [boolean, setBoolean] = useState(false);

  const handleClick = () => setChecked(!checked);

  const signin = async (e) => {
    if (email != "" && password != "" && checked) {
      try {
        e.preventDefault();
        let data;
        data = await login(email, password);
        user.setId(data.id);
        console.log(data.name);
        console.log(data.email);
        console.log(data.surname);
        user.setUser(user);
        user.setIsAuth(true);
        navigate(CLIENTENV_ROUTE);
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Заполнены не все поля");
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
    if(e.style.border === "2px solid red")
    {
      setBoolean(false)
    }
    else
    {
      setBoolean(true)
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
              <form>
                <input
                  type="email"
                  placeholder="ВВЕДИТЕ ПОЧТУ"
                  className={styles.signin}
                  value={email}
                  onChange={(e) => getEmail(e.target)}
                ></input>
                <input
                  type="password"
                  placeholder="ВВЕДИТЕ ПАРОЛЬ"
                  className={styles.signin}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label className={styles.labelform}>
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
                    type="submit"
                    id="clearButton"
                    className={styles.btn__form}
                    onClick={(e) => signin(e)}
                    style={{ backgroundColor: "grey" }}
                    disabled
                  >
                    ВХОД
                  </button>
                ) : (
                  <button
                    type="submit"
                    id="clearButton"
                    className={styles.btn__form}
                    onClick={(e) => signin(e)}
                  >
                    ВХОД
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className={styles.signup}>
            <a href="/registration">Зарегистрироваться</a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
