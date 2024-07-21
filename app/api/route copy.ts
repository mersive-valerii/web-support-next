import { NextRequest, NextResponse } from 'next/server';
import { io } from 'socket.io-client';

export async function POST(req: NextRequest) {
    try {
        const { podIp, podPassword, LICENSE_pkg, fileName } = await req.json();

        const socket = io('http://<CLOUD_SERVER_IP>:8080');

        return new Promise((resolve, reject) => {
            socket.emit('uploadLicense', { podIp, podPassword, LICENSE_pkg, fileName });

            socket.on('response', (response) => {
                if (response.status === 200) {
                    resolve(new NextResponse(JSON.stringify(response.data), { status: 200, headers: { 'Content-Type': 'application/json' } }));
                } else {
                    resolve(new NextResponse(JSON.stringify({ message: response.message }), { status: response.status, headers: { 'Content-Type': 'application/json' } }));
                }
                socket.close();
            });

            socket.on('connect_error', (error) => {
                reject(new NextResponse(JSON.stringify({ message: 'Socket.io connection error', error }), { status: 500, headers: { 'Content-Type': 'application/json' } }));
                socket.close();
            });
        });
    } catch (error: any) {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            return new NextResponse(JSON.stringify({ message: "Request timeout" }), { status: 408, headers: { 'Content-Type': 'application/json' } });
        }

        if (error.message && error.message.startsWith("connect ENETUNREACH")) {
            return new NextResponse(JSON.stringify({ message: "Cannot connect" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        return new NextResponse(JSON.stringify({ message: "socket hangs up" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
