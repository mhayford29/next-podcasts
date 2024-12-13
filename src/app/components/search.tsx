import { Box, Input, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { FC, useState } from 'react';
import { SearchResults } from './searchResults';

interface Result {
  artistName: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionHdPrice: number;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  currency: string;
  feedUrl: string;
  genreIds: string[];
  genres: string[];
  kind: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}

export interface SearchData {
  resultCount: number;
  results: Result[];
}

interface QResponse {
  data: SearchData;
}

const search = (queryString: string | undefined): any => {
  if (!queryString) return;

  const params = {
    term: queryString,
    entity: 'podcast',
  };

  return axios('/api/podcasts/search', {
    params,
  });
};

export const Search: FC = () => {
  const [queryString, setQueryString] = useState<string | undefined>(undefined);

  const debouncedQueryString = useDebounce(queryString, 500);

  const { data } = useQuery<QResponse>({
    queryKey: ['podcasts', debouncedQueryString],
    queryFn: () => search(debouncedQueryString),
    enabled: Boolean(debouncedQueryString),
  });

  return (
    <Box>
      <form>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            name="search"
            label="Search For A Podcast"
            onChange={(e) => setQueryString(e.target.value)}
            sx={{ m: 2 }}
          />
        </Box>
      </form>
      {data ? <SearchResults data={data.data} /> : null}
    </Box>
  );
};
