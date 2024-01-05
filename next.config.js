/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
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
