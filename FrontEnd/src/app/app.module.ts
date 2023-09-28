import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarasoolComponent } from './carasool/carasool.component';
import { CardbodyComponent } from './cardbody/cardbody.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SearchPageComponent } from './product/search-page/search-page.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DatePipe } from '@angular/common';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
  //{ path: '', component: NavbarComponent} // localhost:8000
  //{path: 'login', component: logincomponnt}
  //{path : 'products', component: productcomponent}

]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarasoolComponent,
    CardbodyComponent,
    FooterComponent,
    SearchPageComponent,
    AddCategoryComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    ProductlistComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
    EditProductComponent,
    AddProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
