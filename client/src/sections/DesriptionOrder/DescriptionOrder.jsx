import styles from "./DescriptionOrder.module.css";
import bouquet from "../../assets/image/flower.jpg";

export default function DescriptionOrder() {
  return (
    <div className={styles.descriptionorder}>
      <p className={styles.descriptionorder__link}>	&larr; К заказам</p>
      <div className={styles.descriptionorder__body}>
        <div className={styles.descriptionorder__bouquet}>
          <img src={bouquet} className={styles.bouquet__image} />
        </div>
        <div className={styles.descriptionorder__info}>
          <div className={styles.descriptionorder__data}>
            <div className={styles.descriptionorder__item}>
              <p>ДАТА ЗАКАЗА - </p>
              <div>20.04.01</div>
            </div>
            <div className={styles.descriptionorder__item}>
              <p>КЛИЕНТ - </p>
              <div>Валерия Морева</div>
            </div>
            <div className={styles.descriptionorder__item}>
              <p>ТЕЛЕФОН - </p> <div>89518455689</div>
            </div>
            <div className={styles.descriptionorder__item}>
              <p>БУКЕТ - </p>
              <div>Букет из 100 роз</div>
            </div>
            <div className={styles.descriptionorder__item}>
              <p>ДОП. ОПИСАНИЕ - </p>
              <div className={styles.descriptionorder__elem}>
                Букет состоит из 1000 букетов. Доставить ровно к 18:00.Букет
                состоит из 1000 букетов. Доставить ровно к 18:00 Букет состоит
                из 1000 букетов. Доставить ровно к 18:00.
              </div>
            </div>
            <div className={styles.descriptionorder__item}>
              <p>ДАТА ПОЛУЧЕНИЯ - </p>
              <div>20.04.2022</div>
            </div>
            <div className={styles.descriptionorder__item}>
              <p>СПОСОБ ПОЛУЧЕНИЯ - </p>
              <div>Доставка</div>
            </div>
            <div className={styles.descriptionorder__item}>
              <p>АДРЕС - </p>
              <div>Ростов-на-Дону Ворошиловский проспект 89/80</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
