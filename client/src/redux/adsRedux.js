import { API_URL } from '../config';

//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find(ad => ad._id === id);

//actions
const createActionName = actionName => `app/ads/${actionName}`;
const DATA_ADS = createActionName('DATA_ADS');

//action creators
export const updateAds = payload => ({ type: DATA_ADS, payload });

export const fetchAds = () => {
	return async dispatch => {
		try {
			const res = await fetch(`${API_URL}/ads`);
			const data = await res.json();
			dispatch(updateAds(data));
		} catch (error) {
			console.log(error);
		}
	};
};

const adsReducer = (statePart = [], action) => {
	switch (action.type) {
		case DATA_ADS:
			return [...action.payload];
		default:
			return statePart;
	}
};

export default adsReducer;
