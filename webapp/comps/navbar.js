import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { Roboto, Roboto_Mono } from '@next/font/google';

const roboto = Roboto_Mono({
	subsets: ['latin'],
	weight: ['500'],
	style: ['normal']
})

const NavBar = () => {
	const { data: session } = useSession();
	return (
		<nav className={roboto.className}>
			<ul>
				<Link href="/"><li>Home</li></Link>
				<Link href="/market"><li>Market</li></Link>
				{
					!session ? (
						<>
							<Link href="/login"><li>login</li></Link>
						</>
					)
						: (
							<>
								<Link href={`/user/${session.user.name}`}><li>{session.user.name}</li></Link>
							</>
						)
				}
			</ul>
		</nav>
	);
}

export default NavBar;
