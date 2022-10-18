import mongoose from "mongoose"; //connnect to the MongoDB database using Mongoose 

const connectToDb = () => mongoose.connect(
    'mongodb+srv:// ${ process.env.atlasUser } : ${process.env.atlastPassword} @cluster0.mvwqeoo.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true, 
        useFindAndModify: false 
    }   
); 

export default connectToDb; 