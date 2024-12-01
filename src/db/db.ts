import mongoose, { ConnectOptions } from "mongoose";

export default class MongoDbSetUp {
    private static mongodbInstance: MongoDbSetUp;
    private dbConnection!: typeof mongoose | null;

    private constructor() {
        // this.dbConnection = null;
    }

    public static getMongoDbSingletonInstance(): MongoDbSetUp {
        if (!MongoDbSetUp.mongodbInstance) {
            MongoDbSetUp.mongodbInstance = new MongoDbSetUp();
        }
        return MongoDbSetUp.mongodbInstance;
    }

    public async connect(uri: string): Promise<void> {
        if (this.dbConnection) {
            console.log("MongoDb Connection is already stablished. Call method to get created instance.");
            return;
        }
        try {
            this.dbConnection = await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
              } as ConnectOptions);
              const dbName = mongoose.connection.name; 
              console.log("Connected to database:", dbName);
        } catch (error) {
            throw Error("Database Connection failed.");
        }
    }

    public disconnect(): void{
        if (this.dbConnection) {
            mongoose.disconnect();
            this.dbConnection = null;
            console.log("Mongodb connection disconnected.");
            return;
        }
    }
}