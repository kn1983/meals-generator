import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
 
  return NextResponse.json({ apa: process.env.MONGODB_URI })
}