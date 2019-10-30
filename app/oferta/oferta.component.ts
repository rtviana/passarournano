import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Ofertas } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { CarrinhoService } from '../carrinho-service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Ofertas

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {

    //combinacao de promises e observables
    this.route.params.subscribe((parametros: Params) => {//tratativa do disparo de eventos da pesquisa
        //recuperando dados da url atraves da rota (acessando os parametros) com snapshot
        //permitir recuperar a oferta com base no id do snapshot anterior
        this.ofertasService.getOfertaPorId(parametros.id)
        .then(( oferta: Ofertas ) => {
        this.oferta = oferta
      })
    })
  }

  public adicionarItemCarrinho(oferta: Ofertas):void{
    //enviar com o item do carrinho
    this.carrinhoService.incluirItem(this.oferta)
  }
}