import axios from "axios";
import { useState } from "react";
import style from "./../styles/market.module.scss"
import Loading from "../comps/loading"
import StockDashboard from "../comps/StockDashboard";
import BuyPortal from "../comps/buyPortal";
import { Raleway } from "@next/font/google";

const raleway = Raleway({
	weight: ['500'],
	style: ['normal'],
	subsets: ['latin']
})

const Market = () => {
	const [symbol, setSymbol] = useState("");
	const [loading, setLoading] = useState(false);
	const [stock, setStock] = useState(null)
	const [buyPortal, setBuyPortal] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const handleChange = (e) => {
		setSymbol(e.target.value);
	}
	const handleSubmit = async (e) => {
		if (e.keyCode == 13) {
			setStock(null)
			setErrMsg("")
			setLoading(true)
			try {
				const res = await axios.get(`http://localhost:8000/stock/${symbol}`);
				const data = await res.data;
				setStock(data);
			}
			catch (err) {
				console.log(err);
				setErrMsg("Error: couldn't find the stock ID you were looking for")
			}
			setLoading(false)
		}
	}

	return (
		<section className={style.searchSection}>
			<p className={raleway.className}> Search for stocks </p>
			<input className={style.searchbar} onChange={handleChange} onKeyDown={handleSubmit} type="text" name="symbol" placeholder="Type a Company or Brand symbol to search" autoFocus />
			{loading &&
				<Loading />
			}
			{
				<p className={style.err}>{errMsg}</p>
			}
			{stock &&
				<StockDashboard stock={stock} setBuyPortal={setBuyPortal} />
			}
			{buyPortal &&
				<BuyPortal stock={stock} setBuyPortal={setBuyPortal} />
			}
		</section>
	)
}

export default Market;
