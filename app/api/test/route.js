import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = await axios.get("http://159.223.137.5/test");
        return new NextResponse("Successfully pinged", { status: 200 });
    } catch (error) {
        return new NextResponse("Failed: " + error, { status: 500 });
    }
}
