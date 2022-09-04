import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.pokemon$ = this.route.paramMap.pipe(
      switchMap((params: any) => {
        let id = params.get('id');
        return this.pokemonService.getPokemonDataById(id);
      })
    );
  }

  goBack() {
    this.location.back();
  }
}
