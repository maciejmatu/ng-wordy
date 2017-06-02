import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

const mongoose = require('mongoose');
const config = require('./config/main');
const api = require('./routes/api');
const DIST = '../../client/dist';
const INDEX = '/index.html';

export class Server {
	public app: express.Application;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {
		//create expressjs application
		this.app = express();

		//configure application
		this.config();

		//add routes
		this.routes();

		//add api
		this.api();
	}

	/**
	 * Create REST API routes
	 *
	 * @class Server
	 * @method api
	 */
	public api() {
		// Set our api routes
		this.app.use('/api', api);

		// Catch all other routes and return the index file
		this.app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, DIST + INDEX));
		});
	}

	/**
	 * Configure application
	 *
	 * @class Server
	 * @method config
	 */
	public config() {
		/* DATABASE */
		mongoose.connect(config.database);

		// Parsers for POST data
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: false}));

		this.app.use(express.static(path.join(__dirname, DIST)));

		let port = config.port;
		this.app.set('port', port);
		this.app.listen(port, _ => console.log(`API running on localhost:${port}`));
	}

	/**
	 * Create router
	 *
	 * @class Server
	 * @method api
	 */
	public routes() {

	}

}

Server.bootstrap();