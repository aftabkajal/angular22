import { Routes } from '@angular/router';
import { NewEnquery } from './new-enquery/new-enquery';
import { StatusMaster } from './status-master/status-master';
import { CategoryMaster } from './category-master/category-master';
import { EnqueryList } from './enquery-list/enquery-list';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: NewEnquery
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'status',
        component: StatusMaster
    },
    {
        path: 'Category',
        component: CategoryMaster
    },
    {
        path: 'enquery-list',
        component: EnqueryList
    }
];
