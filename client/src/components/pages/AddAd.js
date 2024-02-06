import AdForm from '../../features/AdForm';
import { API_URL } from '../../config';
import { useState } from 'react';

const AddAd = () => {
	const [user, setUser] = useState(null);

	fetch(`${API_URL}/auth/user`)
		.then(res => {
			console.log(res);
			if (res.status === 200) {
				return setUser('user');
			} else {
				setUser(null);
				throw new Error('Failed');
			}
		})

		.catch(e => {
			console.log(e);
		});
	return (
		<div>
			<p className="text-center">AddAd</p>
			{user !== null ? (
				<AdForm />
			) : (
				<p className="text-center my-5">You are not authorised</p>
			)}
		</div>
	);
};

export default AddAd;
