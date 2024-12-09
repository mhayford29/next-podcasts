import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface ResponseData {
  data?: any;
  exception?: any;
}

export const GET = async (
  req: NextRequest,
  res: NextResponse<ResponseData>,
) => {
  const params = req.nextUrl.searchParams;
  try {
    const { data } = await axios('https://itunes.apple.com/search', {
      params,
    });

    return NextResponse.json({ data });
  } catch (exception) {
    throw exception;
  }
};
