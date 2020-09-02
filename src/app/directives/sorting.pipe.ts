import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(itemList: any[], orderBy: number|string = "", sortBy: string = ""): any[] {
  
    return getSortedList(itemList, orderBy, sortBy);
  
  }
}

export function getSortedList(itemList: any, sortOrder: number|string = "", sortBy: string = ""){
  let direction: number;
  
  if(!Array.isArray(itemList) || itemList.length <= 0 || sortOrder === "" || !sortOrder){
    return itemList;
  }

  if(sortOrder === -1 || (typeof sortOrder === "string" && sortOrder.toLowerCase() === "desc")){
    direction = -1;
  }else if(sortOrder === 1 || (typeof sortOrder === "string" && sortOrder.toLowerCase() === "asc")){
    direction = 1;
  }else{
    return itemList;
  }
  // sort 1d array
  if(sortBy === "" || !sortBy){
    if(direction === 1){ 
      return itemList.sort(); 
    }
    return itemList.sort().reverse();
  }
  // sort object array
  return itemList.sort((a: any, b: any) => {
    const propertyA: number|string = this.getProperty(a, sortBy);
    const propertyB: number|string = this.getProperty(b, sortBy);

    if(propertyA < propertyB) {
      return -1 * direction;
    }
    if(propertyA > propertyB) {
      return 1 * direction;
    }
    return 0;
  });
}

// getProperty (value: { [key: string]: any}, sortBy: string): number|string {
export function getProperty(value: any, sortBy: string): number|string {

  if(value === null || value === undefined || value && (typeof value !== 'object' || value.constructor !== Object || !(value instanceof Object))){
    return value;
  }

  const keys: string[] = sortBy.split('.');
  let result: any = value[keys.shift()];
  for (const key of keys) {
    // check null or undefined
    if(result === null || result === undefined) {
      return "";
    }
    result = result[key];
  }
  return result;
}


// :: this code block use for sorting

// sortBy: string;
// orderBy: number = 1;
// bankList = [
//             {"id":1,"name":"1 ","code":"2", "branch": {"id":1, "bname": "3", "bcode": {"id":1, "cname": "1"}}},
//             {"id":7,"name":"2","code":"3", "branch": {"id":2, "bname": "2"}},
//             {"id":7,"name":"3","code":"4", "branch": {"id":2, "bname": "1","bcode": {"id":1, "cname": "4"}}},
//             {"id":8,"name":"4","code":"1", "branch": {"id":3, "bname": "4", "bcode": {"id":1, "cname": "abc"}}}
//            ];

// <table class="table table-bordered table-sm table-hover text-center">
//   <thead class="bg-dark text-white">
//     <td>S.NO</td>
//     <td (click)="sortBy='name';orderBy=orderBy*(-1)">BANK NAME</td>
//     <td (click)="sortBy='code';orderBy=orderBy*(-1)">BANK CODE</td>
//     <td (click)="sortBy='branch.bname';orderBy=orderBy*(-1)">BRANCH NAME</td>
//     <td (click)="sortBy='branch.bcode.cname';orderBy=orderBy*(-1)">BRANCH CODE</td>
//   </thead>
//   <tbody>
//      <tr *ngFor="let bank of bankList | sorting : orderBy : sortBy ; let i = index">
//       <td>{{i + 1}}</td>
//       <td>{{bank.name}}</td>
//       <td>{{bank.code}}</td>
//       <td>{{bank.branch.bname}}</td>
//       <td>{{bank.branch.bcode?.cname}}</td>
//     </tr>
//   </tbody>
// </table>