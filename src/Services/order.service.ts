
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
@Injectable()
export class OrderService {
    orders = [];
    user_id;
    orderId;
    orderUrl = "https://storewebservice.herokuapp.com/orders";
    productUrl = "https://storewebservice.herokuapp.com/products";

    constructor(private http: Http, private storage: Storage) {
        storage.get('id').then((val) => {
            this.user_id = val;
              this.getAllOrders(this.user_id);
        });
        this.Orders;
      
    }

    getAllOrders(userid) {
         this.http.get(this.orderUrl+"/"+userid).map((response: Response) => response.json())
            .subscribe(data => {
                this.orders = data
            },
            (err) => console.log(`error happened getting todos ${err}`)
            );
    }

    get Orders() {
        return this.orders;
    }

    addorder(iduser, selectedTime, totalPrice, selectedAddress, selectedMobile) {
        console.log(selectedAddress);
        console.log(selectedTime);
        let newselectedtime = selectedTime.year + "-" + selectedTime.month + "-" + selectedTime.day + " " + selectedTime.hour + ":" + selectedTime.minute
        let neworder = {
            "iduser": iduser,
            "status": 3,
            "selectedtime": newselectedtime,
            "totalprice": totalPrice,
            "selectedaddress": selectedAddress,
            "selectedmobile": selectedMobile
        }
        console.log("new order", neworder);
        if(this.orders.length == 0) {
            this.orders = [neworder];
        } 
        // this.orders.push(neworder);
        // console.log("array "+this.orders);
        return this.http.post(this.orderUrl, neworder).map((response: Response) => response.json())

    }

    addorderdetails(orderid, cartproduct) {
        let orderproduct = [];
        let orderproductobject = {};
        for (var i = 0; i < cartproduct.length; i++) {
            orderproductobject = {
                "idorder": orderid,
                "idproduct": cartproduct[i].idproduct,
                "unitprice": cartproduct[i].price,
                "orderquantity": cartproduct[i].quantity
            }
            orderproduct.push(orderproductobject);
        }
        this.http.post(this.orderUrl + "/" + orderid, orderproduct).map((response: Response) => response.json())
            .subscribe(data => {
                console.log(data);

            },
            (err) => console.log(`errror ${err}`)
            )
    }

    updateProductQuantity(cartproduct) {
        let products = [];
        let productoobject = {};
        for (var i = 0; i < cartproduct.length; i++) {
            productoobject = {
                "quantity": cartproduct[i].quantity,
                "idproduct": cartproduct[i].idproduct
            }
            products.push(productoobject);
        }
        return this.http.put(this.productUrl, products).map((response: Response) => response.json())
            .subscribe(data => {
                console.log(data);

            },
            (err) => console.log(`errror ${err}`)
            )
    }

    getorderdetails(orderid){
        return this.http.get(this.orderUrl+"/"+"details"+"/"+orderid).map((response: Response) => response.json())
    }
}