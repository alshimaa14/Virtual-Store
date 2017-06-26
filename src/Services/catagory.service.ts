
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CatService {
    public catagories: any = [];
    name:string;
    description:string;
    catUrl = "https://storewebservice.herokuapp.com/Categories";
    constructor(private http: Http) {
        this.getAllCat();
    }

    getAllCat() {
        return this.http.get(this.catUrl).map((response: Response) => response.json())
            .subscribe(data => {
                this.catagories = data
            },
            err => console.log(`error happened getting todos ${err}`)
            );
    }
    get categories() {
        return this.catagories;
    }

    

}
