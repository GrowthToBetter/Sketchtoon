// pages/api/getFiles.js
import {  findSchools } from '@/utils/user.query';
import { NextResponse } from 'next/server';

export async function GET() {

  try {
      const dataFile = await findSchools({});

    if (!dataFile) {
      return new NextResponse(JSON.stringify({ error: "No files found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify({ dataFile }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}