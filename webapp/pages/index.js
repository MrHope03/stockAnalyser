import styles from '../styles/Home.module.scss'
import { Anton } from '@next/font/google'
import Link from 'next/link'

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
})

export default function Home() {
  return (
    <div className={anton.className} >
      <div className={styles.body}>
        <h1>New to Stocks? </h1>
        <p>Start now by signing </p>
        <Link href="/signup">
          {/* <button class="log">Login</button> */}
          <button className="reg">Sign up</button>
        </Link>
      </div>
    </div >
  )
}
