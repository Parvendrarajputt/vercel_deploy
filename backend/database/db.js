import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://shivanshnema83:3En3HNOZEAbkeL6e@cluster0.6mzjsth.mongodb.net/`; 
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;



// import mongoose from 'mongoose';

// const Connection = async (username, password) => {
//     const URL = `mongodb+srv://${username}:${password}@cluster0.6mzjsth.mongodb.net/`; 
//     try {
//         const connection = await mongoose.connect(URL, { useNewUrlParser: true });
//         console.log('Database connected successfully');
//         return connection;
//     } catch (error) {
//         console.log('Error while connecting to the database: ', error);
//         throw error; // Rethrow the error to handle it elsewhere
//     }
// };

// export default Connection;
