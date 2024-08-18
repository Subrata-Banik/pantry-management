// components/ItemCard.js
import React from 'react';
import { Card, CardContent, Typography, IconButton, CardActions, Box, Chip, Avatar } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ItemCard = ({ id, itemName, quantity, expirationDate, onEdit, onDelete }) => {
  const formattedDate = new Date(expirationDate).toLocaleDateString();

  return (
    <Card sx={{
      backgroundColor: 'background.paper',
      boxShadow: 6,  // Increased shadow for a more materialistic feel
      borderRadius: 4,  // More rounded corners
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: 12,  // Enhance shadow on hover
      },
      padding: 2,
      position: 'relative',  // Allows positioning of elements
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {itemName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            {itemName}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Quantity: <Chip label={quantity} color="primary" size="small" />
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Expiration Date: <Chip label={formattedDate} color="secondary" size="small" />
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="edit" onClick={onEdit} color="primary">
          <Edit />
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete} color="error">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
