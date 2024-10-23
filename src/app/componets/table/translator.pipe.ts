import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translator',
  standalone: true
})
export class TranslatorPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'breakfast': return 'Desayuno';
      case 'lunch': return 'Almuerzo';
      case 'dinner': return 'Cena';
      default: return 'Sin asignar';
    }
  }
}
