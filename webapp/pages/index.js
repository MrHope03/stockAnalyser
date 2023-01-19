import Head from 'next/head'
import Image from 'next/image'
import LineGraph from '../comps/linegraph'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div>
      <h1>New to Stocks</h1>
      <LineGraph />
    </div>
  )
}
