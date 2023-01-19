import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import style from "../../styles/dashboard.module.scss";
import Image from 'next/image'

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
	const res = await axios.get(`http://localhost:8000/profile/${uname}`);
	const user = await res.data;
	return {
		props: { user },
	}
}

const UserProfile = ({ user }) => {
	console.log(user)
	return (
		<div className={style.dashboard}>
			<div className={style.stockDashboard}>
				<div className={style.stockVal}>
					<div>
						<p>Total Stocks Quantity</p>
						<p>23</p>
					</div>
					<div>
						<p>Total Price</p>
						<p>23</p>
					</div>
					<div>
						<p>Total Companies</p>
						<p>23</p>
					</div>
				</div>
				<div className={style.stocks}>
					<div className={style.stock}>
						Stock Name
					</div>
				</div>
			</div>
			<div className={style.userdetail}>
				<img src={user.image} alt="user-avatar" height={150} width={150} />
				<p>{user.name}</p>
				<p>{user.email}</p>
			</div>
		</div>
	);
}

export default UserProfile;

// TODO: watchlist
// all stocks bought
// stocks { qty, avg price, LTP, realized PL, unrealized Pl }
