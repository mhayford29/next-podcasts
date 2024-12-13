'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { FC, useState } from 'react';

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

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedFeed: FeedItem;
}

export const AddModal: FC<Props> = ({ open, handleClose, selectedFeed }) => {
  const queryClient = useQueryClient();
  const response = queryClient.getQueryData<QResponse>(['user_feeds']);
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);

  if (!response) return null;

  const { data: feedList } = response;

  const createdFeeds = feedList.filter(({ userCreated }) => userCreated);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedFeedId) {
      alert('Please select a feed item.');
      return;
    }

    const url = feedList.find(({ id }) => id === selectedFeedId)?.url;

    try {
      await axios.post(`/api/channels/${selectedFeedId}/channel_feeds`, {
        url: selectedFeed.url,
      });
      handleClose();
    } catch (error) {
      console.error('Error adding feed item:', error);
      alert('Failed to add feed item.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form>
        <DialogTitle>Add To Feed</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={selectedFeedId}
            onChange={(e) => setSelectedFeedId(Number(e.target.value))}
          >
            {createdFeeds.map((feedItem) => (
              <FormControlLabel
                key={feedItem.id}
                value={feedItem.id}
                control={<Radio />}
                label={feedItem.title}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} disabled={!selectedFeedId}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
