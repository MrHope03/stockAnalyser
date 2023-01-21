import style from "../styles/dashboard.module.scss"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Wallet = ({ currAmt, user, setAddBalance }) => {
	const [amt, setAmt] = useState()
	const router = useRouter();
	const recharge = async (e) => {
		e.preventDefault();
		user.balance += parseFloat(amt)
		const res = await axios.put(`https://stockanalyser-production.up.railway.app/u/edit/${user.name}`, user);
		const data = await res.data;
		router.reload();
	}
	return (
		<div className={style.buyPortal}>
			<form onSubmit={recharge}>
				<p>Curr Balance: {currAmt} </p>
				<input type="text" name="amount" onChange={(e) => setAmt(e.target.value)} autoFocus />
				<div>
					<input type="submit" value="recharge" />
					<button className={style.errBtn} onClick={() => setAddBalance(false)}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

export default Wallet;
