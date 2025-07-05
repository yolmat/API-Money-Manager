import { authenticate } from "../controllers/auth.controller"

const authRoutes = (app) => {
    app.post("/login", authenticate)
}

export default authRoutes