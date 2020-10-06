  export interface UserService{
    findOne(data: HeroById, metadata: any):Hero
  }
  export  interface HeroById{
    id:number
  }
  export interface Hero{
    id:number
    name:string
  }
