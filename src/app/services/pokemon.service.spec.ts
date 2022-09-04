import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const dummyUserListResponse = {
    data: [
      {
        id: 1,
        first_name: 'George',
        last_name: 'Bluth',
      },
    ],
  };

  it('getPokemonData() should return data', () => {
    service.getPokemonData(10).subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });

  let urlList = ['https://pokeapi.co/api/v2/pokemon/1/'];

  it('getPokemonDetails() should return data', () => {
    service.getPokemonDetails(urlList).subscribe((res) => {
      expect(res).toEqual([dummyUserListResponse]);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });

  it('getNextPokemonData() should return data', () => {
    service
      .getNextPokemonData(
        'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10'
      )
      .subscribe((res) => {
        expect(res).toEqual(dummyUserListResponse);
      });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });

  it('getPreviousPokemonData() should return data', () => {
    service
      .getPreviousPokemonData(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
      )
      .subscribe((res) => {
        expect(res).toEqual(dummyUserListResponse);
      });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });

  it('getPokemonDataById() should return data', () => {
    service.getPokemonDataById(1).subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });
});
