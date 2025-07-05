import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const routes = app => {
    userRoutes(app)
    authRoutes(app)
}

export default routes