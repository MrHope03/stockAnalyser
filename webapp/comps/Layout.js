import NavBar from "./navbar";
import Footer from "./footer";

const Layout = ({childrens}) => {
	return ( 
		<div className="content">
			<NavBar />
			{childrens}
			<Footer/>
		</div>
	 );
}
 
export default Layout
