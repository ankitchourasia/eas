import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
// https://www.code-sample.com/2018/07/angular-6-search-filter-pipe-table-by.html
export class FilterPipe implements PipeTransform {

// 1) The first argument represents the data (customerData array) on which is applied for filters the table’s columns.
// 2) The second  argument represents the input filter text.
// 3) The third argument represents the one or multiple filter keys columns which is applied to filters.
  transform(itemList: any[], filterBy: any): any[] {
  
    let filteredList = getFilteredList(itemList, filterBy);    
    return filteredList
  }
}

export function getFilteredList(itemList: any[], filterBy: any): any[]{
  
  if(!Array.isArray(itemList) || itemList.length <= 0 || Array.isArray(filterBy) || filterBy === "" || filterBy === null || filterBy === undefined){
    return itemList;
  }
  
  if(typeof filterBy !== "object"){
    let newFilterBy = !isNaN(filterBy) ? filterBy.toString() : filterBy.toString().toLowerCase();
    
    //for exect match 
    // return itemList.filter(item => item.indexOf(newFilterBy) !== -1);

    //for string contain of 'filterBy' input.
    return itemList.filter(item => (typeof item !== 'object') && item.toString().toLowerCase().includes(newFilterBy.toString().toLowerCase()));
  }

  const isEmptyObject = !Object.values(filterBy).some(x => (x !== null && x !== undefined && x !== ''));
  // const isEmpty = Object.values(object).every(x => (x === null || x === undefined || x === ''));
  if(isEmptyObject){
    return itemList;
  }
  
  let filterKeys = Object.keys(filterBy);

  return itemList.filter(item => {
    return filterKeys.some((keyName) => {
      return getPropertyValue(item, keyName).toString().toLowerCase().includes(filterBy[keyName].toString().toLowerCase());
      // return new RegExp(filterBy[keyName], 'gi').test(getPropertyValue(item, keyName)) || filterBy[keyName] == "";
    });
  });

}

export function getPropertyValue(item: any, propertyName: string): string {
  
  if(item === null || item === undefined || item && (typeof item !== 'object' || item.constructor !== Object || !(item instanceof Object))){
    return item;
  }

  const keys: string[] = propertyName.split('.');
  let result: any = item[keys.shift()];
  for (const key of keys) {
    // check null or undefined
    if(result === null || result === undefined) {
      return "";
    }
    result = result[key];
  }
  return result;
}

// :: this code block use for filter


// <input [(ngModel)]="searchText" class="form-control form-control-sm form-inline" placeholder="Search..">

// <table class="table table-bordered table-sm table-hover text-center">
//   <thead class="bg-dark text-white">
//     <td>S.NO</td>
//     <td>BANK NAME</td>
//     <td>BANK CODE</td>
//   </thead>
//   <!-- <tr *ngFor="let bank of bankList | filter : {'name':searchText, 'code': searchText}""  ; let i = index">
//     <td>{{i + 1}}</td>
//     <td>{{bank.name}}</td>
//     <td>{{bank.code}}</td>
//   </tr> -->
//   <ng-template [ngIf]="pagination">
//     <tr *ngFor="let bank of pagination.pagedItems; let i = index">
//       <td>{{pagination.pager.startIndex + i + 1}}</td>
//       <td>{{bank.name}}</td>
//       <td>{{bank.code}}</td>
//     </tr>
//     <tr *ngIf="(!pagination.pagedItems || pagination.pagedItems.length <=0)">
//       <td colspan="12">No records found</td>
//     </tr>
//   </ng-template>
// </table>

// <div class="space-around form-inline">
//   <ngbadmin-pagination [items]="bankList | filter : {'name':searchText, 'code': searchText, 'branch.name':searchText}""  [pageSize]="pageSize" [maxPages]="maxPages" #pagination ></ngbadmin-pagination>
// </div>