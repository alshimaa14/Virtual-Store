import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  password;
  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.password = navParams.get("password");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePassword(oldPass, newPass) {
    console.log(oldPass+" "+this.password);
    if (oldPass == this.password) {
      
    } else {
      let toast = this.toastCtrl.create({
        message: "Old password is incorrect",
        duration: 3000,
        position: 'bottom'
      }); 
      toast.present();
    }
  }

}
