import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Ofertas } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ],
})
export class HomeComponent implements OnInit {

  public ofertas: Ofertas[]
  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    //tratativa da promise
    this.ofertasService.getOfertas()
    //then -> executa uma ação quando a promise estiver resolvida
      .then((ofertas: Ofertas[]) => {
        this.ofertas = ofertas}//ação com a informação      
    )
      .catch(//sera executada com base no retorno do reject da promise        
      (param: any) => {}
      )
  }
}