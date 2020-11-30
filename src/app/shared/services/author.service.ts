import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  URL_AUTHORS = 'http://localhost:3000/authors';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {}

  listAll(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.URL_AUTHORS);
  }

  findById(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${this.URL_AUTHORS}/${id}`);
  }

  add(Author: Author): Observable<Author> {
    return this.httpClient.post<Author>(this.URL_AUTHORS, Author, this.httpOptions);
  }

  update(Author: Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.URL_AUTHORS}/${Author.id}`, Author, this.httpOptions);
  }

  remove(id: number): Observable<object> {
    return this.httpClient.delete<Author>(`${this.URL_AUTHORS}/${id}`);
  }
}
