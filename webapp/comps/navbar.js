import Link from 'next/link'
import { useSession, signIn, signOut, newUser } from "next-auth/react"


const NavBar = () => {
	const { data: session } = useSession();
	console.log('Session:' + session)
	return (
		<nav>
			<ul>
				<Link href="/"><li>Home</li></Link>
				{
					!session ? (
						<>
							<li onClick={() => signIn()}>login</li>
							<Link href="/signup"><li>Signup</li></Link>
						</>
					)
						: (
							<>
								<li>{session.user.name}</li>
								<li onClick={() => signOut()}>logout</li>
							</>
						)
				}
			</ul>
		</nav>
	);
}

export default NavBar;
