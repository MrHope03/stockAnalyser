import axios from "axios";
import { useState } from "react";
import style from "./../styles/dashboard.module.scss"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SellPortal = ({ maxQty, price, stock, setSellPortal }) => {
	const [quantity, setQuantity] = useState(maxQty * -1);
	const { data: session } = useSession();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const req = {
			symbol: stock.symbol,
			name: stock.name,
			price: price,
			quantity: quantity,
		}
		const res = await axios.put(`https://stockanalyser-production.up.railway.app/u/${session.user.name}`, req);
		const data = await res.data;
		router.reload();
	}

	return (
		<div className={style.buyPortal}>
			<p>{stock.symbol} - {stock.name}</p>
			<table>
				<thead>
					<tr>
						<th>Curr Price</th>
						<th>Profit</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{price} <b>INR</b></td>
						<td>{(price * quantity * -1 ).toFixed(2)} <b>INR</b></td>
					</tr>
				</tbody>
			</table>
			<form onSubmit={handleSubmit}>
				<p>Number of Quantities</p>
				<div>
					<input type="button" value="-" onClick={() => setQuantity(n => (n >= -1) ? n : n + 1)} />
					<p>{quantity * -1}</p>
					<input type="button" value="+" onClick={() => setQuantity(n => (n <= maxQty * -1) ? n : n - 1)} />
				</div>
				<div>
					<input type="submit" value="Sell" />
					<button className={style.errBtn} onClick={() => setSellPortal(-1)}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

export default SellPortal;
