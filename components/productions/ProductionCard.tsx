import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Production } from '@prisma/client';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';

import PlayerModal from '../ui/modals/PlayerModal';
import useModal from '@/hooks/useModal';
import useChangeUser from '@/hooks/useChangeUser';
import { RootState } from '@/store/store';
import PlayerButton from '../ui/buttons/PlayerButton';
import AddButton from '../ui/buttons/AddButton';
import RemoveButton from '../ui/buttons/RemoveButton';
import LoadingSpinner from '../ui/loading/LoadingSpinner';

const ProductionCard = ({ production }: { production: Production }) => {
	const userQueue = useSelector((state: RootState) => state.queue);

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { isModal, showModal, closeModal } = useModal();
	const { changeQueue } = useChangeUser();

	const isThisProductionInUserQueue = userQueue.queue.find(queueProduction => queueProduction.id === production.id);

	const addProductionToQueueHandler = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.preventDefault();

		if (isThisProductionInUserQueue) {
			return;
		}
		setIsLoading(true);
		await changeQueue(production.id);
		setIsLoading(false);
	};

	const removeProductionFromQueueHandler = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.preventDefault();
		if (!isThisProductionInUserQueue) {
			return;
		}
		setIsLoading(true);
		await changeQueue(production.id);
		setIsLoading(false);
	};

	return (
		<div className=' max-w-[280px] px-1'>
			{isModal && <PlayerModal youtubeURL={production.youtubeURL} closeModal={closeModal} title={production.title} />}
			<Link href={`/production/${production.slug}`}>
				<div className='relative opacity-70 group  p-2 border-2 border-transparent hover:opacity-100 hover:border-netflix-red transition-all duration-300'>
					<Image
						src={production.image}
						width={350}
						height={450}
						alt={`${production.title} poster`}
						className='w-full h-[290px] sm:h-[300px] md:h-[340px]  object-cover'
					/>

					{!userQueue.isLoading && (
						<div className='hidden absolute bottom-8 right-8  group-hover:flex gap-x-4 items-center'>
							<PlayerButton showModal={showModal} />
							{!isLoading && router.pathname !== '/account' && !isThisProductionInUserQueue && (
								<AddButton addProductionToQueueHandler={addProductionToQueueHandler} />
							)}

							{!isLoading && router.pathname === '/account' && (
								<RemoveButton removeProductionFromQueueHandler={removeProductionFromQueueHandler} />
							)}

							{isLoading && (
								<div className='p-3 bg-white rounded-full'>
									<LoadingSpinner />
								</div>
							)}
						</div>
					)}
				</div>

				<p className='mt-2 ml-6'>{production.title}</p>
			</Link>
		</div>
	);
};

export default ProductionCard;
