/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/user",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
