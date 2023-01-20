import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

const Footer = () => {
	return (
		<footer>
			<p>Contact us</p>
			<div>
				<Link href="https://twitter.com/Mr_Hope03">
					<FontAwesomeIcon icon={faTwitter} size={"2x"} />
				</Link>
				<FontAwesomeIcon icon={faHeart} size={"2x"} />
				<Link href="https://github.com/MrHope03">
					<FontAwesomeIcon icon={faGithub} size={"2x"} />
				</Link>
			</div>
		</footer>
	);
}

export default Footer;
