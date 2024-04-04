import Hello from './hello.js'
import Lab5 from './Lab5.js'
import express from 'express'
import cors from 'cors'
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
const app = express()
app.use(cors())
app.use(express.json())
Hello(app)
Lab5(app)
CourseRoutes(app)
ModuleRoutes(app)
app.listen(process.env.PORT || 400)
console.log("Server is running on port 4000")