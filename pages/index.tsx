import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import indexStyles from './index.module.css'
// import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  // return {
  //   props: {
  //     allPostsData,
  //   },
  // };
  const res = await fetch('https://nest-serverless.vercel.app/user/2');
  const resJson = await res.json();
  console.log('resJson::', resJson)
  return {
    props: {
      allPostsData: [{id:1,title:resJson.data || resJson.message}],
    },
  };
}

export default function Home({ allPostsData }: { allPostsData: any[] }) {

  const handleCreateUser = () => {
    fetch('https://nest-serverless.vercel.app/user/create',{
      method: 'POST',
      body: JSON.stringify({
        name: 'root',
        age: 20,
      })
    }).then(res => {
      res.json().then(result => {
        console.log('result::', result)
      })
    })
  }

  return (
    <Layout home>
      <Head>
        <title>{'Home'}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className={indexStyles.flexContainer}>
          <p><a href="https://nextjs.org/learn">Next.js tutorial</a></p>
          <div className={indexStyles.click} onClick={handleCreateUser}>点击新增用户1</div>
        </div>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
               <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
