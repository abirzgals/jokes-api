import {Component, Input} from '@angular/core';
import {JokeInterface} from "../../jokes.interfaces";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent {

  @Input() joke: JokeInterface = {category: 0, error: false, flags:{nsfw:false,religious:false,political:false,racist:false,sexist:false,explicit:false,}, id: 0, lang: "", safe: false, type: ""};
  blacklistFlags: { [key: string]: boolean } = {};
  ngOnChanges() {
    this.blacklistFlags = Object.assign({}, this.joke.flags);
  }
}
