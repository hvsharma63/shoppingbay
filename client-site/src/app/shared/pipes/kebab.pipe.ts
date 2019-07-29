import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kebab'
})

export class KebabPipe implements PipeTransform {
    transform(value: any): any {
        return value.replace(/\s+/g, '-');
    }
}