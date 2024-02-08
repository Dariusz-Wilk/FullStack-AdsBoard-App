import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { getAdById } from '../../redux/adsRedux';
import { IMG_URL } from '../../config';
import { Card, Col, Button, Modal } from 'react-bootstrap';
import { getLoggedUser } from '../../redux/usersRedux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { removeAd } from '../../redux/adsRedux';

const Ad = () => {
	const { id } = useParams();
	const adData = useSelector(state => getAdById(state, id));
	const loggedUser = useSelector(getLoggedUser);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const deleteAd = e => {
		e.preventDefault();

		dispatch(removeAd(id));

		const options = {
			method: 'DELETE',
		};
		fetch(`${API_URL}/api/ads/${id}`, options).then(res => {
			handleClose();
			navigate('/');
		});
	};

	console.log(adData);
	console.log(loggedUser);

	if (!adData) return <Navigate to={'/'} />;
	return (
		<div>
			<div className="d-flex justify-content-center">
				<Col className="py-4 col-12 col-sm-6 col-lg-6">
					<Card>
						<Card.Title className="text-center p-2">{adData.title}</Card.Title>
						<Card.Img variant="top" src={IMG_URL + adData.image} />
						<Card.Body>
							<p>
								<b>Location: </b>
								{adData.location}
							</p>
							<p>
								<b>Price: </b>
								{adData.price}
							</p>
							<p>Content: {adData.content}</p>
							<p>Published: {adData.publishDate}</p>
							<h5>Seller info</h5>

							<p>Seller: {adData.user.login}</p>
							<p>Phone number: {adData.user.phoneNumber}</p>

							{loggedUser?.login === adData.user.login && (
								<div className="d-flex justify-content-between">
									<Link to={`/ad/edit/${id}`}>
										<Button variant="outline-success m-1">Edit ad</Button>
									</Link>
									<Button onClick={handleShow} variant="outline-danger m-1">
										Delete
									</Button>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>
						This operation will completely remove this ad from the app.
						<br />
						Are you sure you want to do that?
					</p>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={handleClose} variant="secondary">
						Cancel
					</Button>
					<Button onClick={deleteAd} variant="danger">
						Remove
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Ad;
