import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTotalPrice'
})
export class CalculateTotalPricePipe implements PipeTransform {

  transform(value: number, day: number): number {
    return value*day;
  }

}
