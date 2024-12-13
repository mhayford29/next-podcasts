import { UserFeed } from '@/entities';
import { ChannelFeed } from '@/entities/ChannelFeed';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { parseStringPromise } from 'xml2js';

export const getFeedJSON = async (dataSource: DataSource, id: number) => {
  const userFeedRepository = dataSource.getRepository(UserFeed);

  const userFeed = await userFeedRepository.findOne({
    where: { id },
    select: ['url'],
  });

  if (!userFeed) return;

  return fetchFeedItems(userFeed.url);
};

export const getChannelJSON = async (dataSource: DataSource, id: number) => {
  const channelFeedRepository = dataSource.getRepository(ChannelFeed);

  // Fetch the list of URLs for the channel
  const channelFeeds = await channelFeedRepository.find({
    where: { channel_id: id },
    select: ['url'],
  });
  const urlList = channelFeeds.map(({ url }) => url);

  if (urlList.length === 0) return [];

  // Fetch and parse feeds concurrently
  const allFeedItems = await Promise.all(urlList.map(fetchFeedItems));

  // Flatten the array of feed items and sort by pubDate
  const combinedFeedItems = allFeedItems
    .flat()
    .sort((a, b) => b.pubDate - a.pubDate); // Sort descending by pubDate

  return combinedFeedItems;
};

const fetchFeedItems = async (url: string) => {
  try {
    const { data } = await axios(url);
    const feed = await parseStringPromise(data);

    const channel = feed.rss.channel[0];
    const image = channel.image ? channel.image[0].url[0] : null;

    // Extract the first 10 items
    return (channel.item || []).slice(0, 10).map((item: any) => ({
      title: item.title[0],
      description: item.description[0],
      pubDate: new Date(item.pubDate[0]), // Convert to Date object for sorting
      enclosure: item.enclosure ? item.enclosure[0]['$'] : null,
      image,
      url,
    }));
  } catch (error) {
    console.error(`Error fetching feed from ${url}:`, error);
    return [];
  }
};
