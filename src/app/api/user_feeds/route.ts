import { NextResponse } from 'next/server';
import { auth } from '../auth/auth';
import { AppDataSource } from '@/app/lib/typeorm';
import { UserFeed } from '@/entities/UserFeed';
import { parseRssList } from '../lib/parseRss';
import { Channel } from '@/entities/Channel';

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

export const GET = async (req: Request) => {
  const session = await auth();

  if (!session) return NextResponse.json({ status: 403 });

  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();

  const userFeedRepository = dataSource.getRepository(UserFeed);
  const channelRepository = dataSource.getRepository(Channel);

  const channelsResponse = await channelRepository.find({
    where: { user_id: session.userId },
    select: ['id', 'title', 'image_url'],
  });

  const userFeeds = await userFeedRepository.find({
    where: { user_id: session.userId },
    select: ['id', 'url'],
  });

  const channels = channelsResponse.map((channel) => ({
    ...channel,
    userCreated: true,
  }));
  const rssFeeds = userFeeds.map(({ id, url }) => ({ id, url }));

  const parsedRssFeeds = await parseRssList(rssFeeds);

  return NextResponse.json([...parsedRssFeeds, ...channels]);
};
