import { Injectable } from '@angular/core'
import { Ofertas } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

//decoracao da classe de ofertas
@Injectable()
export class OfertasService {

	//api para tratatida das urls, tornado o projeto menos verboso
	constructor(private http: HttpClient) {}

	public getOfertas(): Promise < Ofertas[] > { //efetuar uma requisição http via verbo http(metodo)   

		//consumo do serviço, a API Rest (Fake) precisa estar em execução para busca de sua referencia
		return this.http.get(`${URL_API}/ofertas?destaque=true`) //retornar um promise Oferta[]
			.toPromise() //converter o observable para promise (temporario)
			.then((resposta: any) => resposta) //recupera o parametro resolvido
	}

	public getOfertasPorCategoria(categoria: string): Promise < Ofertas[] > {
		//requisicoes com respostas tratadas
		//onde os dados serao consumidos via http
		return this.http.get < Ofertas[] > (`${URL_API}/ofertas?categoria=${categoria}`)
			.toPromise()
			.then((resposta) => resposta)
	}

	public getOfertasPorDiversao(categoria: string): Promise < Ofertas[] > {
		return this.http.get < Ofertas[] > (`${URL_API}/ofertas?categoria=${categoria}`)
			.toPromise()
			.then((resposta) => resposta)
	}

	public getOfertaPorId(id: number): Promise < Ofertas > {
		return this.http.get < Ofertas[] > (`${URL_API}/ofertas?id=${id}`)
			.toPromise()
			.then((resposta) => {
				return resposta[0]
			})
	}

	public getComoUsarOfertaPorID(id: number): Promise < string > {
		return this.http.get(`${URL_API}/como-usar?id=${id}`).toPromise()
			.then((resposta) => {
				return resposta[0].descricao
			})
	}

	public getOndeFicaOfertaPorID(id: number): Promise < string > {
		return this.http.get(`${URL_API}/onde-fica?id=${id}`).toPromise()
			.then((resposta) => {
				return resposta[0].descricao
			})
	}

	//metodo pesquisa ofertas
	public pesquisaOferta(termo: string): Observable < Ofertas[] > {
        //retorna todos os dados da requisicao (headers, body, entre outros)
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            //mecanismo de transformacao dos dados (map / rxjs)
            .pipe(map((resposta: any) => resposta)) //transforma o objeto num response, extraindo somente o conteudo do body
			.pipe(retry(5)) //limitar a quantidade de tentativas de reiniciar a stream
	}
}