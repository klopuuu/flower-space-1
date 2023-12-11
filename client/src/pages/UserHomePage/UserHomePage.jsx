import styles from "./UserHomePage.module.css";
import HomeMenu from "../../sections/HomeMenu/HomeMenu";
import HomeAccount from "../../sections/HomeAccount/HomeAccount";
import { observer } from "mobx-react-lite";
import { getAllOrder } from "../../http/order";
import { getOneClient } from "../../http/clientAPI";
import { getonebouquetcategory } from "../../http/bouquetAPI";
import { searchFlowersFilter } from "../../http/flowersApi";
import { getonebouquet } from "../../http/bouquetAPI";
import { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../../index";
import iconright from "../../assets/icons/free-icon-right.png";
import calendarimg from "../../assets/icons/calendar.png";

const UserHomePage = observer(() => {
  const [order, setOrder] = useState([]);
  const [flower, setFlower] = useState([]);
  const copyorder = Object.assign([], order);
  const { user } = useContext(Context);
  const booleanref = useRef(true);
  var offset = +3;
  const [today, setToday] = useState(
    new Date(new Date().getTime() + offset * 3600 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  useEffect(() => {
    const fetchData = async () => {
      copyorder.length = 0;
      setOrder([]);
      await getAllOrder(user.id, true).then(async (result) => {
        for (const item of result) {
          if (item.dateField.split("T")[0] === today) {
            await getOneClient(item.clientbaseId).then(
              async (result1) =>
                await getonebouquetcategory(
                  user.id,
                  item.bouquetcategoryId
                ).then(async (result2) => {
                  await getonebouquet(user.id, result2.bouquetId).then(
                    (result3) => {
                      copyorder.push([
                        result1.name,
                        result1.phonenumber,
                        result3.name,
                      ]);
                    }
                  );
                })
            );
          }
        }
        setOrder(copyorder);
        if (copyorder.length === 0) {
          booleanref.current = true;
        } else {
          booleanref.current = false;
        }
      });
      await searchFlowersFilter(user.id).then((res) => {
        setFlower(res);
      });
    };
    fetchData();
  }, [today]);

  const InfoLeft = async () => {
    let today1 = new Date(today);
    today1.setDate(today1.getDate() - 1);
    setToday(today1.toISOString().slice(0, 10));
  };

  const InfoRight = async () => {
    let today1 = new Date(today);
    today1.setDate(today1.getDate() + 1);
    setToday(today1.toISOString().slice(0, 10));
  };

  return (
    <div className={styles.userhome}>
      <div className={styles.userhome__container}>
        <div className={styles.userhome__body}>
          <div className={styles.userhome__menu}>
            <HomeMenu />
          </div>
          <div className={styles.message}>
            <div className={styles.notice__body}>
            
              <p className={styles.notice__name}>ЦВЕТЫ ЗАКАНЧИВАЮТСЯ</p>
              <div className={styles.notice__container}>
                {flower.map((res, index) => (
                  <div className={styles.notice__info}>
                    <div>
                      <img
                        src={`http://localhost:8000/${res.img}`}
                        className={styles.notice__image}
                      />
                    </div>
                    <div>
                      {" "}
                      <p>{res.name}</p>
                    </div>
                    <div>
                      {" "}
                      <p>Осталось - {res.quantity} шт.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.message__image}>
                <img
                  src={iconright}
                  className={styles.message__img1}
                  onClick={InfoLeft}
                />
                <img
                  src={iconright}
                  className={styles.message__img2}
                  onClick={InfoRight}
                />
              </div>
              <div className={styles.message__body}>
                <p className={styles.message__date}>
                  {today}{" "}
                  <img src={calendarimg} className={styles.order__calendar} />
                </p>
                <p
                  className={styles.message__text}
                  style={
                    booleanref.current === true
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  ВЫДАЧИ ЗАКАЗОВ НА СЕГОДНЯ НЕТ
                </p>
                <div className={styles.order}>
                  {order.map((res, index) => (
                    <div className={styles.order__info}>
                      <p className={styles.order__number}>№{index + 1}</p>
                      <div className={styles.order__item}>{res[0]}</div>
                      <div className={styles.order__item}>{res[1]}</div>
                      <div className={styles.order__item}>{res[2]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.account}>
            <HomeAccount />
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserHomePage;
