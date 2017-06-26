
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class SubCatService {
    subcaturl = "https://storewebservice.herokuapp.com/subCategories";
    public subcatagories: any = [];

    constructor(private http: Http) {
           
    }
      getsubcategory(id) {
        return this.http.get(this.subcaturl+"/"+id).map((response: Response) => response.json())
           
    }
    get subcategories() {
        return this.subcatagories;
    }




}
