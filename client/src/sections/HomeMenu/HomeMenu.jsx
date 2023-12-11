import styles from "./HomeMenu.module.css";
import HeaderHome from "../HeaderHome/HeaderHome";
import { Link, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  CLIENTENV_ROUTE,
  CLIENT_BASE,
  BASE_FLOWERS,
  BOUQUETS,
  GUIDEFLOWER,
  ORDERS,
  HISTORY,
  INSPIRATION,
} from "../../utils/consts";
import { Context } from "../../index";
import { useContext } from "react";

export default function HomeMenu() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.clear();
    navigate(LOGIN_ROUTE);
  };
  return (
    <div className={styles.menu__body}>
      <HeaderHome />
      <Link to={CLIENTENV_ROUTE}>
        <p className={styles.menu__home}>МОЙ ПРОФИЛЬ</p>
      </Link>
      <ul className={styles.menu__items}>
        <Link to={ORDERS}>
          <li>
            <span className={styles.menu__item}>&#127807;</span>ЗАКАЗЫ
          </li>
        </Link>
        <Link to={CLIENT_BASE}>
          <li>
            <span className={styles.menu__item}>&#127807;</span>БАЗА КЛИЕНТОВ
          </li>
        </Link>
        <Link to={HISTORY}>
          <li>
            <span className={styles.menu__item}>&#127807;</span>ИСТОРИЯ ЗАКАЗОВ
          </li>
        </Link>
        <Link to={BOUQUETS}>
          <li>
            <span className={styles.menu__item}>&#127807;</span>БУКЕТЫ
          </li>
        </Link>
        <Link to={BASE_FLOWERS}>
          <li>
            <span className={styles.menu__item}>&#127807;</span>БАЗА ЦВЕТОВ
          </li>
        </Link>
        <Link to={GUIDEFLOWER}>
          <li>
            <span className={styles.menu__item}>&#127807;</span>СПРАВОЧНИК
            ЦВЕТОВ
          </li>
        </Link>
        <Link to={INSPIRATION}>
          <li>
            <span className={styles.menu__item}>&#127807;</span>ВДОХНОВЕНИЕ
          </li>
        </Link>
      </ul>
      <button onClick={logout} className={styles.menu__exit}>
        ВЫЙТИ
      </button>
    </div>
  );
}
