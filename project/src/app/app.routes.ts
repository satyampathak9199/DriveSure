import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Bookings } from './features/bookings/bookings';
import { BookingForm } from './features/booking-form/booking-form';
import { Bookingedit } from './features/bookingedit/bookingedit';
import { CarBrandService } from './services/car-brand.service';
import { CarBrand } from './features/car-brand/car-brand';
import { CarType } from './features/car-type/car-type';
export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'booking',
    component: Bookings
  },
  {
    path: 'booking/new',
    component: BookingForm
  },
 {
    path: 'booking/:id/edit',
    component: Bookingedit
  },
  {path:'carBrand',
    component:CarBrand },
{
  path:'CarType',
  component:CarType
}

];
