export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    connection: process.env.MONGO_CONNECTION_STRING,
  },
  auth: {
    secret: process.env.JWT_SECRET,
  },
});
