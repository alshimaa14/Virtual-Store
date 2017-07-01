import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController } from 'ionic-angular';
import { CheckoutPage } from "../checkout/checkout";
import { CartProductsService } from "../../Services/cartProducts.sevice";
import { Storage } from '@ionic/storage';
import { CategoriesPage } from '../categories/categories';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  productsArrLength:number;

  public id:number;
  swapCartArray;

  constructor(public storage:Storage,public cartProductsService:CartProductsService,private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  checkOut(quantity) {
      this.navCtrl.push(CheckoutPage);
  }

  Listproducts() {
      return this.cartProductsService.cartProducts;
  }

  checkArrLength() {
    if(this.cartProductsService.cartProducts.length == 0 || this.cartProductsService.cartProducts == null) {
      this.productsArrLength=0;
    } else {
      this.productsArrLength = this.cartProductsService.cartProducts.length
    }
    return this.productsArrLength;
  }

  updateSelectedQuantity(idproduct,newQuantity) {
    this.cartProductsService.updateSelectedQuantity(idproduct,newQuantity);
  }

  testTotalPrice() {
    var inputNum = (<HTMLInputElement>document.getElementById("inputNum")).value;
    console.log(inputNum);
  }

  continueShopping() {
    this.navCtrl.push(CategoriesPage);
  }

  deleteProduct(id:number) {
    this.cartProductsService.deleteProduct(id);
  }

  deleteAll() {
    this.cartProductsService.deleteAllProducts();
  }


}
