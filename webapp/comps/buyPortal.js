import axios from "axios";
import { useState } from "react";
import style from "./../styles/market.module.scss"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const BuyPortal = ({ stock, setBuyPortal }) => {
	const [quantity, setQuantity] = useState(1);
	const { data: session } = useSession();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const req = {
			symbol: stock.symbol,
			name: stock.name,
			price: stock.quote.price,
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
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{(stock.quote.price).toFixed(2)} {stock.currency}</td>
						<td>{(stock.quote.price * quantity).toFixed(2)} {stock.currency}</td>
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
					<input type="submit" value="Buy" />
					<button className={style.errBtn} onClick={() => setBuyPortal(false)}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

export default BuyPortal;
