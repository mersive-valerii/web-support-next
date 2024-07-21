// pages/api/health.js
export default function handler(res: Response) {
    return new Response(JSON.stringify({ message: "ok" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  