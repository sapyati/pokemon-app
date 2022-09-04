import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonData(limit: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  }

  getPokemonDetails(urlList: any) {
    urlList = urlList.map((url: any) => this.http.get<any>(url));
    return forkJoin(urlList);
  }

  getNextPokemonData(url: any) {
    return this.http.get<any>(url);
  }

  getPreviousPokemonData(url: any) {
    return this.http.get<any>(url);
  }

  getPokemonDataById(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
