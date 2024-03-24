const axios = require('axios');
const https = require('https');
import fs from 'fs';


type ResponseData = {
  message: string
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const agent = new https.Agent({  
    rejectUnauthorized: false
  });

  export async function POST(req: Request) {
    const {podIp, podPassword, LICENSE_pkg} = await req.json();

    if (!podIp) {
      return new Response("No IP",{
        status: 400
      })
    }
    // const url = `https://${podIp}/Config/service/uploadLicense`;
    const url = `https://192.168.8.119/Config/service/uploadLicense`;

    // Create a dictionary with authentication details
const auth = {
  username: 'admin',
  password: '12345'
};

const dataToPush = {
  "LICENSE_pkg": LICENSE_pkg,
  auth: auth
};

// const formData = new FormData();
// formData.append('LICENSE_pkg', LICENSE_pkg);
// formData.append('username', auth.username)
// formData.append('password', auth.password)

// Fetch example
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToPush), 
  // body: formData
  
});

const data = await response.json();

console.log(data);

// Axious attempt
// const response = await axios.post(url, {
//   LICENSE_pkg: LICENSE_pkg
// }, {
//   auth: auth,
//   httpsAgent: agent
// });

// console.log(response.data);


    return new Response(data.message);
  }


