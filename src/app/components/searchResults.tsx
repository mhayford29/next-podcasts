import { FC } from 'react';
import { SearchData } from './search';
import { Box } from '@mui/material';
import { ResultItem } from './resultItem';

interface Props {
  data: SearchData;
}

export const SearchResults: FC<Props> = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.results.map((result) => {
        return (
          <Box key={result.collectionId}>
            <ResultItem
              artistName={result.artistName}
              artworkUrl600={result.artworkUrl600}
              collectionName={result.collectionName}
              feedUrl={result.feedUrl}
              trackCount={result.trackCount}
            />
          </Box>
        );
      })}
    </Box>
  );
};
