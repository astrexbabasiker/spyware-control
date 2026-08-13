const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join('/tmp', 'bot_data.json');

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        const data = req.body;
        fs.writeFileSync(DATA_FILE, JSON.stringify(data));
        res.status(200).json({ status: 'ok' });
    } 
    else if (req.method === 'GET') {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            res.status(200).json(JSON.parse(data));
        } else {
            res.status(200).json({ status: 'bekleniyor' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
