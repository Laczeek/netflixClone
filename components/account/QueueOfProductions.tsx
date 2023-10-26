import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

import ProductionCardsGrid from '../productions/ProductionCardsGrid';
import { QueueListIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from '../ui/loading/LoadingSpinner';


const QueueOfProductions = () => {
	const userQueue = useSelector((state:RootState) => state.queue);

	return (
		<div>
			<div className='flex justify-center items-center gap-x-2 mt-8 mb-2'>
				<QueueListIcon className='w-14 h-14' />
				<h2 className='text-xl'>Queue</h2>
			</div>
			{userQueue.queue.length === 0 && !userQueue.isLoading && (
				<p className='text-center'>No productions added to your queue yet.</p>
			)}
			{userQueue.queue.length >= 0 && !userQueue.isLoading && <ProductionCardsGrid productions={userQueue.queue} />}
			{userQueue.isLoading && (
				<div className='flex justify-center mt-10'>
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
};

export default QueueOfProductions;
