import { SpyLocation } from '@angular/common/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  const locationStub = {
    back: jasmine.createSpy('back'),
  };
  let location: any;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PokemonDetailsComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 1 })) },
        },
        { provide: Location, useValue: locationStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    location = fixture.debugElement.injector.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It is backClicked() function test', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
