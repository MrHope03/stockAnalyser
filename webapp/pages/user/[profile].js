import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import style from "../../styles/dashboard.module.scss";

export async function getStaticPaths() {
	const res = await axios.get("http://localhost:8000/u");
	const users = await res.data;
	const paths = users.map(user => ({ params: { profile: user.username } }))
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps(context) {
	const uname = context.params.profile;
	const res = await axios.get(`http://localhost:8000/profile/${uname}`);
	const user = await res.data;
	return {
		props: { user },
	}
}

// export async function getServerSideProps(context) {
// 	const session = await unstable_getServerSession(context);
// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: `/api/auth/signin?callbackUrl=http://localhost:3000/`,
// 				permanent: false,
// 			},
// 		}
// 	}
// 	const uname = context.params.profile;
// 	const res = await axios.get(`http://localhost:8000/profile/${uname}`);
// 	const user = await res.data;
// 	return {
// 		props: { session, user },
// 	}

// }

const UserProfile = ({ user }) => {
	console.log(user)
	return (
		<div className={style.dashboard}>
			<p>Email: {user.email}</p>
			<p>Username: {user.username}</p>
			<p>Password: {user.password}</p>
		</div>
	);
}

export default UserProfile;
