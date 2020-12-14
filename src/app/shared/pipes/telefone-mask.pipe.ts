import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneMask'
})
export class TelefoneMaskPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length === 11) {
      value=value.replace(/^(\d{2})(\d)/g,"($1) $2");
      value=value.replace(/(\d)(\d{4})$/,"$1-$2");
    }
    if (value.length === 10) {
      value=value.replace(/^(\d{2})(\d)/g,"($1) $2");
      value=value.replace(/(\d)(\d{4})$/,"$1-$2");
    }
    return value;
  }

}
