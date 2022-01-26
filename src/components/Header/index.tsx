import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Link href="/" passHref>
        <a>
          <Image
            priority
            src="/images/logo.svg"
            width={238}
            height={25}
            alt="logo"
          />
        </a>
      </Link>
    </header>
  );
}
