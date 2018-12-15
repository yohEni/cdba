import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephonePipe'
})
export class TelephonePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    const numSansEspaces = value.trim().replace(/\s/g, '').replace('+33', '0');
    const espaces = '  ';
    let numAvecEspace = `${numSansEspaces.substring(0, 2)}${espaces}`;
    numAvecEspace = numAvecEspace.concat(`${numSansEspaces.substring(2, 4)}${espaces}`);
    numAvecEspace = numAvecEspace.concat(`${numSansEspaces.substring(4, 6)}${espaces}`);
    numAvecEspace = numAvecEspace.concat(`${numSansEspaces.substring(6, 8)}${espaces}`);
    numAvecEspace = numAvecEspace.concat(`${numSansEspaces.substring(8, 10)}`);
    return numAvecEspace;
  }

}
