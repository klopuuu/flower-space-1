import styles from './HomeFlower.module.css';
import Header from '../../sections/Header/Header';
import BodyHome from '../../sections/BodyHome/BodyHome';

export default function HomeFlower() {
  return (
    <div className={styles.flower}>
      <Header/>
      <BodyHome/>
    </div>
  );
}

