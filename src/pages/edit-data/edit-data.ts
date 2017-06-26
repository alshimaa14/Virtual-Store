import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UserService } from "../../Services/user.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {
  email;
  user;
  msg;
  newuser;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(private storage: Storage, private toastCtrl: ToastController, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val) => {
      this.email = val;
    });
    this.getUserDataFromSubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDataPage');
  }

  ListUsers() {
    return this.userService.users;
  }

  editData(name, email,password) {
    if (name.length > 0 && email.length > 0 && password.length > 6) {
      if (this.emailPattern.test(email)) {
        this.storage.get('id').then((user_id) => {
        this.newuser={
            "name":name,
            "email":email,
            "password":password
          }
          this.userService.edituserdata(user_id,this.newuser)
          this.navCtrl.push(ProfilePage);
        })
      } else {
        let toast = this.toastCtrl.create({
          message: "Invalid email pattern",
          duration: 3000,
          position: 'bottom'
        }); toast.present();
      }
    } else {
      let toast = this.toastCtrl.create({
        message: "Please fill all fields accurately",
        duration: 3000,
        position: 'bottom'
      }); toast.present();
    }
  }

  getUserDataFromSubscribe() {
    this.storage.get('email').then((email) => {
      this.userService.getUserByEmail(email).subscribe(data => {
        this.user = data;
        //  return this.user;
        //  console.log("user from profile "+this.user);
      },
        (err) => console.log(`errror ${err}`))
    })
  }

  getUserData() {
    return this.user;
  }

}

