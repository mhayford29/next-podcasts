import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const parseRss = async ({ id, url }: { id: number; url: string }) => {
  try {
    // Fetch the RSS feed
    const { data } = await axios.get(url);

    // Parse the XML to JSON
    const feed = await parseStringPromise(data);

    // Extract title and image from the feed
    const channel = feed.rss.channel[0];
    const title = channel.title[0];
    const image = channel.image ? channel.image[0].url[0] : null;

    // Return the result as JSON
    return { id, url, title, image };
  } catch (error) {
    console.error(`Error parsing RSS feed at ${url}:`, error);
    throw error;
  }
};

export const parseRssList = async (feeds: { id: number; url: string }[]) => {
  // Map over the list of URLs and parse each RSS feed
  const results = await Promise.all(feeds.map(parseRss));
  return results;
};
