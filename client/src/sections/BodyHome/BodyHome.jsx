import styles from './BodyHome.module.css';
import blueflower from '../../assets/image/blueflower.jpg';
import flowercup from '../../assets/image/flowercup.jpg';
import flowerbox from '../../assets/image/flowerbox.jpg';
import flower from '../../assets/image/flower.jpg';
import iconflower from '../../assets/icons/icon-flower.png';
import iconcheck from '../../assets/icons/icon-check.png';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

export default function BodyHome() {
  return (
    <main className={styles.container}>
      <div className={styles.body_left}>
        <p className={styles.p}>ПРОСТРАНСТВО ФЛОРИСТА</p>
        <Link to={LOGIN_ROUTE}><button className={styles.button}>ВХОД</button></Link>
      </div>
      <div className={styles.body_right}>
        <div className={styles.body_cards}>
          <div className={styles.items}>
            <div className={`${styles.item} ${styles.icon}`}><img src={blueflower} alt=""/> <div className={styles.items_icon}><img src={iconflower}></img><p>YOUR FLOWERS</p></div></div>
            <div className={styles.item}><img src={flowercup} alt="" /></div>
            <div className={styles.item}><img src={flowerbox} alt="" /></div>
            <div className={`${styles.item} ${styles.icon}`}><img src={flower} alt="" /><div className={styles.items_icon}><img src={iconcheck}></img><p>YOUR SPACE</p></div></div>
          </div>
        </div>
      </div>
    </main>
  );
}

