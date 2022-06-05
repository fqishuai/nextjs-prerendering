import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { Form, Input, Button, Select, DatePicker } from 'antd';
import utilStyles from '../styles/utils.module.css'
import indexStyles from './index.module.css'
// import { getSortedPostsData } from '../lib/posts'

const { Option } = Select;
const { RangePicker } = DatePicker;

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
  const [form] = Form.useForm();

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
      <RangePicker />
      <Form form={form} name="control-hooks">
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item wrapperCol={{offset:8,span:16}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button">
            Reset
          </Button>
          <Button type="link" htmlType="button">
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}
