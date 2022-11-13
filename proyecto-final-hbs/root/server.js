const app = require("./app");
const envConfig = require("./utils/config");
const PORT = process.env.PORT || 8080;




const ASYNC_DATASOURCE = {
  mongo: require('./models/containers/mongo.container'),
};

app.listen(PORT, () => {
    
    if (Object.keys(ASYNC_DATASOURCE).includes(envConfig.DATASOURCE || '' )){
      ASYNC_DATASOURCE[envConfig.DATASOURCE].connect().then(()=>{
        console.log("Connected to " + envConfig.DATASOURCE);
      })
    }
    console.log(`Server is up and running on port: `, PORT);
});
