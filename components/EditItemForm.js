import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EditItemForm = ({ itemId, open, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      const itemRef = doc(db, 'pantryitems', itemId);
      const itemDoc = await getDoc(itemRef);
      if (itemDoc.exists()) {
        const data = itemDoc.data();
        setItemName(data.itemName);
        setQuantity(data.quantity);
        setExpirationDate(data.expirationDate);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  const handleUpdate = async () => {
    const itemRef = doc(db, 'pantryitems', itemId);
    await updateDoc(itemRef, {
      itemName,
      quantity,
      expirationDate,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Expiration Date"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemForm;
