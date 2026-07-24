'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import AddItemForm from '../components/AddItemForm';
import ItemCard from '../components/ItemCard';
import EditItemForm from '../components/EditItemForm';

import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';

import Grid from '@mui/material/Grid';

import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const router = useRouter();

  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/signin');
        return;
      }

      const q = query(
        collection(db, 'pantryitems'),
        where('userId', '==', user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

      return () => unsubscribeSnapshot();
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

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/signin');
    } catch (error) {
      console.error(error);
    }
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}
    >
        <Typography variant="h4" fontWeight="bold">
          My Pantry
        </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
          <IconButton
            color="primary"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          <Button
            variant="contained"
            color="error"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
      </Box>

      <AddItemForm userId={auth.currentUser?.uid} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {items.map((item) => (
          <Grid
            key={item.id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
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