import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/Models/Pessoa';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CadastropService {
  url = 'http://localhost:5276/Pessoas';

  constructor(private http: HttpClient) {}

  TodasPessoas(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.url)
  }

  PessoasById(pessoaId: number): Observable<Pessoa>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  NovaPessoa(pessoa: Pessoa) : Observable<any>{
    return this.http.post<Pessoa>(this.url, pessoa );
  }

  AtualizarPessoa(pessoa: Pessoa) : Observable<any>{
    return this.http.put<Pessoa>(this.url, pessoa)
  }

  ExluirPessoa(pessoaId: number) :Observable<any>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.delete<number>(apiUrl);
  }


}
