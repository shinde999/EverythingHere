import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, 
  ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import TodoModal from '../UI/Modal';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      toast.warning('Please enter a todo item');
      return;
    }
    
    const todo = {
        id: Date.now(),
        text: newTodo
    };

    setTodos([...todos, todo]);
    setNewTodo('');
    toast.success('Todo added successfully!');
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(true);
  };

  const handleEditSave = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    setIsModalOpen(false);
    setEditTodo(null);
    toast.success('Todo updated successfully!');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.error('Todo deleted successfully!');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Todo List
      </Typography>

      <Box component="form" onSubmit={handleAddTodo} sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            size="small"
          />
          <Button 
            type="submit" 
            variant="contained"
            sx={{ minWidth: 100 }}
          >
            Add
          </Button>
        </Box>
      </Box>

      <List>
        {todos.map((todo) => (
          <ListItem 
            key={todo.id}
            sx={{ 
              bgcolor: 'background.paper',
              mb: 1,
              borderRadius: 1,
              boxShadow: 1
            }}
          >
            <ListItemText
              primary={todo.text}
            />
            <secondaryAction>
              <IconButton 
                edge="end" 
                aria-label="edit"
                onClick={() => handleEditClick(todo)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                aria-label="delete"
                onClick={() => handleDelete(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </secondaryAction>
          </ListItem>
        ))}
      </List>

      {todos.length === 0 && (
        <Typography 
          color="text.secondary" 
          sx={{ textAlign: 'center', mt: 4 }}
        >
          No todos yet. Add your first todo!
        </Typography>
      )}

      <TodoModal
        open={isModalOpen}
        todo={editTodo}
        onClose={() => {
          setIsModalOpen(false);
          setEditTodo(null);
        }}
        onSave={handleEditSave}
      />
    </Box>
  );
};

export default TodoPage;