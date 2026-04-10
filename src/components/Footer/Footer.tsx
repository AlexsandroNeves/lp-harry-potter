import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} · Desenvolvido com React &amp; SCSS · Dados via HP API</p>
      </div>
    </footer>
  );
};

export default Footer;
