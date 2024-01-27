import { useSelector } from 'react-redux';
import { getAllAds } from '../redux/adsRedux';

const AllAds = () => {
	const ads = useSelector(getAllAds);
	console.log(ads);

	return ads;
};

export default AllAds;
