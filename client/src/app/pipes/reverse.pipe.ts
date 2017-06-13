import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'reverse'
})

export class ReversePipe implements PipeTransform {
  transform($value: Observable<Array<any>>) {
    return $value.map(item => item.slice().reverse());
  }
}
