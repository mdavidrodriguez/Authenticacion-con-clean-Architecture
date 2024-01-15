import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  // Es static ya que no voy a realizar inyeccion de dependencias.
  // Evitar crear instancias de la clase
  static get routes(): Router {
    const datasource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);
    const router = Router();
    // Definir todas las rutas principales

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}
