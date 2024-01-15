import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  // Puede ser static ya que no voy a realizar inyeccion de dependencias.
  // Evitar crear instancias de la clase
  static get routes(): Router {
    const router = Router();
    // Definir todas las rutas principales

    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
