
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    public products: any = [];
    public allProducts:any =[];
    storeUrl = "https://storewebservice.herokuapp.com/products";
    constructor(private http: Http) {
       this.getAllProducts();
    }
    getAllProducts(all: boolean = false) {
        return this.http.get(this.storeUrl).map((response: Response) => response.json())
            .subscribe(data => {
                this.allProducts = data
                console.log(`the data ${data}`);
            },
            err => console.log(`error happened getting products ${err}`)
            );
    };
  
  getproductbycategory(idcategory,idcategory1){
      return  this.http.get(this.storeUrl+"/"+idcategory+"/"+idcategory1).map((response: Response) => response.json())
           
    };
  
    
  getproductid(idproduct){
      return  this.http.get(this.storeUrl+"/"+idproduct).map((response: Response) => response.json())
           
    };

    // addProduct(productname,productbarcode,productprice,productquantity,productimage,productdescription:any)
    addProduct(productname, productbarcode, productprice, productquantity, productdescription, catid: any) {
        console.log("in service");
        console.log(productname);
        if (productname != "") {
            let body = {
                "name": productname,
                "barcode": productbarcode,
                "price": productprice,
                "quantity": productquantity,
                "descripation": productdescription,
                "image": "image",
                "cat_id": catid,
                "status": 1
            }
            this.http.post(this.storeUrl, body).map((response: Response) => response.json())
                .subscribe(
                data => {
                    this.products.push(data);
                },
                (err) => console.log(`errror ${err}`)
                )
        } else
            console.log("error");
        console.log(productname);
    };
    removeProduct(removeid: any) {
        console.log(removeid);
        this.products = this.products.filter((product: any) => product.id != removeid)
    };

    editProduct(productNameEdit, productBarcodeEdit, productPriceEdit, productQuantityEdit, productImageEdit, productDescriptionEdit, id, status: any) {
        console.log("in service");
        console.log(productNameEdit)
        if (productNameEdit != "") {
            let body = {
                "id": id,
                "name": productNameEdit,
                "barcode": productBarcodeEdit,
                "price": productPriceEdit,
                "Quantity": productQuantityEdit,
                "descripation": productDescriptionEdit,
                "image": productImageEdit,
                "status": status,
                "cat_id":2

            }
            this.http.put(this.storeUrl + "/" + id, body).map((response: Response) => response.json())
                .subscribe(
                data => {
                    this.products.push(data);
                },
                (err) => console.log(`errror ${err}`)
                )
        } else
            console.log("error");
    };

}
