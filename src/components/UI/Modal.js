import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField 
} from '@mui/material';

const TodoModal = ({ open, todo, onClose, onSave }) => {
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    if (todo) {
      setEditedText(todo.text);
    }
  }, [todo]);

  const handleSave = () => {
    if (editedText.trim()) {
      onSave(todo.id, editedText.trim());
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          placeholder="Edit your todo"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;