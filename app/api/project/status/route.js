import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const url = req.nextUrl.searchParams.get('url'); 
        const res = await axios.get(process.env.QUICKVID_STATUS_URL + url)
        return NextResponse.json({ url: res.data }, { status: 200 }); 
    } catch (e) {
        console.error('Error handling request:', e);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); // Return a 500 status code in case of error
    }
}
