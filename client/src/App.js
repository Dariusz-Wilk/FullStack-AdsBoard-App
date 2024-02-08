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

import { fetchAds } from './redux/adsRedux';
import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './views/Navbar';
import Footer from './views/Footer';
import { API_URL } from './config';
import { useDispatch } from 'react-redux';
import { logIn } from './redux/usersRedux';

const App = () => {
	const dispatch = useDispatch();

	// const options = {
	// 	method: 'GET',
	// 	credentials: 'include',
	// };

	useEffect(() => {
		dispatch(fetchAds());
	}, [dispatch]);

	fetch(`${API_URL}/auth/user`)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error('Failed');
			}
		})
		.then(data => {
			dispatch(logIn({ login: data.user, id: data.id }));
			console.log(data);
		})
		.catch(e => {
			console.log(e);
		});

	return (
		<main className="d-flex flex-column vh-100 justify-content-between ">
			<div className="contentPage">
				<NavBar />
				<Container>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/ad/:id" element={<Ad />} />
						<Route path="/ad/add" element={<AddAd />} />
						<Route path="/ad/edit/:id" element={<EditAd />} />
						<Route
							path="/ad/search/:searchPhrase"
							element={<SearchResults />}
						/>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/user" element={<User />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			</div>
			<Footer />
		</main>
	);
};

export default App;
