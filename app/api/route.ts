const axios = require('axios');
const https = require('https');

const FormData = require('form-data');


export async function POST(req: Request) {
    const { podIp, podPassword, LICENSE_pkg } = await req.json(); // Assuming LICENSE_pkg is the file content

    if (!podIp) {
      return new Response("No IP", { status: 400 });
    }
  
    const url = `https://${podIp}/Config/service/uploadLicense`;
  
    const formData = new FormData();
    formData.append('LICENSE_pkg', LICENSE_pkg, 'filename.txt'); // Assuming LICENSE_pkg is a string. Adjust 'filename.txt' as needed.
  
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      auth: {
        username: 'admin',
        password: podPassword,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
  
    const data = response.data;
    console.log(data);
  
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }


