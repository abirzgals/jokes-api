import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeComponent } from './joke.component';
import {JokeInterface} from "../../jokes.interfaces";

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update flags when joke is updated', () => {
    const joke: JokeInterface = {
      category: 0,
      error: false,
      flags: { nsfw: false, religious: false, political: false, racist: false, sexist: false, explicit: false },
      id: 0,
      lang: "",
      safe: false,
      type: ""
    };
    component.joke = joke;
    component.ngOnChanges() //Not called!!! why?
    expect(component.blacklistFlags).toEqual(Object.assign({}, joke.flags));

    //spyOn(component, 'ngOnChanges').and.callThrough(); // method ngOnChanges() should be called by itself.
    const updatedJoke: JokeInterface = {
      ...joke,
      flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: false },
    };
    component.joke = updatedJoke;
    component.ngOnChanges()
    //expect(component.ngOnChanges).toHaveBeenCalled(); // method ngOnChanges() should be called by itself.
    expect(component.blacklistFlags).toEqual(Object.assign({}, updatedJoke.flags));
  });


});
