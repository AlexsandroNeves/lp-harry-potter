import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Harry Potter</h1>
          <p className={styles.subtitle}>Todos os personagens</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
