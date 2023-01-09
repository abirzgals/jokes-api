export interface ResponseInterface extends JokeInterface,JokesInterface,ErrorInterface{

}

export interface TypeInterface{
  single:boolean
  twopart:boolean
  [key: string]: boolean;
}
export const defaultType: TypeInterface = {
  single: false,
  twopart: false
};

export interface FlagsInterface{
  nsfw: boolean
  religious: boolean
  political: boolean
  racist: boolean
  sexist: boolean;
  explicit: boolean
  [key: string]: boolean;
}

export interface ErrorInterface{
  error:boolean
  internalError:string
  code:number
  message:string
  causedBy:string[]
  additionalInfo:string
  timestamp:number
}

export interface JokeInterface {
  id:number
  category: number
  delivery?: string
  flags: FlagsInterface
  lang: string
  safe: boolean
  setup?: string
  joke?: string
  type: string
  error:boolean

}

export interface JokesInterface{
  amount: number
  error:boolean
  jokes:JokeInterface[]
}
