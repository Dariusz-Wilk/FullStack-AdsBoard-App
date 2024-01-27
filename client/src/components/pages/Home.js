// import AllAds from '../../features/AllAds';
import { useDispatch } from 'react-redux';
import { updateAds } from '../../redux/adsRedux';
import { API_URL } from '../../config';
import Search from '../../features/Search';

const Home = () => {
	const dispatch = useDispatch();

	const fetchAds = async () => {
		try {
			const res = await fetch(`${API_URL}/ads`);
			const data = await res.json();
			console.log(data);
			dispatch(updateAds(data));
		} catch (error) {
			console.log(error);
		}
	};

	fetchAds();

	return (
		<div className="home">
			<Search />
			<p>Home...</p>
		</div>
	);
};

export default Home;
