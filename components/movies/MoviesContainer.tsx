import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MovieType } from '@/models/models';
import Movie from './Movie';

const MoviesContainer = ({ movies, genre }: { movies: MovieType[]; genre: string }) => {
	const genreTitle = genre.split(' ');

	const responsive = {
		ultraWideDesktop: {
			breakpoint: { max: 3000, min: 1800 },
			items: 6,
			slidesToSlide: 6, // optional, default to 1.
		},
		wideDesktop: {
			breakpoint: { max: 1800, min: 1400 },
			items: 5,
			slidesToSlide: 5, // optional, default to 1.
		},
		desktop: {
			breakpoint: { max: 1400, min: 1024 },
			items: 4,
			slidesToSlide: 4, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 768 },
			items: 3,
			slidesToSlide: 3, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 767, min: 464 },
			items: 2,
			slidesToSlide: 1, // optional, default to 1.
		},
	};

	return (
		<div className='relative   mb-10 '>
			<h2 className='text-xl font-bold mb-2'>
				{<span className='text-netflix-red'>{genreTitle[0]} </span>}
				{genreTitle[1]}
			</h2>
			<Carousel
				responsive={responsive}
				swipeable={true}
				draggable={true}
				infinite={true}
				ssr={true}
				partialVisible={false}>
				{movies.map(movie => (
					<Movie key={movie.id} {...movie} />
				))}
			</Carousel>
		</div>
	);
};

export default MoviesContainer;
