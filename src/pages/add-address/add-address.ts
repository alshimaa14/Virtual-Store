import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { UserService } from "../../Services/user.service";
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

declare var state: any;
declare var city: any;
declare var street: any;

@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  user_id;
  public static state: string;
  public static city: string;
  public static street: string;
  msg;

  constructor(public geolocation: Geolocation, private toastCtrl: ToastController, private storage: Storage, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
  }

  addAddress(state, city, street) {
    if (state.length > 0 && city.length > 0 && street.length > 0) {
      this.storage.get('id').then((user_id) => {
        this.user_id = user_id;
        this.userService.AddNewAddress(this.user_id, state, city, street);
      })
      this.navCtrl.push(ProfilePage);
    } else {
      let toast = this.toastCtrl.create({
        message: "Please fill all fields accurately",
        duration: 3000,
        position: 'bottom'
      }); toast.present();
    }
  }

  get_location() {
    this.geolocation.getCurrentPosition({
      // enableHighAccuracy: true,
      timeout: 300000,
      maximumAge: 0
    }).then((Position) => {
      var x = Position.coords.latitude;
      var y = Position.coords.longitude;
      this.displayLocation(x, y);
    }, (err) => alert(err.message)).catch(err => alert(err.message));
    let watcher = this.geolocation.watchPosition().subscribe((Position) => {
      watcher.unsubscribe();
    })
  }

  displayLocation(latitude, longitude) {
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
    var async = true;
    var address;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        address = data.results[0];
        address = address.formatted_address;
        address = address.split(',');
        console.log(address + data.results);
        AddAddressPage.street = address[0];
        AddAddressPage.city = address[1];
        AddAddressPage.state = address[2];
        // console.log("state drom observer "+AddAddressPage.state);
        // var detailedAddress = address[1] + " " + address[0];
        // alert(detailedAddress)
      }
    };
    request.send();
  };

  getCity() {
    return AddAddressPage.city;
  }

  getStreet() {
    return AddAddressPage.street;
  }

  getState() {
    return AddAddressPage.state
  }

}
