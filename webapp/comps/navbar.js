import Link from 'next/link'

const NavBar = () => {
	return (
		<nav>
			<ul>
				<Link href="/"><li>login</li></Link>
				<Link href="/login"><li>login</li></Link>
				<Link href="/signup"><li>Signup</li></Link>
			</ul>
		</nav>
	);
}

export default NavBar;
