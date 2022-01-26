import Head from 'next/head';
import Prismic from '@prismicio/client';

import { GetStaticProps } from 'next';
// import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../services/prismic';

import Header from '../components/Header';
import { Post } from '../components/Post';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({
  postsPagination: { next_page, results },
}: HomeProps): JSX.Element {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Home | Spacetraveling</title>
      </Head>
      <Header />
      <main>
        {results.map(post => (
          <Post
            key={post.uid}
            title={post.data.title}
            subtitle={post.data.subtitle}
            updatedAt={post.first_publication_date}
            author={post.data.author}
          />
        ))}
        {next_page && <button type="button">Carregar mais posts</button>}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: [
        'post.title',
        'post.subtitle',
        'post.author',
        'post.banner',
        'post.content',
      ],
      pageSize: 2,
    }
  );

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: new Date(
          post.first_publication_date
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        // first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      } as Post;
    }),
  };

  return {
    props: {
      postsPagination,
    },
  };
};
