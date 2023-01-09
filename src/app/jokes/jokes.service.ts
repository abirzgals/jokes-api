import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as R from 'ramda';
import {FlagsInterface, ResponseInterface, TypeInterface} from './jokes.interfaces';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>('https://sv443.net/jokeapi/v2/categories').pipe(
      map((categories: { categories: string[]; }) => categories.categories)
    );
  }

  getLanguages() {
    return this.http.get<any>('https://sv443.net/jokeapi/v2/languages').pipe(
      map(languages => languages?.jokeLanguages)
    );
  }

  getJokes(filters: { [key: string]: string | number }, blacklistFlags: FlagsInterface,category:string[], type:TypeInterface) {
    const selectedFlags = Object.entries(blacklistFlags)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(',');
    let selectedTypes = Object.entries(type)
      .filter(([, value]) => value == true)
      .map(([key]) => key)
      .join(',');

    return this.http.get<ResponseInterface>('https://sv443.net/jokeapi/v2/joke/' + R.join(',', category), {
      params: {
        ...(selectedFlags ? { blacklistFlags: selectedFlags } : {}),
        ...(selectedTypes!=='' && !selectedTypes.includes(",") ? { type: selectedTypes } : {}),
        ...(filters["contains"]!=='' ? { contains: filters["contains"] } : {}),
        ...(filters["lang"]!=='' ? { lang: filters["lang"] } : {}),
        ...(filters["amount"]!==1 ? { amount: filters["amount"] } : {}),
      }
    });
  }
}
