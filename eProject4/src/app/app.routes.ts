import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './guard/route-guard.service';
import { FullComponent } from './layouts/full/full.component';
import { ManageCategoryComponent } from './material-component/manage-category/manage-category.component';
import { ManageProductComponent } from './material-component/manage-product/manage-product.component';
import { ManageOrderComponent } from './material-component/manage-order/manage-order.component';
import { ViewBillComponent } from './material-component/view-bill/view-bill.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';

export const routes: Routes = [
  { path: "home", redirectTo: "/", pathMatch: "full" },
  { path: "", component: HomeComponent },
  // { path: "**", component: HomeComponent },

  { path: '', component: HomeComponent },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
        // canActivate: [RouteGuardService],
        // data: {
        //   expectedRole: ['admin', 'user'],
        // },
      },
      {
        path: 'category',
        component: ManageCategoryComponent,
        // canActivate: [RouteGuardService],
        // data: {
        //   expectedRole: ['admin'],
        // },
      },
      {
        path: 'product',
        component: ManageProductComponent,
        // canActivate: [RouteGuardService],
        // data: {
        //   expectedRole: ['admin'],
        // },
      },
      {
        path: 'order',
        component: ManageOrderComponent,
        // canActivate: [RouteGuardService],
        // data: {
        //   expectedRole: ['admin', 'user'],
        // },
      },
      {
        path: 'bill',
        component: ViewBillComponent,
        // canActivate: [RouteGuardService],
        // data: {
        //   expectedRole: ['admin', 'user'],
        // },
      },
      {
        path: 'user',
        component: ManageUserComponent,
        // canActivate: [RouteGuardService],
        // data: {
        //   expectedRole: ['admin'],
        // },
      },
    ],
  },
  { path: '**', component: HomeComponent },
];
