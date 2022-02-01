import { connect, connection } from "mongoose";

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkDB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connection;