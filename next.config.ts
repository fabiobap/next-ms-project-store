/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
    },
}
module.exports = nextConfig;