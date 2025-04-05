export const getRedisConnection = () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        url: process.env.REDIS_PUBLIC_URL,
      };
    }
  
    return {
      host: 'redis_marketplace',
      port: 6379,
    };
  };
  