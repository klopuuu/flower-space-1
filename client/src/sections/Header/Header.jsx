import styles from './Header.module.css';
import logo from '../../assets/image/logo.jpg'
import { HOME_ROUTE } from '../../utils/consts';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to={HOME_ROUTE}><img src={logo} /></Link>
    </header>
  );
}

