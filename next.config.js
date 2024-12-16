/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  // https://d2j6dbq0eux0bg.cloudfront.net/
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2j6dbq0eux0bg-cdn.ecwid.net',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'd2j6dbq0eux0bg.cloudfront.net',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
};
