import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

    public users: any = [];
    public user: any;
    public userObject;
    public errorMsg = 0;

    title: string;
    quantity: number;
    price: number;
    description: string;
    mobiles;
    addresses;
    user_email;
    isLogged = null;
    currentuserid: any;
    userUrl = "https://storewebservice.herokuapp.com/users/";
    useraddressUrl = "https://storewebservice.herokuapp.com/usersaddress/";
    usermobileUrl = "https://storewebservice.herokuapp.com/Mobiles/"

    constructor(private storage: Storage, private http: Http) {
        storage.get('id').then((val) => {
            this.listMobiles(val);
            this.listAddress(val);
        })
    }

    getUserByEmail(email: string) {
        return this.http.get(this.userUrl + "/" + email).map((response: Response) => response.json())
    }

    login(email: string, password: string) {
        return this.http.get(this.userUrl + "user" + "/" + email + "/" + password).map((response: Response) => response.json())
    }

    addUser(userName: string, email: string, password: string) {
        if (userName != "" && email != "" && password != "") {
            let newUser = {
                "name": userName,
                "email": email,
                "password": password
            }
            return this.http.post(this.userUrl, newUser).map((response: Response) => response.json())

        }
    }

    AddNewAddress(id, country, city, street) {
        let newaddress = {
            "iduser": id,
            "country": country,
            "city": city,
            "street": street
        }
        return this.http.post(this.useraddressUrl + "/" + id, newaddress).map((response: Response) => response.json()).subscribe(
            data => {
                console.log(data);
                this.addresses.push(data);
            },
            (err) => console.log(`errror ${err}`)
        )
    }

    AddNewMobile(id, mobile) {
        let newmobile = {
            "iduser": id,
            "mobile": mobile
        }
        return this.http.post(this.usermobileUrl + "/" + id, newmobile).map((response: Response) => response.json()).subscribe(
            data => {
                console.log(data);
                this.mobiles.push(data);
                this.errorMsg = 0;
            },
            (err) => this.errorMsg = 1
        )
    }

    listMobiles(userid) {
        console.log("inside service id ", userid);
        this.http.get(this.usermobileUrl + "/" + userid).map((response: Response) => response.json()).subscribe(data => {
            // data = JSON.stringify(data);
            this.mobiles = data;
            console.log("mobile", this.mobiles);
            console.log("stringfy data " + JSON.stringify(data))
        }
            , (err) => console.log(`error happen ${err}`))

    }

    get Mobiles() {
        return this.mobiles;
    }

    listAddress(userid) {
        this.http.get(this.useraddressUrl + "/" + userid).map((response: Response) => response.json()).subscribe(data => {
            // data = JSON.stringify(data);
            this.addresses = data;
        }
            , (err) => console.log(`error happen ${err}`))

    }

    get Addresses() {
        return this.addresses;
    }

    edituserdata(userid, newuser) {
        this.http.put(this.userUrl + "/" + userid, newuser).map((response: Response) => response.json()).subscribe(data => {
            console.log(data);
            // this.userObject=[];
            this.userObject.push(data);
            this.storage.get('email').then((email) => {
                this.getUserByEmail(email).subscribe(data => {
                    this.user = data;
                    this.userObject = data;
                },
                    (err) => console.log(`errror ${err}`))
            })
        }
            , (err) => console.log(`error happen ${err}`))

    }
}