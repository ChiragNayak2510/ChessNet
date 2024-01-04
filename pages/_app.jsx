import '@/styles/globals.css'
import Layout from '@/components/Layout'
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Modal from '@/components/Modal'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Layout>
      <Component {...pageProps}/>
    </Layout>
    <ToastContainer/>
    </> 
 )
  }
