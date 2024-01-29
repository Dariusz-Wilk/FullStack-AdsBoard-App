import { Form, Button } from 'react-bootstrap';

const Register = () => {
	return (
		<Form className="col-12 col-xl-4 col-md-6 col-sm-6 mx-auto">
			<h1 className="my-4 text-center">Register</h1>

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

			<Form.Group
				className="mb-3 d-flex align-items-center"
				controlId="formFile">
				<Form.Label className="my-0" style={{ flex: '1 0 0' }}>
					Avatar
				</Form.Label>
				<Form.Control
					type="file"
					style={{ flex: '3 0 0' }}
					className="ms-2 shadow-none"
				/>
			</Form.Group>
			<Form.Group
				className="mb-3 d-flex align-items-center"
				controlId="formPhoneNumber">
				<Form.Label className="my-0" style={{ flex: '1 0 0' }}>
					Phone number
				</Form.Label>
				<Form.Control
					type="text"
					style={{ flex: '3 0 0' }}
					className="ms-2 shadow-none"
					placeholder="Phone number"
				/>
			</Form.Group>

			<Button className="w-100" variant="success" type="submit">
				Sign up
			</Button>
		</Form>
	);
};

export default Register;
