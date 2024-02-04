import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { API_URL } from '../../config';
import { Alert, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/usersRedux';

const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(null); // loading, success, clientError, serverError

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login, password }),
		};
		setStatus('loading');
		fetch(`${API_URL}/auth/login`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus('loading');
					setTimeout(() => {
						setStatus('success');
						fetch(`${API_URL}/auth/user`)
							.then(res => {
								console.log(res);
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
					}, 400);
					setTimeout(() => {
						navigate('/');
					}, 3000);
				} else if (res.status === 400) {
					setStatus('clientError');
				} else if (res.status === 409) {
					setStatus('loginError');
				} else {
					setStatus('serverError');
				}
			})
			.catch(err => {
				setStatus('serverError');
			});
	};

	return (
		<Form className="col-12 col-sm-4 mx-auto" onSubmit={handleSubmit}>
			<h1 className="my-4 text-center">Log in</h1>

			{status === 'loading' && (
				<Spinner
					className="d-block mx-auto my-3"
					animation="border"
					role="status">
					<span className="visually-hidden mx-auto">Loading...</span>
				</Spinner>
			)}

			{status === 'success' && (
				<Alert variant="success">
					<Alert.Heading>Succes!</Alert.Heading>
					<p>You have been succesfully logged in</p>
				</Alert>
			)}

			{status === 'serverError' && (
				<Alert variant="danger">
					<Alert.Heading>Something went wrong...!</Alert.Heading>
					<p>Unexpected error... Try again!</p>
				</Alert>
			)}

			{status === 'clientError' && (
				<Alert variant="danger">
					<Alert.Heading>Not enough data</Alert.Heading>
					<p>You have to fill all the fields.</p>
				</Alert>
			)}
			{status === 'loginError' && (
				<Alert variant="danger">
					<Alert.Heading>Incorrect data</Alert.Heading>
					<p>Login or password are incorrect</p>
				</Alert>
			)}

			<Form.Group
				className="mb-3 d-flex align-items-center"
				controlId="formLogin">
				<Form.Label className="my-0" style={{ flex: '1 0 0' }}>
					Login
				</Form.Label>
				<Form.Control
					type="text"
					style={{ flex: '3 0 0' }}
					className="ms-2 shadow-none"
					placeholder="Enter login"
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
			</Form.Group>

			<Form.Group
				className="mb-3 d-flex align-items-center"
				controlId="formPassword">
				<Form.Label className="my-0" style={{ flex: '1 0 0' }}>
					Password
				</Form.Label>
				<Form.Control
					type="password"
					style={{ flex: '3 0 0' }}
					className="ms-2 shadow-none"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</Form.Group>

			<Button className="my-2 w-100" variant="success" type="submit">
				Sign in
			</Button>
		</Form>
	);
};

export default Login;
