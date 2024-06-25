import express, {Application} from "express";
import bookRoutes from "../routes/book.route";
import authRoutes from "../routes/auth.route";
import cors from "cors";
import bodyParser from "body-parser";

const server: Application = express();

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
server.use('/api', bookRoutes);
server.use('/api', authRoutes);

server.use("*",(req, res, next) => {
    res.status(404).json({
        status: false,
        error: "Route not found"
    });
});

server.use((err, req, res, next) => {
    console.log("Error handler--------------------------------------------")

    res.status(500).json({
        status: false,
        error: "httpError.INTERNAL_SERVER_ERROR"
    });
});


export default server;