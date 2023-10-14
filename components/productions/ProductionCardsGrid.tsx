import { Production } from '@prisma/client';
import ProductionCard from './ProductionCard';

const ProductionCardsGrid = ({ productions }: { productions: Production[] }) => {
	return (
		<div className='container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-6 justify-items-center'>
			{productions.map(production=> (
				<ProductionCard key={production.id} production={production} />
			))}
		</div>
	);
};

export default ProductionCardsGrid;
