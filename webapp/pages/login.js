import style from '../styles/login.module.scss';
import { useState } from 'react';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
	const [loginData, setLoginData] = useState({});
	const [errMsg, setErrMsg] = useState(false);
	const router = useRouter();

	const handleChange = (e) => {
		let key = e.target.name;
		let val = e.target.value;
		setLoginData(curr => ({ ...curr, [key]: val }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			signIn('credentials', { username: loginData.username, password: loginData.password, redirect: false, }).then(({ ok, err }) => {
				if (ok) {
					router.push("/");
				}
				else {
					setErrMsg(true);
				}
			});
		}
		catch (err) {
			setErrMsg(true);
		}

	}

	return (
		<div className={style.form}>
			<h1>Login</h1>
			{
				errMsg &&
				<p className={style.err}>Please enter correct username and password!</p>
			}
			{
				(router.query["error"] == "OAuthAccountNotLinked") &&
				<>
					<p className={style.err}>Already existing email! Try login using other Credentials!</p>
				</>
			}
			<form onSubmit={handleSubmit} >
				<div>
					<label>
						Username
					</label>
					<input type="text" placeholder="Username" name="username" onChange={handleChange} />
				</div>
				<div>
					<label>
						Password
					</label>
					<input placeholder="Password" type="password" name="password" onChange={handleChange} />
				</div>
				<div>
					<input type="submit" value="login" />
				</div>
			</form>
			<p>or</p>
			<div>
				<button className={style.loginbtn} onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/' })}>Signin using Github</button>
			</div>
			<div>
				<button className={style.loginbtn} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}>Signin using Google</button>
			</div>
			<Link href='/signup'>create a new account</Link>
		</div>
	);
}

export default Login
