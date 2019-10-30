import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pedido } from '../shared/pedido-model.service';
import { CarrinhoService } from '../carrinho-service';
import { ItemCarrinho } from '../shared/carrinho-model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  constructor(private ordemCompraService: OrdemCompraService,
              private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    //quando o componente for construido, recupera o item do carrinho e associa ao atributo
    this.itensCarrinho= this.carrinhoService.exibirItens()
  }

  //instancia do objeto FormGroup
  public formulario: FormGroup = new FormGroup({
    //controles (sera conectado com formulario do template)

    //tratativas de validacao (tirando do template), recebem instancia de FormGroup
    'endereco': new FormControl(null, [Validators.required,//preenchimento obrigatorio
                                       Validators.minLength(5),//tamanho minimo de 5 caracteres
                                       Validators.maxLength(100)//tamanho maximo de 100 caracteres
                                    ]),
    'numero': new FormControl(null, [Validators.required,//preenchimento obrigatorio
                                     Validators.minLength(1),//tamanho minimo de 5 caracteres
                                     Validators.maxLength(10)//tamanho maximo de 100 caracteres
   ]),
    'complemento': new FormControl(null),


    'formPagamento': new FormControl(null, [Validators.required])//preenchimento obrigatorio
  })

  //para controle da tela de sucesso ao criar pedido
  public idPedidoCompra: number

  //para mostrar o pedido na tela
  public itensCarrinho: ItemCarrinho[]=[]

  public confirmarCompra(): void {

    if(this.carrinhoService.exibirItens().length === 0){
      alert('Carrinho vazio!')
    }
    else{
      
      let pedido: Pedido = new Pedido(
      //passagem dos parametros modelados
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento,
      this.carrinhoService.exibirItens())

      //passando o pedido dentro do model criado e gravando
      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido: number)=>{
          this.idPedidoCompra = idPedido
          this.carrinhoService.limparCarrinho()//limpar carrinho
        })}
  }
  
  //metodo para controle de aumento da quantidade no (+)
  public adicionar(item: ItemCarrinho):void{
    
    //ponte entre template e servico
    this.carrinhoService.adicionarQuantidade(item)
  }

   //metodo para controle de redução da quantidade no (-)
   public remover(item: ItemCarrinho):void{
    
    //ponte entre template e servico
    this.carrinhoService.removerQuantidade(item)
  }
}