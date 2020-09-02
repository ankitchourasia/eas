import { Component, OnInit, Input, ViewEncapsulation, OnChanges, DoCheck, Output, EventEmitter, KeyValueDiffers, SimpleChanges, IterableDiffers } from '@angular/core';
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
  
  keyValueDiffer: any;
  iterableDiffer: any;
  
  @Output() pageChange = new EventEmitter<{pagedItems: any, pager: any}>(true);

  constructor(private keyValueDiffers: KeyValueDiffers, private iterableDiffers: IterableDiffers,
    private paginationService: PaginationService, ) {
      console.log("pagination constructor called");
     }
    
  @Input('currentPage')
  set setCurrentPage(currentPage: number){
    console.log("current setter called");
    this.currentPage = currentPage ? currentPage : this.currentPage;
  }
  
  @Input("totalItem")
  set setTotalItem(totalItem: number){
    console.log("total item setter called");
    this.totalItem = totalItem ? totalItem : this.totalItem;
  }

  @Input("items")
  set setItems(items : Array<any>){
    console.log("items setter called", this.items);
    this.items = items ? items : this.items;
  }

  @Input("pageSize")
  set setPageSize(pageSize : number){
    console.log("page size setter called");
    this.pageSize = pageSize ? pageSize : this.pageSize;
  }

  @Input("maxPages")
  set setMaxPages(maxPages : number){
    console.log("max pages setter called");
    this.maxPages = maxPages ? maxPages : this.maxPages;
  }

  ngOnInit() {
    console.log("on init called");
    this.keyValueDiffer = this.keyValueDiffers.find(this.items).create();
    //----------OR---------------------
      // this.iterableDiffer = this.iterableDiffers.find([]).create(null); 
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("on changes called");
  
    if(changes.setItems && changes.setItems.currentValue !== changes.setItems.previousValue) {
      console.log("on changes called for setItems");
      // this.keyValueDiffer = this.keyValueDiffers.find(this.items).create();
      //----------OR---------------------
      // this.iterableDiffer = this.iterableDiffers.find([]).create(null); 
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
    if(this.items && changes.setCurrentPage && changes.setCurrentPage.currentValue !== changes.setCurrentPage.previousValue) {
      console.log("on changes called for setTotalItem");
      this.setPage(this.currentPage);
    }
  }

    
  // reference ngDoCheck  https://www.concretepage.com/angular/angular-ngdocheck#IterableDiffers
  ngDoCheck(): void {
    console.log("do check called");
    if(this.keyValueDiffer){
      console.log("key value differ");
      const keyValueChanges = this.keyValueDiffer.diff(this.items);
      if(keyValueChanges){
        console.log("key value changes");
        this.setPage(this.currentPage);
      }
    }
    //----------OR---------------------
    // if(this.iterableDiffer){
    //   console.log("iterable differ");
    //   const iterableChanges = this.iterableDiffer.diff(this.items);
    //   if(iterableChanges){
    //     console.log("iterable changes");
    //     this.setPage(this.currentPage);
    //   }
    // }
  }
  
  setPage(currentPage: number) {
    console.log("set page called");
    this.currentPage = currentPage;
    if(this.currentPage < 1) { return; }
    if(!Array.isArray(this.items)){
      throw new Error("itmes attribute not a list type.");
    }
    let totalItem = this.totalItem > 0 ? this.totalItem : this.items.length;
    console.log("total item", totalItem);

    this.initiatePager(totalItem, this.currentPage, this.pageSize, this.maxPages);
  
    this.pagedItems = this.getPagedItems(this.items, this.pager.startIndex, this.pager.endIndex);
    
    // if(this.pagedItems.length <= 0){
    //   this.currentPage = this.currentPage - 1;
    //   this.setPage(this.currentPage);
    //   return;
    // }
    this.pageChange.emit({pagedItems: this.pagedItems, pager: this.pager});
  }

  initiatePager(totalItem: number, pageNo: number, pageSize: number, maxPages: number){
    this.pager = this.paginationService.getPager(totalItem, pageNo, pageSize, maxPages);
  }

  getPagedItems(items: Array<any>, startIndex: number, endIndex){
    return items.slice(startIndex, endIndex + 1);
  }

}
  