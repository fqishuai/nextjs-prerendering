import type { AppProps } from 'next/app';
import '../styles/global.css';
import 'antd/dist/antd.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}