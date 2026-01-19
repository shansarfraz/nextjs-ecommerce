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
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  LocalShipping as ShippingIcon,
  Cancel as CancelIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Mock orders data
const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', items: 3, total: 299.00, status: 'completed', paymentStatus: 'paid', date: '2026-01-19T10:30:00', shippingAddress: '123 Main St, New York, NY 10001' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', items: 1, total: 1299.00, status: 'processing', paymentStatus: 'paid', date: '2026-01-19T09:15:00', shippingAddress: '456 Oak Ave, Los Angeles, CA 90001' },
  { id: 'ORD-003', customer: 'Bob Wilson', email: 'bob@example.com', items: 2, total: 89.00, status: 'pending', paymentStatus: 'pending', date: '2026-01-19T08:45:00', shippingAddress: '789 Pine Rd, Chicago, IL 60601' },
  { id: 'ORD-004', customer: 'Alice Brown', email: 'alice@example.com', items: 5, total: 549.00, status: 'shipped', paymentStatus: 'paid', date: '2026-01-18T16:20:00', shippingAddress: '321 Elm St, Houston, TX 77001' },
  { id: 'ORD-005', customer: 'Charlie Davis', email: 'charlie@example.com', items: 1, total: 199.00, status: 'cancelled', paymentStatus: 'refunded', date: '2026-01-18T14:10:00', shippingAddress: '654 Maple Dr, Phoenix, AZ 85001' },
  { id: 'ORD-006', customer: 'Diana Evans', email: 'diana@example.com', items: 4, total: 756.00, status: 'delivered', paymentStatus: 'paid', date: '2026-01-17T11:00:00', shippingAddress: '987 Cedar Ln, Philadelphia, PA 19101' },
  { id: 'ORD-007', customer: 'Frank Garcia', email: 'frank@example.com', items: 2, total: 328.00, status: 'processing', paymentStatus: 'paid', date: '2026-01-17T09:30:00', shippingAddress: '147 Birch Way, San Antonio, TX 78201' },
  { id: 'ORD-008', customer: 'Grace Harris', email: 'grace@example.com', items: 3, total: 445.00, status: 'shipped', paymentStatus: 'paid', date: '2026-01-16T15:45:00', shippingAddress: '258 Walnut Ct, San Diego, CA 92101' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
    case 'delivered': return 'success';
    case 'processing':
    case 'shipped': return 'info';
    case 'pending': return 'warning';
    case 'cancelled': return 'error';
    default: return 'default';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'success';
    case 'pending': return 'warning';
    case 'refunded': return 'error';
    default: return 'default';
  }
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, order: typeof mockOrders[0]) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Order ID',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500} color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>
            {params.row.customer.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.row.customer}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'items',
      headerName: 'Items',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {formatPrice(params.value)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getStatusColor(params.value) as any}
        />
      ),
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color={getPaymentStatusColor(params.value) as any}
        />
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 170,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {formatDate(params.value)}
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

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track customer orders
        </Typography>
      </Box>

      <Card>
        <CardContent>
          {/* Tabs for status filtering */}
          <Tabs
            value={statusFilter}
            onChange={(_, value) => setStatusFilter(value)}
            sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label={`All (${orderCounts.all})`} value="all" />
            <Tab label={`Pending (${orderCounts.pending})`} value="pending" />
            <Tab label={`Processing (${orderCounts.processing})`} value="processing" />
            <Tab label={`Shipped (${orderCounts.shipped})`} value="shipped" />
            <Tab label={`Delivered (${orderCounts.delivered})`} value="delivered" />
          </Tabs>

          {/* Search */}
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search orders..."
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

          {/* Data Grid */}
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: { sortModel: [{ field: 'date', sort: 'desc' }] },
            }}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid',
                borderColor: 'divider',
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

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShippingIcon fontSize="small" />
          </ListItemIcon>
          Update Status
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <CancelIcon fontSize="small" color="error" />
          </ListItemIcon>
          Cancel Order
        </MenuItem>
      </Menu>
    </Box>
  );
}
