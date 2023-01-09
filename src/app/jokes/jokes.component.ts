import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {defaultType, FlagsInterface, JokeInterface, TypeInterface} from "./jokes.interfaces";
import { JokesService } from "./jokes.service";

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {

  categories: string[] = [];
  languages: string[] = [];

  blacklistFlags:FlagsInterface = {  nsfw: false, religious: false, political: false, racist: false, sexist: false, explicit: false};
  jokes: JokeInterface[] = [];
  category: string[] = ['Any'];
  type: TypeInterface = defaultType;

  errorMessage: string = '';
  filters = {
    lang: '',
    amount: 1,
    blacklistFlags: '',
    contains:'',
    type:''
  };

  constructor(private http: HttpClient, private jokesService: JokesService) { }

  ngOnInit(): void {
    this.jokesService.getCategories().subscribe(categories => (this.categories = categories));
    this.jokesService.getLanguages().subscribe(languages => (this.languages = languages));
  }

  getJokes(filters: { [key: string]: string | number }) {
    this.jokesService.getJokes(filters, this.blacklistFlags,this.category,this.type).subscribe(response => {
      if (response.error) {
        if ('message' in response) {
          this.errorMessage = response.message;
          return;
        }
      } else {
        this.errorMessage = '';
      }

      if ('jokes' in response) {
        this.jokes = response.jokes;
      } else {
        this.jokes = [response];
      }
    });
  }


}

