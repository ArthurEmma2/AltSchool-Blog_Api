const supertest = require("supertest");
const { connectDb, closeDb } = require("./db");
const { userRegData, incorrectRegData, userLoginData } = require("./mockData");
const app = require("../app");
