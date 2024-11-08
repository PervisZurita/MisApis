import mongoose from 'mongoose';

let isConnected = false;

const conectarAMongoDB = async () => {
    if (isConnected) {
        console.log('Ya esta conectado a MongoDB', '\x1b[32m'); // El color verde
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('Conectado a MongoDB', '\x1b[32m'); // El color verde
    } catch (error) {
        console.log('Error al conectar a MongoDB', '\x1b[31m'); // El color rojo
    }
}

const db = mongoose.connection;
db.on('error', (error) => {
    isConnected = false;
    console.log('Error al conectar a MongoDB', '\x1b[31m'); // Color rojo
});

db.once('open', () => {
    isConnected = true;
});

db.on('disconnected', () => {
    isConnected = false;
    console.log('Desconectado de MongoDB', '\x1b[33m'); // Color amarillo
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB desconectado', '\x1b[33m'); // Color amarillo
    process.exit(0);
})

export {conectarAMongoDB,isConnected};