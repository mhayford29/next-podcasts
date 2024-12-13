'use client';

import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FeedList } from './components/feedList';
import { FeedDetail } from './components/feedDetail';
import { useEffect, useState } from 'react';

export interface FeedItem {
  userCreated: boolean;
  title: string;
  image: string;
  id: number;
  url: string;
}

export type FeedList = FeedItem[];

export interface QResponse {
  data: FeedList;
}

const Page = () => {
  const { data } = useQuery<QResponse>({
    queryKey: ['user_feeds'],
    queryFn: () => axios('/api/user_feeds'),
  });

  const [selectedFeed, setSelectedFeed] = useState<FeedItem>();

  const handleFeedSelect = (id: number, userCreated: boolean | undefined) => {
    if (!data) return;
    const newFeed = data.data.find(
      (episode) => episode.id === id && userCreated === episode.userCreated,
    );
    setSelectedFeed(newFeed);
  };

  useEffect(() => {
    if (!data) return;

    setSelectedFeed(data.data[0]);
  }, [data]);

  if (!data || !selectedFeed) return <CircularProgress />;

  return (
    <Box sx={{ display: 'flex', mt: 2 }}>
      <FeedList feedList={data.data} handleFeedSelect={handleFeedSelect} />
      <FeedDetail feed={selectedFeed} />
    </Box>
  );
};

export default Page;
