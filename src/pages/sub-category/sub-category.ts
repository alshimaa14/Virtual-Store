import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsListPage } from '../products-list/products-list';
import { SubCatService } from "../../Services/subcatagory.service";

@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html',
})
export class SubCategoryPage {

  cat_id: number;
  cat_name: string;
  subcatagories: any = [];
  constructor(private catservice: SubCatService, public navCtrl: NavController, public navParams: NavParams) {
    this.cat_id = navParams.get("categoryId");
    this.cat_name = navParams.get("categotyName");
    console.log(this.cat_id);
    this.ListCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoryPage');
  }

  showProductsList($event, catagoryId, catagoryName) {
    this.navCtrl.push(ProductsListPage, {
      "categoryId": catagoryId,
      "categoryName": catagoryName
    })
    console.log(catagoryId);
  }

  ListCategory() {
    this.catservice.getsubcategory(this.cat_id).subscribe(data => {
      this.subcatagories = data
    },
      (err) => console.log(`error happened getting todos ${err}`)
    )
  
  
  }
}
