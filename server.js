require('dotenv').config()

const express = require('express');
const morgan = require('morgan')
const mongo = require('mongodb').MongoClient 

const getEnv = () => {
  const keys = ["APP_HOST", "APP_PROTOCOL","PORT","ATLAS_URL","MONGO_URI","GOOGLE_CLIENT_ID","GOOGLE_CLIENT_SECRET","GOOGLE_CALLBACK",]
  let res = {}
  keys.forEach( key => {
    res[key] = process.env[key]
  })
  return res
}

console.log(getEnv())

const app = express();

app.use(morgan('combined'))

app.use('/', async(req, res) => {
	let client = await mongo.connect(process.env.ATLAS_URL, {
	    useNewUrlParser: true,
	    useUnifiedTopology: true
	 })
	
	let result = await	client
						.db("sparrow-dev")
						.collection("app-grant")
						.aggregate([{$match:{}}])
						.toArray()
	res.send(result)					
})

app.listen(process.env.PORT, () => {
  console.log(`Service starts on port ${process.env.PORT}`);
});



