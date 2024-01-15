import {
  AuthDataSource,
  AuthRepository,
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

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }
}
