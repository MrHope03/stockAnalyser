import CandleStickGraph from "../comps/CandleStickGraph";
import style from "./../styles/market.module.scss"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react";


const StockDashboard = ({ stock, setBuyPortal, convertToINR }) => {
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<div className={style.stockcontainer} id="stockdetail">
			<div className={style.stockData}>
				<div className={style.stockheader}>
					<h2>{stock.symbol} : {stock.name} ({stock.stockExchange})
						<button onClick={() => { if (session) setBuyPortal(true); else router.push("/login") }}>Buy Stocks</button>
					</h2>
					<div>
						<p>Price Summary</p>
						<table>
							<thead>
								<tr>
									<th>TODAY'S LOW</th>
									<th>TODAY'S HIGH</th>
									<th>CURR PRICE</th>
									<th>YEAR'S LOW</th>
									<th>YEAR'S HIGH</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{convertToINR(stock.quote.dayLow, stock.currency)} <b>INR</b></td>
									<td>{convertToINR(stock.quote.dayHigh, stock.currency)} <b>INR</b></td>
									<td>{convertToINR(stock.quote.price, stock.currency)} <b>INR</b></td>
									<td>{convertToINR(stock.quote.yearLow, stock.currency)} <b>INR</b></td>
									<td>{convertToINR(stock.quote.yearHigh, stock.currency)} <b>INR</b></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className={style.stockbody}>
					<p>Stats</p>
					<table>
						<thead>
							<tr>
								<th>VOLUME</th>
								<th>AVG VOLUME</th>
								<th>CHANGE FROM AVG50</th>
								<th>CHANGE</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{stock.quote.volume}</td>
								<td>{stock.quote.avgVolume}</td>
								<td>{stock.quote.changeFromAvg50InPercent}%</td>
								<td>{stock.quote.changeInPercent}%</td>
							</tr>
						</tbody>
						<thead>
							<tr>
								<th>MARKET CAP</th>
								<th>OUTSTANDING SHARES</th>
								<th>CHANGE FROM AVG50</th>
								<th>MARKET CAP</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{convertToINR(stock.stats.marketCap, stock.currency)} <b>INR</b></td>
								<td>{stock.stats.sharesOutstanding}</td>
								<td>{stock.stats.pe}</td>
								<td>{stock.stats.eps}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<CandleStickGraph hist={stock.history} />
		</div>
	);
}

export default StockDashboard;
