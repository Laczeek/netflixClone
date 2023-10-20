import { PlusIcon } from '@heroicons/react/24/solid';
import { MouseEvent } from 'react';

const AddButton = ({
	addProductionToQueueHandler,
}: {
	addProductionToQueueHandler: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) => {
	return (
		<button
			className='rounded-full bg-white p-5 text-black  hover:bg-black hover:text-white transition-colors duration-300'
			onClick={addProductionToQueueHandler}>
			<PlusIcon className='w-7 h-7 ' />
		</button>
	);
};

export default AddButton;
