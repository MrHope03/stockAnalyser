import axios from "axios";
import { useState } from "react";
import style from "./../styles/market.module.scss"
import Loading from "../comps/loading"
import StockDashboard from "../comps/StockDashboard";


const Market = () => {
	const [symbol, setSymbol] = useState("");
	const [loading, setLoading] = useState(false);
	const [stock, setStock] = useState(null)


	const handleChange = (e) => {
		setSymbol(e.target.value);
	}
	const handleSubmit = async (e) => {
		if (e.keyCode == 13) {
			setStock(null)
			setLoading(true)
			const res = await axios.get(`http://localhost:8000/stock/${symbol}`);
			const data = await res.data;
			setLoading(false)
			setStock(data.stock);
			console.log(data.stock.history[0].date)
		}
	}

	return (
		<section className={style.searchSection}>
			<p> Search for stocks </p>
			<input className={style.searchbar} onChange={handleChange} onKeyDown={handleSubmit} type="text" name="symbol" placeholder="Type a Company or Brand symbol to search" autoFocus />
			{loading &&
				<Loading />
			}
			{stock &&
				<StockDashboard stock={stock} />
			}
		</section>
	)
}

export default Market;
