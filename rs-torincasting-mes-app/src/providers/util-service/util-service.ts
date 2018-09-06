import { Injectable } from '@angular/core';

@Injectable()
export class UtilServiceProvider {
  userInfo: any = {
    userName: '',
    userTeam: ''
  }

  constructor() {
    console.log('Hello UtilServiceProvider Provider');
  }

  rowsDataTrimValueProperty(rows) {
    if (Array.isArray(rows) && rows.length > 0) {
      let result = [];
      rows.forEach(item => {
      let newItem = {};
      for (let prop in item) {
        // if (item.hasOwnProperty(prop)) {
        //   if (item[prop] && item[prop].value) {
        //     newItem[prop] = item[prop].value;
        //   }
        // }
        item.hasOwnProperty(prop) && (newItem[prop] = item[prop].value);
      }
      result.push(newItem);
    });
      return result;
    }
    return rows;
  }
}
