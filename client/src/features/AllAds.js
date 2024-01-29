import { useSelector } from 'react-redux';
import { getAllAds } from '../redux/adsRedux';
import AdSmallCard from '../features/AdSmallCard';

const AllAds = () => {
	const ads = useSelector(getAllAds);

	return (
		<div className="d-flex flex-wrap justify-content-start p-0 my-4 ms-auto">
			{ads.map(ad => (
				<AdSmallCard key={ad._id} {...ad} />
			))}
		</div>
	);
};

export default AllAds;
