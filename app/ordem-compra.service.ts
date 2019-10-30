import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from './shared/pedido-model.service';
import { URL_API } from './app.api';
 
@Injectable()
export class OrdemCompraService {
 
  constructor(private http: HttpClient) { }  
 
  public efetivarCompra(pedido: Pedido): Observable<number>{
 
    
    //parametros de cabeçalhos (obrigatorio)
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
    })
    let options = {
      headers,
  } 
    return this.http.post(`${URL_API}/pedidos`,JSON
    .stringify(pedido),options)//forcar a conversao em string
      .pipe(
        map((resposta: any) => resposta.id)//recuperar o response da requisicao, sendo transformado no conteudo da resposta e nao todos os parametros contidos        
    )
  }
}