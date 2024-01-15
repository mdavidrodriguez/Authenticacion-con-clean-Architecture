import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

// Los datasources son las reglas de definición del juego
// No importa la bd de datos, tiene que tener los metodos descritos,
// Estos reciben un metodo, que debe recibir el Dto y regresar una entidad
export abstract class AuthDataSource {
  // todo:
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
