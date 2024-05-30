import Link from 'next/link';
import styles from '../login/page.module.css'

const BackToHomeButton = () => {
  return (
    <Link href="/" className={styles.button}>
        Back to Home
    </Link>
  );
};

export default BackToHomeButton;