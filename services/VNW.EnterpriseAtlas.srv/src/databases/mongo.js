import mongoose from "mongoose";

const password = encodeURIComponent("Tikcom@192.168.1.1@hnlhnl123")
const uri = `mongodb://admin:${password}@103.218.122.181:27017/VNW?authSource=admin`;
let retries = 0;
const MAX_RETRIES = 10
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

const connect_mongo = async () => {
    try{
        await mongoose.connect(uri, options);
        // mongoose.connection.useDb('VNW');
    }
    catch (err) {
        if (retries < MAX_RETRIES){
            retries+=1
            setTimeout(connect_mongo, 5000);
        }
        else {
            console.log(err)
        }
    }
}

// Lắng nghe các sự kiện MongoDB
mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected. Reconnecting...");
    connect_mongo(); // Gọi lại hàm kết nối khi mất kết nối
});

mongoose.connection.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});

await connect_mongo();