import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Production } from '@prisma/client';
import { MouseEvent } from 'react';

import PlayerModal from '../ui/modals/PlayerModal';
import useModal from '@/hooks/useModal';
import useChangeUser from '@/hooks/useChangeUser';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import PlayerButton from '../ui/buttons/PlayerButton';
import AddButton from '../ui/buttons/AddButton';
import RemoveButton from '../ui/buttons/RemoveButton';

const ProductionCard = ({ production }: { production: Production }) => {
	const authStatus = useSelector((state: RootState) => state.auth.authStatus);
	const router = useRouter();

	const { isModal, showModal, closeModal } = useModal();
	const { changeQueue } = useChangeUser();

	const isThisProductionInUserQueue = authStatus.data?.queue.find(productionId => productionId === production.id);

	const addProductionToQueueHandler = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.preventDefault();
		if (authStatus.data?.queue.includes(production.id)) {
			return;
		}
		await changeQueue(production.id);
	};

	const removeProductionFromQueueHandler = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.preventDefault();
		if (!authStatus.data?.queue.includes(production.id)) {
			return;
		}
		await changeQueue(production.id);
	};

	return (
		<div className='max-w-[280px] px-1'>
			{isModal && <PlayerModal youtubeURL={production.youtubeURL} closeModal={closeModal} title={production.title} />}
			<Link href={`/production/${production.slug}`}>
				<div className='relative opacity-70 group  p-2 border-2 border-transparent hover:opacity-100 hover:border-netflix-red transition-all duration-300'>
					<Image
						src={production.image}
						width={350}
						height={450}
						alt={`${production.title} poster`}
						className='w-full h-[250px] sm:h-[300px] md:h-[340px]  object-cover'
					/>

					<div className='hidden absolute bottom-8 right-8  group-hover:flex gap-x-4'>
						<PlayerButton showModal={showModal} />
						{router.pathname !== '/account' && !isThisProductionInUserQueue && !authStatus.loading && (
							<AddButton addProductionToQueueHandler={addProductionToQueueHandler} />
						)}

						{router.pathname === '/account' && !authStatus.loading && authStatus.data && (
							<RemoveButton removeProductionFromQueueHandler={removeProductionFromQueueHandler} />
						)}
					</div>
				</div>

				<p className='mt-2 ml-6'>{production.title}</p>
			</Link>
		</div>
	);
};

export default ProductionCard;
