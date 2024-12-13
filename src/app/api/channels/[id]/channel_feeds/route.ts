import { NextResponse } from 'next/server';
import { auth } from '../../../auth/auth';
import { AppDataSource } from '@/app/lib/typeorm';
import { ChannelFeed } from '@/entities/ChannelFeed';

export const POST = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const session = await auth();

  if (!session) return NextResponse.json({ status: 403 });

  const body = await req.json();

  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();

  const channel_feed = new ChannelFeed();
  channel_feed.channel_id = Number(params.id);
  channel_feed.url = body.url;

  await dataSource.getRepository(ChannelFeed).save(channel_feed);

  return NextResponse.json({
    message: 'Channel Feed saved successfully',
  });
};
