import { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL = 'https://www.balldontlie.io/api/v1';

export const liveScores = (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const fetchLiveScores = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/games`, {
                params: { dates: [new Date().toISOString().split('T')[0]] },
            });
            res.write(`data: ${JSON.stringify(response.data)}\n\n`);
        } catch (error) {
            res.write(`event: error\ndata: "Error fetching live scores"\n\n`);
        }
    };

    const interval = setInterval(fetchLiveScores, 5000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
};
