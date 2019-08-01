import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10, pageNumberOption: number = 5) {
    let totalPages = Math.ceil (totalItems / pageSize);
    if(currentPage > totalPages){
      currentPage = totalPages;
    }
    let startPage: number, endPage: number;
    let midIndex: number = Math.floor(pageNumberOption / 2);
    if (totalPages <= pageNumberOption) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= (midIndex + 1)) {
        startPage = 1;
        endPage = pageNumberOption;
      } else if (currentPage + midIndex >= totalPages) {
        startPage = totalPages - (midIndex + 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - midIndex;
        endPage = currentPage + midIndex;
      }
      if (startPage <= 0) {
        startPage = 1;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    var pages = [];
    for (var i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
