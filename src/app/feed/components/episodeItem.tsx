import { FC } from 'react';
import { Episode } from './feedDetail';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import DOMPurify from 'dompurify';

interface Props {
  episode: Episode;
}

export const EpisodeItem: FC<Props> = ({ episode }) => {
  const cleanDescription = DOMPurify.sanitize(episode.description);

  return (
    <Card variant="outlined" sx={{ my: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <CardMedia sx={{ height: 200, minWidth: 200 }} image={episode.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {episode.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {episode.pubDate}
          </Typography>
          <CardMedia>
            <audio controls>
              <source src={episode.enclosure.url} type="audio/mpeg" />
            </audio>
          </CardMedia>
        </CardContent>
      </Box>
      <CardContent>
        <Box dangerouslySetInnerHTML={{ __html: cleanDescription }} />
      </CardContent>
    </Card>
  );
};
