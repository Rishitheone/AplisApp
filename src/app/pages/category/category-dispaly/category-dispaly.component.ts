import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-dispaly',
  templateUrl: './category-dispaly.component.html',
  styleUrls: ['./category-dispaly.component.scss']
})
export class CategoryDispalyComponent implements OnInit {
   
  @Input()category:any;
  isHidden = true;
  constructor() { }

  onSelect(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.id); // You get the Id of the selected item here
}
  ngOnInit() {
  }

}
