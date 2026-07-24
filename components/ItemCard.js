'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ItemCard = ({
  id,
  itemName,
  quantity,
  expirationDate,
  onEdit,
  onDelete,
}) => {
  const formattedDate = expirationDate
    ? new Date(expirationDate).toLocaleDateString('en-IN')
    : 'N/A';

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: 6,
        borderRadius: 4,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 12,
        },
        p: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {itemName?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 'bold', flexGrow: 1 }}
          >
            {itemName}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Quantity:
          </Typography>

          <Chip
            label={quantity}
            color="primary"
            size="small"
            variant="filled"
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Expiration:
          </Typography>

          <Chip
            label={formattedDate}
            color="secondary"
            size="small"
            variant="filled"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => onEdit(id)}
        >
          <Edit />
        </IconButton>

        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => onDelete(id)}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;