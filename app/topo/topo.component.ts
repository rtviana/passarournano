import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Ofertas } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
	selector: 'app-topo',
	templateUrl: './topo.component.html',
	styleUrls: ['./topo.component.css'],
	providers: [OfertasService]
})
export class TopoComponent implements OnInit {

	public ofertas: Observable < Ofertas[] >	
	private subjectPesquisa: Subject < string > = new Subject < string > () //recebe o termo da pesquisa e encaminhar ao Observable (que de fato vai efetuar a pesquisa)

	constructor(private ofertasService: OfertasService) {}

	ngOnInit() {
		this.ofertas = this.subjectPesquisa
			.pipe(
				distinctUntilChanged(),
				debounceTime(1000), // executa a ação depois do tempo passado
				switchMap((termo: string) => { //conforme novos observables forem criados, os anteriores serao descartados       

					if (termo.trim() === '') { // trim elimina os espacos em branco e verifica se esta vazio
						return of < Ofertas[] > ([]); //retorno do array de ofertas vazio
					}
					return this.ofertasService.pesquisaOferta(termo)
				}),
				catchError((erro) => { //tratativa de erro
					console.log('Apresentado erro: ', erro)
					return of([]) //return de uma array vazio em caso de erro
				})
			)
		}

	//capturar a digitacao do campo
	public pesquisa(termoDaPesquisa: string): void {		
		this.subjectPesquisa.next(termoDaPesquisa) //sempre que tiver um novo termo de busca, sera enviado ao subject
	}

	public limpaPesquisa(): void{
		this.subjectPesquisa.next('')//qdo o link da pesquisa for clicado, pesquisa sera zerada, pois recebe um array vazio
	}
}