import mongoose from "mongoose";
import app from "./app"
import config from "./app/config";

const port = 3000



async function main() {
    await mongoose.connect(config.database_url as string);
  
    app.listen(port, () => {
        console.log(` app listening on port ${port}`)
      })
  }
main()