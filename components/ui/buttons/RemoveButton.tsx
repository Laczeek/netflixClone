import { MinusIcon } from '@heroicons/react/24/solid';
import { MouseEvent } from 'react';

const RemoveButton = ({
	removeProductionFromQueueHandler,
}: {
	removeProductionFromQueueHandler: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) => {
	return (
		<button
			className='rounded-full bg-white p-5 text-black  hover:bg-black hover:text-white transition-colors duration-300'
			onClick={removeProductionFromQueueHandler}>
			<MinusIcon className='w-7 h-7 ' />
		</button>
	);
};

export default RemoveButton;
