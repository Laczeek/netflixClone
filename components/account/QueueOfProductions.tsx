import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Production } from '@prisma/client';
import { QueueListIcon } from '@heroicons/react/24/solid';

import ProductionCardsGrid from '../productions/ProductionCardsGrid';
import LoadingSpinner from '../ui/loading/LoadingSpinner';

const QueueOfProductions = ({ currentQueue }: { currentQueue: string[] }) => {
	const [productions, setProductions] = useState<[] | Production[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsLoading(true);
		const fetchProductions = async () => {
			try {
				const response = await fetch('/api/user/queue-productions');

				if (response.status === 401) {
					return router.push('/auth');
				}
				const data = await response.json();

				if (!response.ok) {
					throw data.error;
				}

				setProductions(data.productions);
			} catch (error: any) {
				console.log(error.message);
			}
			setIsLoading(false);
		};
		fetchProductions();
	}, [currentQueue]);

	return (
		<div className='mt-10'>
			<div className='flex justify-center items-center gap-x-2 mb-4'>
				<QueueListIcon className='w-14 h-14' />
				<h2 className='text-xl'>Queue</h2>
			</div>

			{isLoading && (
				<div className='flex justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{currentQueue.length !== 0 && !isLoading && <ProductionCardsGrid productions={productions} />}
			{currentQueue.length === 0 && !isLoading && (
				<p className='text-center'>No production has been added to the queue yet.</p>
			)}
		</div>
	);
};

export default QueueOfProductions;
