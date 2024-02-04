import { API_URL } from '../../config';
import { logOut } from '../../redux/usersRedux';
import { useDispatch } from 'react-redux';

const Logout = () => {
	const dispatch = useDispatch();

	const options = {
		method: 'DELETE',
	};

	fetch(`${API_URL}/auth/logout`, options).then(res => {
		dispatch(logOut());
	});

	return (
		<p className="text-center my-5">Now you are logged out, see you soon!</p>
	);
};

export default Logout;
