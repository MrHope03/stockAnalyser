import { useRouter } from 'next/router';
import style from '../styles/login.module.scss';
import { useState } from 'react';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import axios from 'axios';


const Signup = () => {
	const [signupData, setSignupData] = useState({});
	const [errMsg, setErrMsg] = useState(false);
	const router = useRouter();

	const handleChange = (e) => {
		let key = e.target.name;
		let val = e.target.value;
		setSignupData(curr => ({ ...curr, [key]: val }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (signupData.confirmPassword == signupData.password) {
			try {
				const res = await axios.post('https://stockanalyser-production.up.railway.app/u', { ...signupData, name: signupData.username, providerType: "credentials" });
				const data = await res.data;
				signIn('credentials', { username: signupData.username, password: signupData.password, callbackUrl: 'http://localhost:3000' });
			} catch (err) {
				router.push("/")
			}
		} else {
			setErrMsg(true);
		}
	}

	return (
		<div className={style.form}>
			<h1>Signup</h1>
			{
				errMsg &&
				<p className={style.err}>Please enter correct username and passwords!</p>
			}
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Username
					</label>
					<input type="text" placeholder="Username" name="username" onChange={handleChange} />
				</div>
				<div>
					<label>
						Email
					</label>
					<input type="email" placeholder="Email" name="email" onChange={handleChange} />
				</div>
				<div>
					<label>
						Password
					</label>
					<input placeholder="Password" type="password" name="password" onChange={handleChange} />
				</div>
				<div>
					<label>
						Confirm Password
					</label>
					<input placeholder="Password" type="password" name="confirmPassword" onChange={handleChange} />
				</div>
				<div>
					<input type="submit" value="signup" />
				</div>
			</form>
			<p>or</p>
			<div>
				<button className={style.loginbtn} onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}>Signin using Github</button>
			</div>
			<div>
				<button className={style.loginbtn} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}>Signin using Google</button>
			</div>
			<Link href='/login'>already have an account</Link>
		</div>
	);
}

export default Signup
