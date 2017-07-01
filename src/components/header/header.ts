import { Component,Input} from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { CartPage } from "../../pages/cart/cart";
import { Storage } from '@ionic/storage';
import { CartProductsService } from "../../Services/cartProducts.sevice";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  productsArrLength:number;

  @Input('myTitle') myTitle;
  text:String;
  user_email;

  constructor(public cartProductsService:CartProductsService,private storage: Storage,public http:Http ,public navCtrl: NavController) {
    storage.get('email').then((emailVal) => {
      this.user_email = emailVal;
    });  
  }

  checkArrLength() {
    if(this.cartProductsService.cartProducts.length == 0 || this.cartProductsService.cartProducts == null) {
      this.productsArrLength=0;
    } else {
      this.productsArrLength = this.cartProductsService.cartProducts.length
    }
    return this.productsArrLength;
  }

  showCartPage() {
    this.navCtrl.setRoot(CartPage);
  }

  ngAfterViewInit() {
    this.text = this.myTitle;
  }

}
