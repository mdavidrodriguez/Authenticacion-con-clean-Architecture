import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
// Aqui es donde se realiza la impl a la bd

type HashFuction = (password: string) => string;
type CompareFuction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFuction = BcryptAdapter.hash,
    private comparePassword: CompareFuction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar si el correo existe
      const exists = await UserModel.findOne({ email: email });
      if (exists) throw CustomError.badRequest("User already exists");

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      // 2.Hash de la contraseña

      await user.save();

      // 3. Mapear la respuesta a nuestra entidad
      // TOdo: falta un maper
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
