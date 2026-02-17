import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
    devIndicators: {
        position: 'bottom-right',
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'http', hostname: '127.0.0.1' },
            { protocol: 'http', hostname: 'localhost' }
        ],
    },
};

export default nextConfig;
