import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderService } from "../../Services/order.service";

@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  OrderService: any;

  idorder;
  ordertime;
  deliverytime;
  totalPrice;
  totalprice;

  constructor(public orderService:OrderService,public navCtrl: NavController, public navParams: NavParams) {
    this.idorder = navParams.get("idorder");
    this.ordertime = navParams.get("ordertime");
    this.deliverytime = navParams.get("deliverytime");
    this.totalprice = navParams.get("totalprice");
    this.listorderdetails();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderDetailsPage');
    //  console.log("shimaa "+this.Orderdetails);
    // console.log("aya"+this.orderdetails);
  }

  backBtn() {
    this.navCtrl.pop();
  }

  orderdetails:any=[];
  listorderdetails(){
    this.orderService.getorderdetails(this.idorder).subscribe(data => {
        console.log("hiii "+JSON.stringify(data));
        this.orderdetails=data
    },
      (err) => console.log(`errror ${err}`)
    )
    
  }

  get Orderdetails(){
    return this.orderdetails;
  }

}
