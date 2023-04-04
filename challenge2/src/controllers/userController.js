
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { validName, validEmail, validValue,  validPassword } =  require("../validator/validation")
const { isValidObjectId } = require("mongoose")
const NodeCache = require('node-cache');
const axios = require('axios');
//-------------------------------------[ CREATE USER ]---------------------------------------//

const createUser = async function (req, res) {
    try {
      let data = req.body;
  
      if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please give some data" }); }
  
      let { firstname, lastname, email, password } = data;
  
      if (!firstname) { return res.status(400).send({ status: false, message: "FirstName is mandatory" }); }
      if (!lastname) { return res.status(400).send({ status: false, message: "lastName is mandatory" }); }
      if (!email) { return res.status(400).send({ status: false, message: "Email is mandatory" }); }
      if (!password) { return res.status(400).send({ status: false, message: "Password is mandatory" }); }
      
      
      if (!validName(fname.trim())) { return res.status(400).send({ status: false, message: "FirstName should be in alphabets only" }); }
      if (!validName(lname.trim())) { return res.status(400).send({ status: false, message: "LastName should be in alphabets only" }); }
      
      if (!validEmail(email)) { return res.status(400).send({ status: false, message: "Please provide correct email" }); }
      let findEmail = await userModel.findOne({ email });
      if (findEmail) { return res.status(400).send({ status: false, message: "User with this email already exists" }); }
      
      if (!validPassword(password)) { return res.status(400).send({ status: false, message: "Password Should be (8-15) in length with one upperCase, special character and number" }); }
      
      
      //..hashing
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds)
    
      const userData = {
        firstname: firstname, lastname: lastname,  email: email,
        password: hash
      }
      
      const user = await userModel.create(userData);
      return res.status(201).send({ status: true, message: "User created successfully", data: user });
  
    }
    catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }
  
  //----------------------------------------[ LOGIN USER ]-------------------------------------//
  const loginUser = async function (req, res) {
    try {
      let data = req.body
      if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter login details" }); }
  
      const { email, password } = data
  
      if (!email) { return res.status(400).send({ status: false, messsage: "Email is required" }); }
      if (!password) { return res.status(400).send({ status: false, messsage: "Password is required" }); }
      
      if (!validValue(email)) { return res.status(400).send({ status: false, Message: "Please provide email in string format" }); }
      if (!validEmail(email)) { return res.status(400).send({ status: false, message: "Please provide correct email" }); }
  
      if (!validValue(password)) { return res.status(400).send({ status: false, Message: "Please provide password in string format" }); }
      if (!validPassword(password)) { return res.status(400).send({ status: false, message: "Password Should be (8-15) in length with one upperCase, special character and number" }); }
  
  
      const userData = await userModel.findOne({ email: email })
      if (!userData) { return res.status(404).send({ status: false, message: "Email is incorrect" }); }
  
      const comparePassword = await bcrypt.compare(password, userData.password)
      if (!comparePassword) { return res.status(401).send({ status: false, msg: "Password is incorrect" }); }
  
      const token = jwt.sign({ userId: userData._id }, "secertKey", { expiresIn: "5h" } )
  
      return res.status(200).send({ status: true, message: "User login successfull", data: { userId: userData._id, token: token } })
    }
    catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
  }

//-----------------------------------------[ GET USER ]---------------------------------------------//

const getUser = async function (req, res) {
    try {
      const userId = req.params.userId;
  
      if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please provide a valid user id" }); }
  
      let userData = await userModel.findOne({ _id: userId })
  
      if (!userData) { return res.status(404).send({ status: false, message: "User not found" }); }
  
      return res.status(200).send({ status: true, message: "User profile details", data: userData });
  
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
  }


  const weather = async (req, res) => {
    const city = req.params.city;
  
    const cachedWeather = cache.get(city);
    if (cachedWeather) {
      console.log(`Retrieving weather information for ${city} from cache`);
      return res.json(cachedWeather);
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=<your-api-key>&units=metric`;
    try {
      const response = await axios.get(url);
      const weather = {
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      };
  
      cache.set(city, weather);
      console.log(`Retrieving weather information for ${city} from API`);
      return res.json(weather);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving weather information' });
    }
  };
  module.exports = {createUser,loginUser,getUser,weather}
  