export default {
    images: {
        remotePatterns: [
            {
                protocol: 'https',  // Chấp nhận https
                hostname: '**',     // Chấp nhận tất cả hostname
            },
            {
                protocol: 'http',   // Chấp nhận http
                hostname: '**',     // Chấp nhận tất cả hostname
            },
        ],
    },
}


