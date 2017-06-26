import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import 'rxjs/add/operator/map';
@Injectable()
export class CartProductsService {

    public cartProducts = [];
    cartProductsLength;
    user_email;
    index;
    msg: string;

    constructor(public events: Events, private storage: Storage) {
        this.storage.get('email').then((val) => {
            this.user_email = val;
        });
        this.listProducts();
    }

    listProducts() {
        this.storage.get('email').then((emailVal) => {
            this.user_email = emailVal;
            this.storage.get(emailVal).then((val) => {
                if (JSON.parse(val) == null) {
                    this.cartProducts = [];
                } else {
                    this.cartProducts = JSON.parse(val);
                    this.cartProductsLength = this.cartProducts.length;
                }
            });
        });
        return this.cartProducts;
    }

    addProductsToCart(productObject) {
        this.storage.get('email').then((emailVal) => {
            this.user_email = emailVal;
            this.storage.get(emailVal).then((val) => {
                if (JSON.parse(val) == null) {
                    console.log("first time");
                    this.msg = "Product is added to cart correctlly";
                    this.events.publish('msg', this.msg);
                    this.cartProducts.push(productObject);
                    this.storage.set(this.user_email, JSON.stringify(this.cartProducts));
                    return;
                } else {
                    this.cartProducts = JSON.parse(val);
                    for (var i = 0; i < this.cartProducts.length; i++) {
                        if (productObject.barcode == this.cartProducts[i].barcode) {
                            this.msg = "already added";
                            this.events.publish('msg', this.msg);
                            break;
                        } else {
                            if (i == this.cartProducts.length - 1) {
                                this.msg = "Product is added to cart correctlly";
                                this.events.publish('msg', this.msg);
                                this.cartProducts.push(productObject)
                                this.storage.set(this.user_email, JSON.stringify(this.cartProducts));
                                this.cartProductsLength = this.cartProducts.length;
                                break;
                            }
                        }
                    }

                }
            });
        });
    }

    updateSelectedQuantity(idproduct,newQuantity) {
        this.storage.remove(this.user_email);
        for(var i=0 ; i<this.cartProducts.length ; i++) {
            if(idproduct == this.cartProducts[i].idproduct){
                this.cartProducts[i].quantity = newQuantity;
                console.log("new quantity change "+this.cartProducts[i].quantity);
            }
            console.log(this.cartProducts[i]);
        }
        this.storage.set(this.user_email, JSON.stringify(this.cartProducts));
        
    }

    deleteProduct(id) {
        this.storage.get(this.user_email).then((val)=>{
            this.cartProducts = JSON.parse(val);
            if(this.cartProducts.length>1){
            this.cartProducts=this.cartProducts.filter((product)=> product.idproduct !=id);
            this.storage.set(this.user_email,JSON.stringify(this.cartProducts));
            } else if(this.cartProducts.length == 1){
                this.cartProducts=this.cartProducts.filter((product)=> product.idproduct !=id);
                this.storage.remove(this.user_email);
            }
        }); 
    }

    deleteAllProducts() {
        this.storage.remove(this.user_email);
        this.cartProducts = [];
    }

}