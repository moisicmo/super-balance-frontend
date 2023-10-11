import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { AuthPage } from '@/views/auth/AuthPage';
import { DashboardView } from '@/views/pages/dashboard';
import { WarehousesView } from '@/views/pages/warehouses';
import { PermissionsView } from '@/views/pages/permisions';
import { TypeUsersView } from '@/views/pages/typeUsers';
import { RolesView } from '@/views/pages/roles';
import { UsersView } from '@/views/pages/users';
import { CustomersView } from '@/views/pages/customers';
import { ProductsView } from '@/views/pages/products';
import { MovementsView } from '@/views/pages/movements';
import { SalesView } from '@/views/pages/sales';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        (status === 'not-authenticated') ?
            <AuthPage />
            :
            <Layout>
                <Routes>
                    <Route path='/dashboardView' element={<DashboardView />} />
                    <Route path='/warehousesView' element={<WarehousesView />} />
                    <Route path='/permissionsView' element={<PermissionsView />} />
                    <Route path='/typeUsersView' element={<TypeUsersView />} />
                    <Route path='/rolesView' element={<RolesView />} />
                    <Route path='/usersView' element={<UsersView />} />
                    <Route path='/customersView' element={<CustomersView />} />
                    <Route path='/productsView' element={<ProductsView />} />
                    <Route path='/movementsView' element={<MovementsView />} />
                    <Route path='/salesView' element={<SalesView />} />
                    {/*  */}
                    <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
                </Routes>
            </Layout>
    )
}