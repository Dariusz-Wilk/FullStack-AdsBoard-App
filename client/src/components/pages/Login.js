import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
	return (
		<Form className="col-12 col-sm-4 mx-auto">
			<h1 className="my-4 text-center">Log in</h1>

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
				/>
			</Form.Group>

			<Button className="my-2 w-100" variant="success" type="submit">
				Sign in
			</Button>
		</Form>
	);
};

export default Login;
