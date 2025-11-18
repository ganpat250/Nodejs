import app from "./src/app.js";

const PORT = process.env.PORT || 8080;
app.listen(PORT,(error)=>{
    if(error){
        return console.log(`❌Error running on port:${PORT}❌`);
    }
    console.log(`✅Application is running on port:${PORT}✅`);
});
