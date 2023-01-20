import { getSession } from "next-auth/react";
import axios from "axios";
import style from "../../styles/dashboard.module.scss";
import useSWR from 'swr';
import { useState } from "react";
import SellPortal from "../../comps/sellPortal"
import Wallet from "../../comps/addBalance";

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: `/login`,
				permanent: false,
			},
		}
	}
	const uname = context.params.profile;
	const res = await axios.get(`http://localhost:8000/u/${uname}`);
	const user = await res.data;
	return {
		props: { user },
	}
}

const fetcher = async (user) => {
	const res = await axios.post('http://localhost:8000/price', user.userStocks.map((stock) => stock.symbol));
	const data = await res.data;
	return data
}

const UserProfile = ({ user }) => {
	const { data: currPrice } = useSWR('fetchRealtimeData', () => fetcher(user));
	const [sellPortal, setSellPortal] = useState(-1);
	const [addBalance, setAddBalance] = useState(false);

	return (
		<div className={style.dashboard}>
			<div className={style.stockDashboard}>
				<div className={style.stockVal}>
					<div>
						<h3>User Balance</h3>
						<p>{(user.balance).toFixed(2)} USD</p>
						<button onClick={() => setAddBalance(true)}> + </button>
					</div>
					<div>
						<h3>Total Amount Invested</h3>
						<p>{
							(user.userStocks.reduce((total, stock) => total + (stock.price * stock.quantity), 0)).toFixed(2)
						} USD</p>
					</div>
					<div>
						<h3>Total Stocks Invested</h3>
						<p>{user.userStocks.reduce((total, stock) => total + stock.quantity, 0)}</p>
					</div>
				</div>
				<div className={style.stocks}>
					{
						user.userStocks.map((stock, key) => (
							<div className={style.stock} key={key}>
								<table>
									<thead>
										<tr>
											<th>Stock ID</th>
											<th>Stock Name</th>
											<th>Quantity</th>
											<th>Price</th>
											<th>Curr Price</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{stock.symbol}</td>
											<td>{stock.name}</td>
											<td>{stock.quantity}</td>
											<td>{(stock.price).toFixed(2)} USD</td>
											<td>{currPrice ? currPrice[key] : "-"} USD</td>
										</tr>
									</tbody>
								</table>
								{currPrice &&
									currPrice[key] < stock.price ? (
									<img src="/decrease.png" alt="Stock decrease" height={50} width={50} />
								) : (
									<img src="/increase.png" alt="Stock increase" height={50} width={50} />
								)
								}
								<button onClick={() => setSellPortal(key)}>Sell</button>
							</div>
						))
					}
				</div>
			</div>
			<div className={style.userdetail}>
				<img src={user.image} alt="user-avatar" height={150} width={150} />
				<p>{user.name}</p>
				<p>{user.email}</p>
			</div>
			{sellPortal != -1 &&
				<SellPortal maxQty={user.userStocks[sellPortal].quantity} price={currPrice[sellPortal]} stock={user.userStocks[sellPortal]} setSellPortal={setSellPortal} />
			}{addBalance &&
				<Wallet currAmt={user.balance} setAddBalance={setAddBalance} user={user} />
			}
		</div>
	);
}

export default UserProfile;
