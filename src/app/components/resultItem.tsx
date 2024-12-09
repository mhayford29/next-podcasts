import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { FC } from 'react';

const onSubmit = async (url: string) => {
  await axios.post('/api/user_feeds', { url });
};

interface Props {
  artistName: string;
  artworkUrl600: string;
  collectionName: string;
  feedUrl: string;
  trackCount: number;
}

export const ResultItem: FC<Props> = ({
  artistName,
  artworkUrl600,
  collectionName,
  feedUrl,
  trackCount,
}) => {
  return (
    <Card sx={{ maxWidth: 200, m: 1 }} variant="outlined">
      <CardMedia sx={{ height: 200, width: 200 }} image={artworkUrl600} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {collectionName}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {artistName}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Episodes: {trackCount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onSubmit(feedUrl)}>
          Follow
        </Button>
      </CardActions>
    </Card>
  );
};
