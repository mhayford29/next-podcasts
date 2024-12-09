import { NextResponse } from 'next/server';
import { auth } from '../auth/auth';
import { AppDataSource } from '@/app/lib/typeorm';
import { UserFeed } from '@/entities/UserFeed';

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session) return NextResponse.json({ status: 403 });

  const body = await req.json();

  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();

  const userFeed = new UserFeed();
  userFeed.user_id = session.userId;
  userFeed.url = body.url;

  await dataSource.getRepository(UserFeed).save(userFeed);

  return NextResponse.json({
    message: 'Feed configuration saved successfully',
  });
};
