import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../auth/auth';
import { AppDataSource } from '@/app/lib/typeorm';
import { UserFeed } from '@/entities';
import { Channel } from '@/entities/Channel';
import { getChannelJSON, getFeedJSON } from './userFeedService';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const session = await auth();

  if (!session) return NextResponse.json({ status: 403 });

  const searchParams = req.nextUrl.searchParams;
  const userCreatedString = searchParams.get('userCreated');
  const userCreated = userCreatedString === 'true' || false;

  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();

  const responseJSON = userCreated
    ? await getChannelJSON(dataSource, Number(params.id))
    : await getFeedJSON(dataSource, Number(params.id));

  return NextResponse.json(responseJSON);
};
