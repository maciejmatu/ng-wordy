import * as express from "express";

export class Server {
	public app: express.Application;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		//create expressjs application
		this.app = express();

		this.config();
	}

	public config() {
		let port = process.env.PORT || 3000;

		this.app.listen(port, _ => console.log('SERVER STARTED @'+port));
	}

}

Server.bootstrap();