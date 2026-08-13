export default function handler(req, res) {
    // CORS izni
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        const data = req.body;
        // Veriyi geçici belleğe kaydet (Vercel serverless'da /tmp kullan)
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join('/tmp', 'bot_data.json');
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(200).json({ status: 'ok' });
    } 
    else if (req.method === 'GET') {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join('/tmp', 'bot_data.json');
        
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            res.status(200).json(JSON.parse(data));
        } else {
            res.status(200).json({ status: 'bekleniyor', guilds: [] });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
