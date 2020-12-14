import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: any): string {
    let data = moment.unix(date.seconds);
    let dateOut: moment.Moment = moment(data, "YYYY-MM-DDTHH:mm:ss");
    return dateOut.format("DD/MM/yyyy");
  }

}
