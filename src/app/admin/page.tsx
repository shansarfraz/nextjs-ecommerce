'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Skeleton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ShoppingCart as OrdersIcon,
  AttachMoney as RevenueIcon,
  People as UsersIcon,
  Inventory as ProductsIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  const isPositive = change >= 0;
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
            }}
          >
            {icon}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: isPositive ? 'success.main' : 'error.main',
            }}
          >
            {isPositive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
            <Typography variant="body2" fontWeight={500}>
              {Math.abs(change)}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', amount: '$299.00', status: 'completed', date: '2 min ago' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', amount: '$1,299.00', status: 'processing', date: '15 min ago' },
  { id: 'ORD-003', customer: 'Bob Wilson', email: 'bob@example.com', amount: '$89.00', status: 'pending', date: '1 hour ago' },
  { id: 'ORD-004', customer: 'Alice Brown', email: 'alice@example.com', amount: '$549.00', status: 'completed', date: '2 hours ago' },
  { id: 'ORD-005', customer: 'Charlie Davis', email: 'charlie@example.com', amount: '$199.00', status: 'cancelled', date: '3 hours ago' },
];

const topProducts = [
  { name: 'MacBook Pro 14"', sales: 124, revenue: '$247,876' },
  { name: 'iPhone 15 Pro', sales: 256, revenue: '$306,944' },
  { name: 'AirPods Pro 2', sales: 189, revenue: '$47,061' },
  { name: 'iPad Air', sales: 98, revenue: '$58,702' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'success';
    case 'processing': return 'info';
    case 'pending': return 'warning';
    case 'cancelled': return 'error';
    default: return 'default';
  }
};

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const categoryData = [
  { id: 0, value: 35, label: 'Electronics' },
  { id: 1, value: 25, label: 'Clothing' },
  { id: 2, value: 20, label: 'Home' },
  { id: 3, value: 12, label: 'Sports' },
  { id: 4, value: 8, label: 'Other' },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
              <Skeleton variant="rounded" height={160} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Skeleton variant="rounded" height={400} />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Skeleton variant="rounded" height={400} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here&apos;s what&apos;s happening with your store.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value="$48,294"
            change={12.5}
            icon={<RevenueIcon />}
            color="#007AFF"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Orders"
            value="1,248"
            change={8.2}
            icon={<OrdersIcon />}
            color="#34C759"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Customers"
            value="3,847"
            change={-2.4}
            icon={<UsersIcon />}
            color="#FF9500"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Products"
            value="25"
            change={4.1}
            icon={<ProductsIcon />}
            color="#AF52DE"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Monthly sales performance
              </Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: salesData.map(d => d.month) }]}
                series={[{ data: salesData.map(d => d.sales), color: '#007AFF' }]}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales by Category
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Distribution of sales
              </Typography>
              <PieChart
                series={[
                  {
                    data: categoryData,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    innerRadius: 50,
                    paddingAngle: 2,
                    cornerRadius: 4,
                  },
                ]}
                height={250}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders & Top Products */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Orders</Typography>
                <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  View all
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                              {order.customer.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {order.customer}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {order.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {order.amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            size="small"
                            color={getStatusColor(order.status) as any}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {order.date}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Products
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Best selling this month
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {topProducts.map((product, index) => (
                  <Box
                    key={product.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: index === 0 ? 'primary.main' : 'grey.300',
                          color: index === 0 ? 'white' : 'text.primary',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.sales} sales
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {product.revenue}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
