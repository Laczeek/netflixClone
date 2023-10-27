/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.i-scmp.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'i.ebayimg.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'img.rgstatic.com',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
