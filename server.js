import express from "express";
import dotenv from "dotenv";
import connectDB from './db/index.js';
import cors from "cors";
import UserRouter from './routes/user.routes.js';
import SprintRouter from './routes/sprint.route.js';
import TicketRouter from './routes/ticket.route.js';
import CommentRouter from './routes/comment.route.js';

const app=express();
dotenv.config();

// mongosh "mongodb+srv://attools.r7akj.mongodb.net/" --apiVersion 1 --username anamra


app.use(cors({origin:process.env.CORS_ORIGIN}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/public',express.static('public'));
app.use('/user',UserRouter);
app.use('/sprint',SprintRouter);
app.use('/ticket',TicketRouter);



connectDB().then(()=>{
    
    app.on("error", (error)=>{
        console.log("error!!!", error)
        throw error
    })

    app.listen(process.env.PORT, ()=>{
        console.log("the app is listening on ", process.env.PORT)
    })
 }).catch((err)=>{
    console.log("there was an error while connecting to the DB ", err);
 })