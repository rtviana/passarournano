import { Component, OnInit } from '@angular/core';
import { Ofertas } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  //execucao do metodo a partir da instancia do servico
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public ofertas: Ofertas[]
  
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    //execucao do metodo
    //indicar para o promise o que ela deve fazer quando estiver resolvida
    this.ofertasService.getOfertasPorCategoria('restaurante')
    .then((ofertas: Ofertas[]) => {
    this.ofertas = ofertas
    })
  }
}