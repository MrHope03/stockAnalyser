import styles from '../styles/Home.module.scss'
import { Anton } from '@next/font/google'
import Link from 'next/link'
import { useSession } from "next-auth/react";

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
})

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className={anton.className} >
      <div className={styles.body}>
        {!session ? (<>
          <h1>New to Stocks? </h1>
          <p>Start now by signing </p>
        </>)
          : (
            <>
              <h1>Welcome back!</h1>
              <p>Start Investing </p>
            </>
          )
        }
        {!session ?
          <Link href="/signup">
            {/* <button class="log">Login</button> */}
            <button className="reg">Sign up</button>
          </Link> :
          <Link href="/market">
            {/* <button class="log">Login</button> */}
            <button className="reg">Analyse Market</button>
          </Link>
        }
      </div>
    </div >
  )
}
