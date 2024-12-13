import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { FeedItem } from '../page';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { EpisodeList } from './episodeList';
import { AddModal } from './addModal';

interface Enclosure {
  url: string;
  type: string;
  length: string;
}

export interface Episode {
  title: string;
  description: string;
  pubDate: string;
  enclosure: Enclosure;
  image: string;
}

interface QResponse {
  data: Episode[];
}

interface Props {
  feed: FeedItem;
}

export const FeedDetail: FC<Props> = ({ feed }) => {
  const { data } = useQuery<QResponse>({
    queryKey: ['user_feeds', feed.id, feed.userCreated ?? false],
    queryFn: () =>
      axios(
        `/api/user_feeds/${feed.id}?userCreated=${feed.userCreated ?? false}`,
      ),
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!data) return <CircularProgress />;

  return (
    <Box sx={{ mx: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6">{feed.title}</Typography>
        <Button onClick={handleOpen} sx={{ ml: 2 }}>
          Add To Feed
        </Button>
      </Box>
      <Box
        sx={{
          overflow: 'scroll',
          height: '100vh',
          width: '100%',
        }}
      >
        <EpisodeList episodeList={data.data} />
      </Box>
      <AddModal open={open} handleClose={handleClose} selectedFeed={feed} />
    </Box>
  );
};
