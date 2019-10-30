import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'descricaoReduzida'//informacao a ser transformada
})
export class DescricaoReduzida implements PipeTransform{
    //recebe o dado que sera tratado
    transform(texto: string): string{
        //truncar o texto
        if(texto.length > 15){//validar o tamanho da string/array
            //retorno da string truncada
           return texto.substr(0, 15) + '...'//ajuste de corte da string superior a 15 digitos
        }
        return texto
    }
}