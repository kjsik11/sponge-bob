import { NextResponse } from 'next/server';

export async function GET() {
  //TODO: consider about API wrapper functions for next13
  return NextResponse.json({ status: 'ok' });
}
