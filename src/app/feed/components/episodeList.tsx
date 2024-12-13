import { FC } from 'react';
import { Episode } from './feedDetail';
import { List } from '@mui/material';
import { EpisodeItem } from './episodeItem';

interface Props {
  episodeList: Episode[];
}

export const EpisodeList: FC<Props> = ({ episodeList }) => {
  return (
    <List>
      {episodeList.map((episode) => {
        return <EpisodeItem episode={episode} />;
      })}
    </List>
  );
};
