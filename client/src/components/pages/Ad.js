import { useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getAdById } from '../../redux/adsRedux';
import { IMG_URL } from '../../config';
import { Card, Col } from 'react-bootstrap';

const Ad = () => {
	const { id } = useParams();
	const adData = useSelector(state => getAdById(state, id));
	console.log(adData);

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
							<p>Phone number: {adData.user.phone}</p>
						</Card.Body>
					</Card>
				</Col>
			</div>
		</div>
	);
};

export default Ad;
