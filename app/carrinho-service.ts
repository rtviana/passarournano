import { Injectable } from '@angular/core';
import { ItemCarrinho } from './shared/carrinho-model';
import { Ofertas } from './shared/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  //atributos
  public itens: ItemCarrinho[]=[]

  //metodo exibir itens
  public exibirItens(): ItemCarrinho[]{
    return this.itens
  }

  //recebe uma oferta
  public incluirItem(oferta: Ofertas):void{

    //instancia de um item de carrinho populado com oferta
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
      //atributos
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    )
    //verificar se o item ja nao existe no pedido, incrementando a quantidade ao inves do array
    
    //find: percorre cada um dos indices efetuando comparações
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
      
      //comparacao
      if(itemCarrinhoEncontrado){
        //se ja existe, vamos recuperar a referencia dentro do array e atualizar a quantidade
        itemCarrinhoEncontrado.quantidade +=1//inclusao na quantidade
      } else{
          //se nenhuma referencia for encontrada
          this.itens.push(itemCarrinho)//adicionar itens no array
        }
  }

  //metodo para calculo do total
  public totalCarrinhoCompras(): number{
  
    let total: number = 0

    //percorrer cada um dos itens do carrinho
    this.itens.map((item: ItemCarrinho) => {
    
      //incremento do total
      total = total + (item.valor * item.quantidade)
      
  })
   return total
  }

  //controle de aumento da quantidade
  public adicionarQuantidade(itemCarrinho: ItemCarrinho):void{
        
    //recupera-se o id do item para acrescentar uma quantidade do mesmo
    let ItemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

      if(ItemCarrinhoEncontrado){
        ItemCarrinhoEncontrado.quantidade += 1
    }
  }

  //controle de aumento da quantidade
  public removerQuantidade(itemCarrinho: ItemCarrinho):void{
        
    //recupera-se o id do item para acrescentar uma quantidade do mesmo
    let ItemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

      if(ItemCarrinhoEncontrado){
        ItemCarrinhoEncontrado.quantidade -= 1
          if(ItemCarrinhoEncontrado.quantidade === 0){//garantindo que o carrinho nao tera itens zerados ou negativos
            this.itens.splice(this.itens.indexOf(ItemCarrinhoEncontrado), 1)//com base no indice, recortar o mesmo e devolve para uma variavel, vai remover a primeira referencia
          }
    }
  }

  //limpar carrinho
  public limparCarrinho(): void{
    this.itens = []
  }
}