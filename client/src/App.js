import Home from './components/pages/Home';
import Ad from './components/pages/Ad';
import AddAd from './components/pages/AddAd';
import EditAd from './components/pages/EditAd';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import User from './components/pages/User';
import Logout from './components/pages/Logout';
import NotFound from './components/pages/NotFound';
import SearchResults from './components/pages/SearchResults';

import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './views/Navbar';
import Footer from './views/Footer';

const App = () => {
	return (
		<main>
			<NavBar />
			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ad/:id" element={<Ad />} />
					<Route path="/ad/add" element={<AddAd />} />
					<Route path="/ad/edit/:id" element={<EditAd />} />
					<Route path="/ad/search/:searchPhrase" element={<SearchResults />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/user" element={<User />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
			<Footer />
		</main>
	);
};

export default App;
