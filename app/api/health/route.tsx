import { NextResponse } from "next/server"

export async function GET() {
    const jsonHeaders = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
    }

    try {
        return NextResponse.json(
            {
                status: "healthy",
                timestamp: new Date().toISOString(),
                version: "1.0.0",
                environment: process.env.NODE_ENV || "development",
            },
            { status: 200, headers: jsonHeaders },
        )
    } catch (error) {
        return NextResponse.json(
            {
                status: "error",
                timestamp: new Date().toISOString(),
                error: "Health check failed",
            },
            { status: 500, headers: jsonHeaders },
        )
    }
}

export async function HEAD() {
    try {
        return new NextResponse(null, {
            status: 200,
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        })
    } catch (error) {
        return new NextResponse(null, {
            status: 500,
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        })
    }
}
