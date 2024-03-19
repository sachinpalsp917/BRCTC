import {app} from "./src/app.js";
import "dotenv/config";
import  connectDB  from "./src/db/db.js";



connectDB()
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log("Server running on PORT: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed: ", err);
  });
