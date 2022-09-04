import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy',
})
export class SearchByPipe implements PipeTransform {
  transform(array: any[], searchKey: any, searchText: any): any {
    if (!array) {
      return [];
    }
    if (!searchText) {
      return array;
    }
    searchText = searchText.toLocaleLowerCase();
    if (searchKey === 'Name') {
      return array.filter((item) => {
        console.log(item);
        return item.name.includes(searchText);
      });
    } else {
      return array.filter((item) => {
        return item.abilities.some((ability: any) => {
          return ability.ability.name.includes(searchText);
        });
      });
    }
  }
}
