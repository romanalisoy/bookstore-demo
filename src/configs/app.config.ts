import express, {Application} from "express";
import router from "../routes/book.route";
import cors from "cors";
import bodyParser from "body-parser";
import {httpError} from "../exceptions/http.exception";

const server: Application = express();

server.use((err, req, res, next) => {
    console.log(err)
    if (err instanceof httpError) {
        return res.status(err.code).json({
            status: false,
            error: err.message
        });
    }
    next();
});

// cors handler
server.use(cors({
    origin: '*',
    methods: "*",
    allowedHeaders: '*',
    exposedHeaders: '*',
}));

// body parser
server.use(express.json());
server.use(bodyParser.json({limit: '150mb'}));
server.use(bodyParser.urlencoded({extended: true, limit: '150mb'}));



// Load routes
server.use('/api', router);


export default server;