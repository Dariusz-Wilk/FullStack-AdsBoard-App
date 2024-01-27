import { useSelector } from 'react-redux';
import { getAllAds } from '../redux/adsRedux';
import AdSmallCard from '../features/AdSmallCard';

const AllAds = () => {
	const ads = useSelector(getAllAds);

	return (
		<ul className="d-flex flex-wrap justify-content-between p-0 my-4">
			{ads.map(ad => (
				<AdSmallCard key={ad._id} {...ad} />
			))}
		</ul>
	);
};

export default AllAds;
