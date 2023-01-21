import axios from "axios";
import { useState } from "react";
import style from "./../styles/market.module.scss"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from 'swr';

const fetcher = async (name) => {
	const res = await axios.get(`http://localhost:8000/u/${name}`)
	const data = await res.data
	return data.balance
}

const BuyPortal = ({ stock, setBuyPortal, convertToINR }) => {
	const [quantity, setQuantity] = useState(1);
	const { data: session } = useSession();
	const { data: balance } = useSWR('getUserBalance', () => fetcher(session.user.name));
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const req = {
			symbol: stock.symbol,
			name: stock.name,
			price: convertToINR(stock.quote.price,stock.currency),
			quantity: quantity,
		}
		const res = await axios.put(`http://localhost:8000/u/${session.user.name}`, req);
		const data = await res.data;
		router.push(`/user/${session.user.name}`)
	}

	return (
		<div className={style.buyPortal}>
			<p>{stock.symbol} - {stock.name}</p>
			<table>
				<thead>
					<tr>
						<th>Curr Price</th>
						<th>Purchase</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{convertToINR(stock.quote.price,stock.currency)} <b>INR</b></td>
						<td>{(convertToINR(stock.quote.price,stock.currency) * quantity)} <b>INR</b></td>
						<td>{balance ? balance?.toFixed(2): '-'} <b>INR</b></td>
					</tr>
				</tbody>
			</table>
			<form onSubmit={handleSubmit}>
				<p>Number of Quantities</p>
				<div>
					<input type="button" value="-" onClick={() => setQuantity(n => (n <= 1) ? n : n - 1)} />
					<p>{quantity}</p>
					<input type="button" value="+" onClick={() => setQuantity(n => n + 1)} />
				</div>
				<div>
					<input type="submit" value={(convertToINR(stock.quote.price,stock.currency) * quantity > balance) ? 'recharge' : 'buy'} />
					<button className={style.errBtn} onClick={() => setBuyPortal(false)}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

export default BuyPortal;
