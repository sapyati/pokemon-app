import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  searchOptions: any[] = ['Name', 'Abilities'];
  sortByOptions: any[] = ['Name', 'Height', 'Weight'];
  pokemons: any[] = [];
  sizeOptions: number[] = [10, 20, 50];
  limit: number = 10;
  nextUrl: any;
  prevUrl: any;
  sortOrder: string = '';
  sortKey: string = '';
  searchKey: string = 'Name';
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  private getPokemonList() {
    this.subs.sink = this.pokemonService.getPokemonData(this.limit).subscribe({
      next: (response: any) => {
        this.nextUrl = response.next;
        this.prevUrl = response.previous;
        this.getPokemonDetails(
          response.results.map((response: any) => response.url)
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private getPokemonDetails(urlList: any) {
    this.subs.sink = this.pokemonService.getPokemonDetails(urlList).subscribe({
      next: (response: any) => {
        this.pokemons = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getNextPokemons() {
    this.pokemons = [];
    this.subs.sink = this.pokemonService
      .getNextPokemonData(this.nextUrl)
      .subscribe({
        next: (response: any) => {
          this.nextUrl = response.next;
          this.prevUrl = response.previous;
          this.getPokemonDetails(
            response.results.map((response: any) => response.url)
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getPrevPokemons() {
    this.pokemons = [];
    this.subs.sink = this.pokemonService
      .getPreviousPokemonData(this.prevUrl)
      .subscribe({
        next: (response: any) => {
          this.nextUrl = response.next;
          this.prevUrl = response.previous;
          this.getPokemonDetails(
            response.results.map((response: any) => response.url)
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handlePageSize(event: any) {
    this.limit = event.target.value;
    this.getPokemonList();
  }

  handleSearchBy(event: any) {
    this.searchKey = event.target.value;
    console.log(this.searchKey);
  }

  sortByName() {
    if (!this.sortOrder || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = 'desc';
    }
    this.sortKey = 'name';
  }

  sortByHeight() {
    if (!this.sortOrder || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = 'desc';
    }
    this.sortKey = 'height';
  }

  sortByWeight() {
    if (!this.sortOrder || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = 'desc';
    }
    this.sortKey = 'weight';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
