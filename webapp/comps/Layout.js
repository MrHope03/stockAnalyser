import NavBar from "./navbar";
import Footer from "./footer";

const Layout = ({children}) => {
	return ( 
		<div className="content">
			<NavBar />
			<main>{children}</main>
			<Footer/>
		</div>
	 );
}
 
export default Layout
