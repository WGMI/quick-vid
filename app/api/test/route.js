import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = await axios.get("http://209.38.210.50/test");
        return new NextResponse("Successfully pinged", { status: 200 });
    } catch (error) {
        return new NextResponse("Failed: " + error, { status: 500 });
    }
}
