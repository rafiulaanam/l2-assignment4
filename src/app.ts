import express from "express"
import cors from "cors"
import { CategoryRoutes } from "./app/modules/category/category.route"
import { CourseRoutes } from "./app/modules/course/course.route"
import { ReviewRoutes } from "./app/modules/review/review.route"
import globalErrorHandler from "./app/middlewares/globalErrorhandler"
import notFound from "./app/middlewares/notFound"




const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', CourseRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', ReviewRoutes);


app.get('/', (req, res) => {
  res.send('Server is Running')
})


app.use(globalErrorHandler)
app.use(notFound)

export default app