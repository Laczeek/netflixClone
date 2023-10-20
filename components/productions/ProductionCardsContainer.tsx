import { GenreName, Production, TypeName } from '@prisma/client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductionCard from './ProductionCard';

const ProductionCardsContainer = ({
	productions,
	genre,
	type,
}: {
	productions: Production[];
	genre: GenreName;
	type: TypeName | 'PRODUCTION';
}) => {
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
		<div className='relative  mb-10 '>
			<h2 className='text-xl font-bold mb-2 capitalize'>
				{<span className='text-netflix-red'>{genre.toLocaleLowerCase()} </span>}
				{`${type.toLocaleLowerCase()}s`}
			</h2>
			<Carousel
				responsive={responsive}
				swipeable={true}
				draggable={true}
				infinite={true}
				ssr={true}
				partialVisible={false}
				
				>
				{productions.map(production => (
					<ProductionCard key={production.id} production={production} />
				))}
			</Carousel>
		</div>
	);
};

export default ProductionCardsContainer;
