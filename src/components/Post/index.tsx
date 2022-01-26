import { FiCalendar, FiUser } from 'react-icons/fi';

import styles from './styles.module.scss';

type PostProps = {
  title: string;
  subtitle: string;
  updatedAt: string;
  author: string;
};

export const Post = ({ title, subtitle, updatedAt, author }: PostProps) => {
  return (
    <div className={styles.postContainer}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <span>
        <FiCalendar width={20} height={20} stroke="#BBBBBB" /> {updatedAt}
      </span>
      <span>
        <FiUser width={20} height={20} stroke="#BBBBBB" /> {author}
      </span>
    </div>
  );
};
