import ThemeRegistry from '@/components/admin/ThemeRegistry';
import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your ecommerce store',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <AdminLayout>{children}</AdminLayout>
    </ThemeRegistry>
  );
}
