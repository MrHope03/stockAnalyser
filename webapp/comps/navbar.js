import Link from 'next/link'
import { useSession, signIn, signOut, newUser } from "next-auth/react"


const NavBar = () => {
	const { data: session } = useSession();
	return (
		<nav>
			<ul>
				<Link href="/"><li>Home</li></Link>
				{
					!session ? (
						<>
							<Link href="/login"><li>login</li></Link>
							<Link href="/signup"><li>Signup</li></Link>
						</>
					)
						: (
							<>
								<Link href={`/user/${session.user.name}`}><li>{session.user.name}</li></Link>
								<li onClick={() => signOut({ scallbackUrl: 'http://localhost:3000' })}>logout</li>
							</>
						)
				}
			</ul>
		</nav>
	);
}

export default NavBar;
