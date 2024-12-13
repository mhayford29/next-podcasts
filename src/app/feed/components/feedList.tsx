import { FC, useState } from 'react';
import { FeedList as FeedListType } from '../page';
import { FeedItem } from './feedItem';
import { Box, Button, List, Modal } from '@mui/material';
import { CreateModal } from './createModal';

interface Props {
  feedList: FeedListType;
  handleFeedSelect: (id: number, userCreated: boolean | undefined) => void;
}

export const FeedList: FC<Props> = ({ feedList, handleFeedSelect }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ maxHeight: '100vh', overflow: 'scroll', minWidth: '216px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleOpen}>
          Create Feed
        </Button>
        <CreateModal open={open} handleClose={handleClose} />
      </Box>
      <List>
        {feedList.map((feedItem) => (
          <FeedItem
            handleFeedSelect={handleFeedSelect}
            feedItem={feedItem}
            key={feedItem.title}
          />
        ))}
      </List>
    </Box>
  );
};
