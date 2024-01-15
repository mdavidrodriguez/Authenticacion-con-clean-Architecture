import {
  AuthDataSource,
  AuthRepository,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

// La idea es que se pueda recibir un datasource
// Que sirva como una capa, para poder usar el mismo repositorio en todo el codigo
// y cambiar facilmente un origen de datos.

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    // DI
    private readonly authDataSource: AuthDataSource
  ) {}
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.login(loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }
}
