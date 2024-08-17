// components/ItemCard.js
import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const ItemCard = ({ id, itemName, quantity, expirationDate }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{itemName}</Typography>
        <Typography>Quantity: {quantity}</Typography>
        <Typography>Expires on: {expirationDate}</Typography>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
