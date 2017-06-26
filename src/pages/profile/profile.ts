import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserService } from "../../Services/user.service";
import { EditDataPage } from '../edit-data/edit-data';
import { Storage } from '@ionic/storage';
import { AddAddressPage } from "../add-address/add-address";
import { ChangePasswordPage } from "../change-password/change-password";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  mobiles = [];
  addresses = [];
  user;
  email;
  user_id;
  mobilePattern = /01([0-9]{9})/;

  constructor(private storage: Storage, private toastCtrl: ToastController, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val) => {
      this.email = val;
    });
    storage.get('id').then((val) => {
      this.user_id = val;
      console.log("id " + this.user_id);
    })
    
    this.getUserDataFromSubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editData() {
    this.navCtrl.push(EditDataPage);
  }

  ListUsers() {
    return this.userService.users;
  }

  listMobiles() {
    return this.userService.Mobiles
  }


  listAddresses() {
    return this.userService.Addresses;
  }

  addNewAddress() {
    this.navCtrl.push(AddAddressPage);
  }

  addNewMobile(mobile) {
    if (mobile.length > 0) {
      if (this.mobilePattern.test(mobile)) {
        this.storage.get('id').then((user_id) => {
          this.user_id = user_id;
          this.userService.AddNewMobile(this.user_id, mobile);
        })
      } else {
        let toast = this.toastCtrl.create({
          message: "Invalid mobile number",
          duration: 3000,
          position: 'bottom'
        }); toast.present();
      }
    } else {
      let toast = this.toastCtrl.create({
        message: "Please enter mobile number",
        duration: 3000,
        position: 'bottom'
      }); toast.present();
    }
  }

  getUserDataFromSubscribe() {
    this.storage.get('email').then((email) => {
      this.userService.getUserByEmail(email).subscribe(data => {
        this.user = data;
        this.userService.userObject = data;
      },
        (err) => console.log(`errror ${err}`))
    })
  }

  getUserData() {
    return this.userService.userObject;
  }

  changePassword(password) {
    this.navCtrl.push(ChangePasswordPage,{
      "password":password
    });
  }

}
