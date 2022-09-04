import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  imgUrl: any;
  @Input() pokemon: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.imgUrl = this.pokemon.sprites.other['official-artwork'].front_default;
  }

  showDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
}
