import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
// https://www.code-sample.com/2018/07/angular-6-search-filter-pipe-table-by.html
export class FilterPipe implements PipeTransform {

// 1) The first argument represents the data (customerData array) on which is applied for filters the table’s columns.
// 2) The second  argument represents the input filter text.
// 3) The third argument represents the one or multiple filter keys columns which is applied to filters.
  transform(itemList: any[], filterBy: boolean|number|string|Object, defaultFilter: boolean): any[] {
  
    let filteredList = getFilteredList(itemList, filterBy, defaultFilter);    
    console.log(filteredList);
    return filteredList
  }
}

export function getFilteredList(itemList: any[], filterBy: boolean|number|string|Object, defaultFilter: boolean): any[]{
  
  console.log(filterBy, defaultFilter);
  if(!Array.isArray(itemList) || itemList.length <= 0 || filterBy === "" || filterBy === null || filterBy === undefined){
    return itemList;
  }

  const isEmptyObject = !Object.values(filterBy).some(x => (x !== null && x !== undefined && x !== ''));
  // const isEmpty = Object.values(object).every(x => (x === null || x === undefined || x === ''));
  if(isEmptyObject){
    return itemList;
  }

  if(typeof filterBy === "boolean"){
    return itemList.filter(item => item.indexOf(filterBy) !== -1);
  }

  if(typeof filterBy === "number"){
    return itemList.filter(item => (typeof item !== 'object') && Number(item) === Number(filterBy));
  }

  if(typeof filterBy === "string"){
    return itemList.filter(item => (typeof item !== 'object') && item.toLowerCase().includes(filterBy.toLowerCase()));
  }
  
  let filterKeys = Object.keys(filterBy);

  if(defaultFilter){
    return itemList.filter(item => {
      filterKeys.reduce((x, keyName) => (x && new RegExp(filterBy[keyName], 'gi').test(item[keyName])) || filterBy[keyName] == "", true);
    });
  }

  return itemList.filter(item => {
    return filterKeys.some((keyName) => {
      return new RegExp(filterBy[keyName], 'gi').test(item[keyName]) || filterBy[keyName] == "";
    });
  });

}

// :: this code block use for filter


// <input [(ngModel)]="searchText" class="form-control form-control-sm form-inline" placeholder="Search..">

// <table class="table table-bordered table-sm table-hover text-center">
//   <thead class="bg-dark text-white">
//     <td>S.NO</td>
//     <td>BANK NAME</td>
//     <td>BANK CODE</td>
//   </thead>
//   <!-- <tr *ngFor="let bank of bankList  | filter : {name:searchText, code: searchText}"  ; let i = index">
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
//   <ngbadmin-pagination [items]="bankList | filter : {name:searchText}"  [pageSize]="pageSize" [maxPages]="maxPages" #pagination ></ngbadmin-pagination>
// </div>