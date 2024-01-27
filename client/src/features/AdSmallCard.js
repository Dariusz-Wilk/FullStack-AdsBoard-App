import { Button, Card } from 'react-bootstrap';
import styles from './AdSmallCard.module.scss';
import { IMG_URL } from '../config';
import { Link } from 'react-router-dom';
import Ad from '../components/pages/Ad';

const AdSmallCard = ({
	title,
	content,
	publishDate,
	image,
	price,
	location,
	_id,
}) => {
	return (
		<Card style={{ width: '29%', margin: '2%' }}>
			<Card.Img
				className={styles.cardImage}
				variant="top"
				src={IMG_URL + image}
			/>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text className="mb-3 text-muted">{location}</Card.Text>

				<Link to={`/ad/${_id}`} element={<Ad />}>
					<Button variant="primary">Read more...</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default AdSmallCard;
