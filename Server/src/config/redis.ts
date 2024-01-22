import * as redis from "redis";
const redisClient = redis.createClient();
(async () => {
  await redisClient
    .on("error", (err) => console.log("Redis Error", err))
    .connect();
})();

export default redisClient;
