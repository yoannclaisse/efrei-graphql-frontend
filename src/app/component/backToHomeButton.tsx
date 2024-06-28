import Link from 'next/link';
import styles from '../login/page.module.css'

const BackToHomeButton = () => {
  return (
    <Link href="/" className={`${styles.button} font-bold bg-green-200`}>
        Back to Home
    </Link>
  );
};

export default BackToHomeButton;