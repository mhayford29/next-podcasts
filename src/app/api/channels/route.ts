import { NextResponse } from 'next/server';
import { auth } from '../auth/auth';
import { AppDataSource } from '@/app/lib/typeorm';
import { Channel } from '@/entities/Channel';

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session) return NextResponse.json({ status: 403 });

  const body = await req.json();

  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();

  const channel = new Channel();
  channel.user_id = session.userId;
  channel.title = body.name;
  channel.description = body.description;

  await dataSource.getRepository(Channel).save(channel);

  return NextResponse.json({
    message: 'Channel saved successfully',
  });
};
