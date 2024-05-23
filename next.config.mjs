/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/discover/movie',
        destination: `${process.env.API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
      },
      {
        source: '/api/movie/:id',
        destination: `${process.env.API_URL}/movie/:id?api_key=${process.env.API_KEY}`
      },
      {
        source: '/api/genre/movie/list',
        destination: `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`
      }
    ]
  }
};

export default nextConfig;
