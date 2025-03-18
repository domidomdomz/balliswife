import express from 'express';
import dotenv from 'dotenv';
import router from '../presentation/routes';
import cors from 'cors';

dotenv.config();

const app = express();

// Allow requests from specific origins (e.g., React frontend)
app.use(cors({
    origin: 'http://localhost:3000', // The React app's origin
}));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
