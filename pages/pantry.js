'use client';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Container, Typography, Button, Grid } from '@mui/material';
import AddItemForm from '../components/AddItemForm';
import ItemCard from '../components/ItemCard';
import EditItemForm from '../components/EditItemForm';
import { useRouter } from 'next/router';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(collection(db, 'pantryItems'), where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
          setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
      } else {
        router.push('/signin');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEditOpen = (itemId) => {
    setSelectedItemId(itemId);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setSelectedItemId(null);
    setIsEditOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Pantry
      </Typography>
      <AddItemForm userId={auth.currentUser?.uid} />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ItemCard 
              id={item.id}
              itemName={item.itemName}
              quantity={item.quantity}
              expirationDate={item.expirationDate}
              onEdit={() => handleEditOpen(item.id)}
            />
          </Grid>
        ))}
      </Grid>
      {selectedItemId && (
        <EditItemForm 
          itemId={selectedItemId} 
          open={isEditOpen} 
          onClose={handleEditClose} 
        />
      )}
    </Container>
  );
};

export default Pantry;
