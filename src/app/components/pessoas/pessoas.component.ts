import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl,   FormBuilder, FormGroup, Validator, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Pessoa } from 'src/Models/Pessoa';
import { CadastropService } from 'src/app/services/cadastrop.service';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})

export class PessoasComponent implements OnInit {

  formulario: any;
  tituloFormulario : string;
  pessoasList: Pessoa[];

  visibilidadetabela: boolean = true;
  visibilidadeForm: boolean = false;
  
  constructor (
    public formBuilder : FormBuilder, 
    private router : Router,
    private cadastrop : CadastropService )  { }

  ngOnInit(): void{
    this.cadastrop.TodasPessoas().subscribe(resutado => {
    this.pessoasList = resutado;
    })       
  }

  

  ExibirFormularioCadastro(): void
  {
    this.visibilidadetabela = false;
    this.visibilidadeForm = true;

    this.tituloFormulario = 'Cadastro Pessoa'
    this.formulario = new FormGroup
    ({
        nome: new FormControl(null),
        sobrenome: new FormControl(null),
        idade: new FormControl(null),
        profissao: new FormControl(null)   
    });
  }

  ExibirFormularioAtualizarPessoa(id): void
  {
    this.visibilidadetabela = false;
    this.visibilidadeForm = true;

    
    this.cadastrop.PessoasById(id).subscribe(resultado => {
      this.tituloFormulario = `Atualizar Pessoa Nº  ${resultado.id} -  Nome Completo: "${resultado.nome} ${resultado.sobreNome}"`;

      this.formulario = new FormGroup
    ({
        id: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobreNome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)   
    }); });
  }

  voltar (): void{
    this.visibilidadetabela = true;
    this.visibilidadeForm = false;
  }


  SendForm (): void{
      
    const pessoa : Pessoa = this.formulario.value

      if (pessoa.id > 0)
      {
        this.cadastrop.AtualizarPessoa(pessoa).subscribe(resultadoUpdate =>{
          this.visibilidadeForm = false;
          this.visibilidadetabela = true;
          alert('Atualizado com Sucesso');
          this.cadastrop.TodasPessoas().subscribe(AtualizaLista=>{
          this.pessoasList = AtualizaLista;
          });        
        })
      }
      else
      {

        this.cadastrop.NovaPessoa(pessoa).subscribe(resultado => 
        {

            this.visibilidadeForm = false;
            this.visibilidadetabela = true;
            alert('Registado com Sucesso');
            this.cadastrop.TodasPessoas().subscribe(AtualizaLista=>{
              this.pessoasList = AtualizaLista;
            });   

            
          });
        }
      }

  }
  
  

