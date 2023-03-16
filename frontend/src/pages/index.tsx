import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
{/* <Player src='https://assets6.lottiefiles.com/packages/lf20_qm8eqzse.json' className="player" loop  autoplay  /> */}
import Lottie from "lottie-react"
import { Player } from '@lottiefiles/react-lottie-player'
import ConciousAi from './components/Consious/Consioius'
import Footer from './components/Footer/Footer'
import Nav from './Nav/Nav'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>ConciousAi APP</title>
        <meta name="description" content="Generated  by openai technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Nav />
      <ConciousAi />
      <Footer />
      </main>
    </>
  )
}
