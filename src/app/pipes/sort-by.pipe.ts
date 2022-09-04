import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(array: any[], sortKey: string, sortOrder: string): any {
    let results = [];
    if (!Array.isArray(array) && !sortKey) {
      return;
    } else {
      if (sortOrder === 'asc') {
        results = array.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
      } else {
        results = array.sort((a, b) => (a[sortKey] < b[sortKey] ? 1 : -1));
      }
    }
    return results;
  }
}
