import { Routes } from '@angular/router'
import { RestaurantesComponent } from './app/restaurantes/restaurantes.component';
import { DiversaoComponent } from './app/diversao/diversao.component';
import { HomeComponent } from './app/home/home.component';
import { OfertaComponent } from './app/oferta/oferta.component';
import { ComoUsarComponent } from './app/oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './app/oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './app/ordem-compra/ordem-compra.component';

//A constante exportada será responsável por conter o mapa dos paths e seus respectivos componentes através dos objetos literais encaminhados
export const ROUTES : Routes = [
    {path: '', component: HomeComponent},//caminho padrao
    {path: 'restaurantes', component: RestaurantesComponent},
    {path: 'diversao', component: DiversaoComponent},
    {path: 'oferta', component: HomeComponent},
    {path: 'oferta/:id', component: OfertaComponent, children: [//path com a passagem de um parametro
        {path: '', component: ComoUsarComponent},
        {path: 'como-usar', component: ComoUsarComponent},
        {path: 'onde-fica', component: OndeFicaComponent}
]},
    {path: 'ordem-compra', component: OrdemCompraComponent}
]