import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CarasoolComponent } from './carasool/carasool.component';
import { CardbodyComponent } from './cardbody/cardbody.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SearchPageComponent } from './product/search-page/search-page.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AuthGuard } from './services/auth.guard';
import { AuthGuard1 } from './services/adminauth.guard';
import { CartComponent } from './cart/cart.component';
const routes: Routes = [
    { path : "", redirectTo: "/home", pathMatch: "full"},
    {path : "home", component: HomeComponent},
     {path : "product-search", component: SearchPageComponent},
     {path : "navbar", component: NavbarComponent},
    {path : "about-us", component: AboutusComponent},
    {path : "contact-us", component: ContactusComponent},
    {path : "allproducts", component: ProductlistComponent},
    {path : "login", component: LoginComponent},
    {path : "register", component: RegisterComponent},
    {path: "product-details/:productId", component: ProductDetailsComponent,canActivate: [AuthGuard] },
    {path: "edit-details/:productId", component: EditProductComponent, canActivate: [AuthGuard,AuthGuard1]},
    {path: "add-category", component: AddCategoryComponent,canActivate: [AuthGuard,AuthGuard1]},
    {path: "add-product", component: AddProductComponent,canActivate: [AuthGuard,AuthGuard1]},
    {path: "cart", component: CartComponent,canActivate: [AuthGuard]},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }