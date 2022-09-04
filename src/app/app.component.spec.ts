import { HeaderComponent } from './components/header/header.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('AppComponent', () => {
  const fakeActivatedRoute = {
    snapshot: {
      queryParams: {
        returnUrl: '/',
      },
    },
  };
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
