import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  c() {
    console.log("workinggg");
  }

  public searchText: string = "";
  productName: string = "";
  productPrice: number = 0;
  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.isLogin=true;
      
    }
  }
  logout(){
    sessionStorage.clear();
    this.isLogin=false;
  }
  changeFun() {
    this.router.navigate(["navbar"])
  }
  searchProduct() {
    this.productName = ""

    this.productPrice = 0;

    if (this.searchText == "") {

      this.productService.setSearchDetails(this.searchText, this.productName, this.productPrice);

      this.router.navigate(["product-search"], {

        queryParams: { name: "", price: 0 }

      })

    }

    else {



      const splitArray = this.searchText.valueOf().split(" ");

      console.log(splitArray)

      splitArray.forEach((val) => {



        if (!isNaN(Number(val))) {

          this.productPrice = Number(val);

        }

        if (isNaN(Number(val))) {

          this.productName = val;
        }
      })
      this.productService.setSearchDetails(this.searchText, this.productName, this.productPrice);
      this.router.navigate(["product-search"], {
        queryParams: { name: this.productName, price: this.productPrice }
      })
    }
  }
}
