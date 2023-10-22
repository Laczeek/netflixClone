import { ChangeEvent } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const stars = [
	{ value: 5, text: 'Excelent' },
	{ value: 4, text: 'Good' },
	{ value: 3, text: 'Ok' },
	{ value: 2, text: 'Poor' },
	{ value: 1, text: 'Bad' },
];

const RatingForm = ({
	changeRatingHandler,
	ratingValue,
}: {
	changeRatingHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	ratingValue: number | null;
}) => {
	return (
		<ul className='flex flex-row-reverse  gap-x-1 mb-4'>
			{stars.map(star => (
				<li
					key={star.value}
					className={`group  relative peer  peer-hover:text-yellow-300 hover:text-yellow-500 ${
						ratingValue && ratingValue >= star.value && 'text-yellow-300'
					}`}>
					<label key={star.value}>
						<input type='radio' value={star.value} className='hidden w-full ' onChange={changeRatingHandler} />
						<StarIcon
							className=' w-10 h-10 cursor-pointer
                    '
						/>
						<span
							role='tooltip'
							className='pointer-events-none absolute -top-16 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-200 text-black p-2 rounded-md'>
							{star.text}
						</span>
					</label>
				</li>
			))}
		</ul>
	);
};

export default RatingForm;
