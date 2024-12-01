import app from "./app";
import MongoDbSetUp from "./db/db"
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
const dbInstance = MongoDbSetUp.getMongoDbSingletonInstance();
dbInstance.connect(process.env.MONGO_URI || "");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});