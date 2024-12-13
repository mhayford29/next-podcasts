import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { ChangeEvent, FC, FormEvent, MouseEvent } from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const CreateModal: FC<Props> = ({ open, handleClose }) => {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (form) {
      const name = (form.elements.namedItem('name') as HTMLInputElement).value;
      const description = (
        form.elements.namedItem('description') as HTMLInputElement
      ).value;
      try {
        await axios.post('/api/channels', { name, description });
      } catch {
        console.log('uh oh');
      }
      handleClose();
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
        <DialogTitle>Create Feed</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Feed Name" sx={{ m: 2 }} />
          <TextField
            multiline
            name="description"
            label="Description"
            sx={{ m: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
