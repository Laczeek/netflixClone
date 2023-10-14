import { useState } from 'react';

const useModal = () => {
	const [isModal, setIsModal] = useState(false);

	const showModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	return { isModal, showModal, closeModal };
};

export default useModal;
