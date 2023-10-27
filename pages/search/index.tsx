import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Production } from '@prisma/client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import ProductionCardsGrid from '@/components/productions/ProductionCardsGrid';

const SearchPage = () => {
	const [query, setQuery] = useState('');
	const [error, setError] = useState('');
	const [productions, setProductions] = useState<Production[] | []>([]);
	const [filteredProductions, setFilteredProductions] = useState<[] | Production[]>([]);

	useEffect(() => {
		const fetchProductions = async () => {
			try {
				const response = await fetch('/api/production/get-all-productions');
				const data = await response.json();
				if (!response.ok) {
					throw data.error;
				}
				setProductions(data.productions);
			} catch (error: any) {
				console.log(error);
				setError(error.message);
			}
		};
		fetchProductions();
	}, []);

	useEffect(() => {
		if (query.trim().length === 0) {
			setFilteredProductions([]);
			return;
		}

		const timeout = setTimeout(() => {
			const result = productions.filter(production => {
				if (production.genre_name.toLowerCase() === query) {
					return production;
				}
				return production.title.toLowerCase().includes(query.toLowerCase());
			});

			setFilteredProductions(result);
		}, 500);

		return () => clearTimeout(timeout);
	}, [query]);

	return (
		<section className=' pt-[72px] container mx-auto'>
			<Head>
				<title>NetflixClone | Search</title>
			</Head>
			<div className='flex justify-center items-center  my-10  bg-netflix-gray-light px-6 py-8 rounded-lg '>
				<MagnifyingGlassIcon className='w-12 h-12' />
				<input
					type='text'
					placeholder='What are you looking for?'
					className='ml-4 text-lg w-full bg-transparent outline-none'
					value={query}
					onChange={event => setQuery(event.target.value)}
				/>
			</div>

			{!error && <ProductionCardsGrid productions={filteredProductions} />}
			{error && <p className='text-center mt-6'>{error}</p>}
		</section>
	);
};

export default SearchPage;
