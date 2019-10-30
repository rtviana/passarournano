import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Ofertas } from '../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {

  public ofertas: Ofertas[]
  
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    //execucao do metodo
    //indicar para o promise o que ela deve fazer quando estiver resolvida
    this.ofertasService.getOfertasPorCategoria('diversao')
    .then((ofertas: Ofertas[]) => {
    this.ofertas = ofertas
    })
  }
}