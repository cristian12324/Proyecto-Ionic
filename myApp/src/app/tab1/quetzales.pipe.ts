import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quetzales',
  standalone: true 
})
export class QuetzalesPipe implements PipeTransform {
  transform(value: number): string {
    return `Q. ${value.toFixed(2)}`;
  }
}
