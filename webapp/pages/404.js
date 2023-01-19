import Link from "next/link";

const PageNotFound = () => {
	return (
		<div className="errorpage">
			<h1>Error 404</h1>
			<Link href="/"><button>Go Home</button></Link>
		</div>
	);
}

export default PageNotFound;
