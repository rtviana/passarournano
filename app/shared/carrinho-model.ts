import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemCarrinho{

  constructor(
    //atributos
    public id: number,
    public img: object,
    public titulo: string,
    public descricao_oferta: string,
    public valor: number,
    public quantidade: number
  ) {}
}