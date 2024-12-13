import { FC } from 'react';
import { FeedItem as FeedItemType } from '../page';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  ListItem,
  Typography,
} from '@mui/material';

interface Props {
  feedItem: FeedItemType;
  handleFeedSelect: (id: number, userCreated: boolean | undefined) => void;
}

export const FeedItem: FC<Props> = ({ feedItem, handleFeedSelect }) => (
  <ListItem>
    <Button onClick={() => handleFeedSelect(feedItem.id, feedItem.userCreated)}>
      <Card sx={{ maxWidth: 150, m: 1 }} variant="outlined">
        <CardMedia sx={{ height: 150, width: 150 }} image={feedItem.image} />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {feedItem.title}
          </Typography>
        </CardContent>
      </Card>
    </Button>
  </ListItem>
);
