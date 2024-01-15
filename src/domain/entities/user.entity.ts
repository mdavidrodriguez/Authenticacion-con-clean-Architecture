// La entidades son parecidas a los datos de la base de datos.
// Es decir la informacion que debe contener los bd.
export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string
  ) {}
}
