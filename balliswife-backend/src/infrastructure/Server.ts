import express from 'express';
import dotenv from 'dotenv';
import router from '../presentation/routes';
import cors from 'cors';

dotenv.config();

const app = express();

// Allow requests from specific origins (local and deployed React app)
const allowedOrigins = [
    'http://localhost:3000', // Local React app
    'https://balliswife.vercel.app' // Deployed React app on Vercel
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Optional: if using cookies or other credentials
}));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
