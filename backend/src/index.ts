import express, { urlencoded } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import api from "./api";
import { API_PORT } from "./utils/constants";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

class App {
	app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.middleware();
		this.route();
	}

	private config() {
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		// TODO : DB CONFIG
		const connect = mongoose.connect(
			"mongodb://localhost:27017/admin", // windows
			//"mongodb://mongo/admin",
			{
				useNewUrlParser: true,
				user: "root",
				pass: "root",
				dbName: "abaotest"
			},
			() => {
				console.log("DB CONNECTED");
			}
		);
		mongoose.connection.on("error", (err) => {
			console.log(err);
		});
	}

	private middleware() {
		// TODO : CORS
		this.app.use(cors());
		this.app.use(
			"/docs",
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument)
		);
	}

	private route() {
		this.app.use("/", api);
	}
}

const { app } = new App();

app.listen(API_PORT, () => {
	console.log(`LISTEN ON PORT ${API_PORT}`);
});
