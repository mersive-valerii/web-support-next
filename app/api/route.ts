const axios = require('axios');
const https = require('https');
const FormData = require('form-data');

export async function POST(req: Request) {
    try {
        const { podIp, podPassword, LICENSE_pkg, fileName } = await req.json();

        if (!podIp || !podPassword || !LICENSE_pkg || !fileName) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const url = `https://${podIp}/Config/service/uploadLicense`;

        const formData = new FormData();
        formData.append('LICENSE_pkg', LICENSE_pkg, fileName);

        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders(),
            },
            auth: {
                username: 'admin',
                password: podPassword,
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            timeout: 10000, // Set timeout to 5000ms or 5 seconds
        });

        const responseData = response.data

        if (responseData.passwordRequired === true) {
            return new Response(JSON.stringify({ message: "Please provide a password" }), { status: 409, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error:any) {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            // Specific message for timeout errors
            return new Response(JSON.stringify({ message: "Request timeout" }), { status: 408, headers: { 'Content-Type': 'application/json' } });
        } 
        
        if (error.message && error.message.startsWith("connect ENETUNREACH")) {
            return new Response(JSON.stringify({ message: "Cannot connect" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // Fallback error response
        return new Response(JSON.stringify({ message: "socket hangs up" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
}
