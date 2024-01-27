import { Button, Card } from 'react-bootstrap';
import styles from './AdSmallCard.module.scss';
import { IMG_URL } from '../config';

const AdSmallCard = ({
	title,
	content,
	publishDate,
	image,
	price,
	location,
}) => {
	return (
		<Card style={{ width: '45%', margin: '2%' }}>
			<Card.Img
				className={styles.cardImage}
				variant="top"
				src={IMG_URL + image}
			/>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text className="mb-3 text-muted">{location}</Card.Text>
				<Button variant="primary">Read more...</Button>
			</Card.Body>
		</Card>
	);
};

export default AdSmallCard;
