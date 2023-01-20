import axios from "axios";
import { useState } from "react";
import style from "./../styles/market.module.scss"
import Loading from "../comps/loading"
import StockDashboard from "../comps/StockDashboard";
import BuyPortal from "../comps/buyPortal";

const Market = () => {
	const [symbol, setSymbol] = useState("");
	const [loading, setLoading] = useState(false);
	const [stock, setStock] = useState(null)
	const [buyPortal, setBuyPortal] = useState(false);
	
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
			setStock(data);
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
				<StockDashboard stock={stock} setBuyPortal={setBuyPortal} />
			}
			{buyPortal  &&
				<BuyPortal stock={stock} setBuyPortal={setBuyPortal}/>
			}
		</section>
	)
}

export default Market;
