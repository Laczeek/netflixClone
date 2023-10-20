
const Modal = ({closeModal, children} : {closeModal: () => void, children: React.ReactNode}) => {
   return  <div
			className='fixed inset-0 z-[9999] w-full h-screen bg-netflix-gray-light bg-opacity-70  transition-opacity flex justify-center items-center '
			onClick={closeModal}>
			<div
				className='absolute  p-6 sm:p-12 w-[95%]  max-w-[900px] bg-netflix-gray-medium flex flex-col justify-center items-center rounded-2xl '
				onClick={event => event.stopPropagation()}>
				{children}
			</div>
		</div>
}

export default Modal;