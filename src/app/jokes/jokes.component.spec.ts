import { async, TestBed } from '@angular/core/testing';
import { JokesComponent } from './jokes.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import 'jest';
import {of} from "rxjs";
import 'zone.js/dist/zone';
import {JokesService} from "./jokes.service";
import {defaultType, FlagsInterface, JokeInterface} from "./jokes.interfaces";

describe('JokesComponent', () => {
  let component: JokesComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [JokesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(JokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of jokes', () => {
    expect(component.jokes).toBeDefined();
    expect(Array.isArray(component.jokes)).toBe(true);
  });

  it('should have a list of categories', () => {
    expect(component.categories).toBeDefined();
    expect(Array.isArray(component.categories)).toBe(true);
  });

  it('should have a list of languages', () => {
    expect(component.languages).toBeDefined();
    expect(Array.isArray(component.languages)).toBe(true);
  });

  it('should have filters object', () => {
    expect(component.filters).toBeDefined();
    expect(typeof component.filters).toBe('object');
  });

  it('should have a method to get jokes', () => {
    expect(component.getJokes).toBeDefined();
    expect(typeof component.getJokes).toBe('function');
  });

  it('should retrieve jokes from the server', () => {
    const httpClientSpy = jest.spyOn(component['http'], 'get');
    component.getJokes({});
    expect(httpClientSpy).toHaveBeenCalledWith('https://sv443.net/jokeapi/v2/joke/Any', {"params": {}});
  });


  it('should display jokes from the server', () => {
    const jokeResponse = [
      { setup: 'Why are Assembly programmers always soaking wet?', delivery: 'They work below C-level.' },
      { setup: 'Two peanuts were walking.', delivery: 'One was assaulted.' }
    ];
    const httpClientSpy = jest.spyOn(component['http'], 'get').mockReturnValue(of(jokeResponse));
    component.getJokes({});
    expect(component.jokes).toEqual([jokeResponse]);
  });

  it('should set error message on error in response', () => {
    const jokeResponse = { error: true, message:'No matching joke found'};
    const httpClientSpy = jest.spyOn(component['http'], 'get').mockReturnValue(of(jokeResponse));
    component.getJokes({});
    expect(component.errorMessage).toEqual('No matching joke found');
  });

});




describe('JokesService', () => {
  let service: JokesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });
    service = TestBed.inject(JokesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get categories', () => {
    const categories = ['Misc', 'Programming'];
    service.getCategories().subscribe(result => {
      expect(result).toEqual(categories);
    });

    const req = httpMock.expectOne('https://sv443.net/jokeapi/v2/categories');
    expect(req.request.method).toBe('GET');
    req.flush({ categories });
  });


  it('should get languages', () => {
    const languages = ['en', 'es'];
    service.getLanguages().subscribe(result => {
      expect(result).toEqual(languages);
    });

    const req = httpMock.expectOne('https://sv443.net/jokeapi/v2/languages');
    expect(req.request.method).toBe('GET');
    req.flush({ jokeLanguages: languages });
  });

  it('should get jokes', () => {
    const filters = { lang: 'en', amount: 1, flags: '', contains: '' };
    const flags: FlagsInterface = {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false
    };
    const category = ['Any'];
    const joke: JokeInterface = {
      category: 0,
      error: false,
      flags: flags,
      lang: "",
      safe: false,
      id: 35,
      type: 'single',
      joke: 'There are only 10 kinds of people in this world: those who know binary and those who don\'t.'
    };
    const type = defaultType;
    service.getJokes(filters, flags, category, type).subscribe(result => {
      expect(result).toEqual({ joke });
    });
    const req = httpMock.expectOne('https://sv443.net/jokeapi/v2/joke/Any?lang=en');
    expect(req.request.method).toBe('GET');
    req.flush({ joke });
  });

})
