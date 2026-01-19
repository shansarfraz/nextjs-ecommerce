'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', orders: 12, totalSpent: 2499.00, status: 'active', joinDate: '2025-06-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'customer', orders: 8, totalSpent: 1875.00, status: 'active', joinDate: '2025-07-22' },
  { id: '3', name: 'Admin User', email: 'admin@ecommerce.com', role: 'admin', orders: 0, totalSpent: 0, status: 'active', joinDate: '2025-01-01' },
  { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'customer', orders: 3, totalSpent: 450.00, status: 'active', joinDate: '2025-09-10' },
  { id: '5', name: 'Premium Vendor', email: 'vendor@ecommerce.com', role: 'vendor', orders: 0, totalSpent: 0, status: 'active', joinDate: '2025-01-01' },
  { id: '6', name: 'Alice Brown', email: 'alice@example.com', role: 'customer', orders: 15, totalSpent: 3200.00, status: 'active', joinDate: '2025-05-03' },
  { id: '7', name: 'Charlie Davis', email: 'charlie@example.com', role: 'customer', orders: 1, totalSpent: 199.00, status: 'inactive', joinDate: '2025-11-20' },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'error';
    case 'vendor': return 'warning';
    case 'customer': return 'default';
    default: return 'default';
  }
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: typeof mockUsers[0]) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
            {params.row.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getRoleColor(params.value) as any}
        />
      ),
    },
    {
      field: 'orders',
      headerName: 'Orders',
      width: 90,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'totalSpent',
      headerName: 'Total Spent',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {formatPrice(params.value)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'active' ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'joinDate',
      headerName: 'Joined',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {new Date(params.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, params.row)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage customers and staff accounts
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAddIcon />}>
          Add User
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search users..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
          </Box>

          <DataGrid
            rows={filteredUsers}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            autoHeight
            rowHeight={70}
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid',
                borderColor: 'divider',
                py: 1,
              },
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'background.default',
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
            }}
          />
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit User
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <MailIcon fontSize="small" />
          </ListItemIcon>
          Send Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <BlockIcon fontSize="small" color="error" />
          </ListItemIcon>
          Suspend User
        </MenuItem>
      </Menu>
    </Box>
  );
}
