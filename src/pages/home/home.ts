import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { CategoriesPage } from '../categories/categories';
import { CartPage } from "../cart/cart";
import { OrderHistoryPage } from "../order-history/order-history";
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ProductService } from "../../Services/product.service";
import { CartProductsService } from "../../Services/cartProducts.sevice";
import { ProductPage } from "../product/product";
import { Storage } from '@ionic/storage';
import { LoginPage } from "../login/login";
// import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  result;
  barcode;
  user_email;

  constructor(private storage: Storage,private toastCtrl: ToastController,private productService:ProductService,public cartProductsService:CartProductsService,private barCode:BarcodeScanner,public navCtrl: NavController,public navParams:NavParams) {
    this.result={"text":"","format":"","cancelled":false};
     storage.get('email').then((emailVal) => {
      this.user_email = emailVal;
    });

  }

  async scanBarCode() {

    this.options = {
      prompt: 'Scan the bar code to see the result'
    }

    this.result = await this.barCode.scan(this.options);   
    if(this.productService.allProducts.length == 0) {
      // console.log("nnnnnnnnnnn")
      let toast = this.toastCtrl.create({
                message: 'Connection Error, Please make sure that you\'re connected to the internet',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
    } else {
      for(var i=0 ; i<this.productService.allProducts.length;i++) {  
        console.log("text "+this.result.text);
        console.log("db "+this.productService.allProducts[i].barcode)
        if(this.result.text == this.productService.allProducts[i].barcode) {
          // console.log("inide first if");
          
            this.navCtrl.push(ProductPage,{
              "productId":this.productService.allProducts[i].idproduct,
              "productName":this.productService.allProducts[i].name
            })
        break;
        } else {
          if(i==this.productService.allProducts.length-1){
          // console.log("inide second if");
            
              let toast = this.toastCtrl.create({
                message: 'Product doesn\'t exist',
                duration: 3000,
                position: 'bottom'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            toast.present();
          } else {
            continue;
          }  
        }
      }
    }

  }

  showCategories() {
    this.navCtrl.push(CategoriesPage);
  }

  showProfile() {
    if(this.user_email == null){
      let toast = this.toastCtrl.create({
        message: 'You must login first',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
        this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(ProfilePage);
    }
  }

  showHistory() {
    if(this.user_email == null){
      let toast = this.toastCtrl.create({
        message: 'You must login first',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(OrderHistoryPage);
    }
  }

  showCart() {
    if(this.user_email == null){
      let toast = this.toastCtrl.create({
        message: 'You must login first',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      this.navCtrl.push(LoginPage);
    } else {
    this.navCtrl.push(CartPage);
    }
  }

// watchNetworkForDisconnect()
// {
//     let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
//         console.log('network was disconnected :-(');
//     });
//     disconnectSubscription.unsubscribe();

// }

// connectSubscription (){
//    this.network.onConnect().subscribe(() => {
//     console.log('network connected!');
//   // We just got a connection but we need to wait briefly
//    // before we determine the connection type. Might need to wait.
//   // prior to doing any api requests as well.
//     setTimeout(() => {
//     if (this.network.type === 'wifi') {
//         console.log('we got a wifi connection, woohoo!');
//       }
//      }, 3000);
//     });

// // stop connect watch
//   // this.connectSubscription.unsubscribe();
// }


}
