'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import AddItemForm from '../components/AddItemForm';
import ItemCard from '../components/ItemCard';
import EditItemForm from '../components/EditItemForm';
import { Container, Typography, Grid, Button } from '@mui/material';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(collection(db, 'pantryitems'), where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
          setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
      } else {
        router.push('/signin'); // Redirect to sign-in page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'pantryitems', itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      router.push('/signin');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

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
      <Button onClick={handleSignOut} variant="contained" color="secondary" style={{ marginBottom: '20px' }}>
        Sign Out
      </Button>
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
              onDelete={() => handleDelete(item.id)} 
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
