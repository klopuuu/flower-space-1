import styles from './HeaderHome.module.css';
import logo from '../../assets/image/logo.jpg';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';

export default function HeaderHome() {
  return (
    <header className={styles.header}>
      <Link to={HOME_ROUTE}><img src={logo} /></Link>
    </header>
  );
}

