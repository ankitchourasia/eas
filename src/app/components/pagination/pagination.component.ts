import { Component, OnInit, Input, ViewEncapsulation, OnChanges, DoCheck, Output, EventEmitter, KeyValueDiffers, SimpleChanges } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'eas-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class PaginationComponent implements OnInit, OnChanges, DoCheck {

  items: Array<any> = [];
  currentPage: number = 1;
  totalItem: number = 0;
  pageSize: number = 10;
  maxPages: number = 10;
  
  pager:any = {};
  pagedItems: Array<any>;
  
  @Output() pageChange = new EventEmitter<{pageItems: any, pager: any}>(true);
  
  constructor(private paginationService: PaginationService, private keyValueDiffers: KeyValueDiffers) { }
  
  @Input('currentPage')
  set setCurrentPage(currentPage: number){
    this.currentPage = currentPage;
    console.log("current setter called");
  }
  
  @Input("totalItem")
  set setTotalItem(totalItem: number){
    this.totalItem = totalItem;
    console.log("total item setter called");
  }

  @Input("items")
  set setItems(items : Array<any>){
    this.items = items;
    console.log("items setter called", this.items);
  }

  @Input("pageSize")
  set setPageSize(pageSize : number){
    this.pageSize = pageSize ? pageSize : this.pageSize;
    console.log("page size setter called");
  }

  @Input("maxPages")
  set setMaxPages(maxPages : number){
    this.maxPages = maxPages ? maxPages : this.maxPages;
  }

  ngOnInit() {
    console.log("on init called");
  }

  keyValueDiffer: any;
  ngOnChanges(changes: SimpleChanges) {
    console.log("on changes called");
  
    if(changes.setItems && JSON.stringify(changes.setItems.currentValue) !== JSON.stringify(changes.setItems.previousValue)) {
      console.log("on changes called for setItems");
      let items = changes.setItems.currentValue;
      this.keyValueDiffer = this.keyValueDiffers.find(items).create();
    }

    if(this.items && changes.setPageSize && changes.setPageSize.currentValue !== changes.setPageSize.previousValue) {
      console.log("on changes called for setPageSize");
      this.setPage(this.currentPage);
    }

    if(this.items && changes.setTotalItem && changes.setTotalItem.currentValue !== changes.setTotalItem.previousValue) {
      console.log("on changes called for setTotalItem");
      this.setPage(this.currentPage);
    }

    if(this.items && changes.setMaxPages && changes.setMaxPages.currentValue !== changes.setMaxPages.previousValue) {
      console.log("on changes called for setTotalItem");
      this.setPage(this.currentPage);
    }
  }

  ngDoCheck(): void {
    console.log("do check called");
    if(this.keyValueDiffer){
      console.log("key value differ");
      let keyValueChanges = this.keyValueDiffer.diff(this.items);
      if(keyValueChanges){
        console.log("key value changes");
        this.setPage(this.currentPage);
      }
    }
  }
  
  setPage(currentPage: number) {
    console.log("set page called");
    this.currentPage = currentPage;
    if (this.currentPage < 1) { return; }
    
    let totalItem = this.totalItem > 0 ? this.totalItem : this.items.length;
    console.log("total item", totalItem);
    this.pager = this.paginationService.getPager(totalItem, this.currentPage, this.pageSize, this.maxPages);
    
    this.pagedItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if(this.pagedItems.length <= 0){
      this.currentPage = this.currentPage - 1;
      this.setPage(this.currentPage);
      return;
    }
    this.pageChange.emit({pageItems: this.pagedItems, pager: this.pager});
  }

}
  