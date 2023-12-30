import express from "express"
import cors from "cors"
import { CategoryRoutes } from "./app/modules/category/category.route"

import { ReviewRoutes } from "./app/modules/review/review.route"
import globalErrorHandler from "./app/middlewares/globalErrorhandler"
import notFound from "./app/middlewares/notFound"
import { UserRoutes } from "./app/modules/user/user.route"
import { AuthRoutes } from "./app/modules/auth/auth.route"
import { CourseRoutes } from "./app/modules/course/course.route"




const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', UserRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', CourseRoutes);
app.use('/api', ReviewRoutes);
app.use('/api/auth', AuthRoutes);


app.get('/', (req, res) => {
  res.send('Server is Running')
})


app.use(globalErrorHandler)
app.use(notFound)

export default app