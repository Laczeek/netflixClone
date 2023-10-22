import { StarIcon } from '@heroicons/react/24/solid';

const stars = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];

const Rating = ({ ratingValue }: { ratingValue: number }) => {
	const roundedRating = Math.round(ratingValue);

	return (
		<ul className='flex ml-auto'>
			{stars.map(star => (
				<li key={star.value}>
					<StarIcon className={`w-8 h-8 ${roundedRating >= star.value && 'text-yellow-300'}`} />
				</li>
			))}
		</ul>
	);
};

export default Rating;
