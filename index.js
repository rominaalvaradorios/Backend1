import express from "express"
import ejs from "ejs"
import rutas from "./rutas/rutas.js"
import {conectarBD} from "./BD/bd.js"

async function conexionBD(){
	await conectarBD();
}

const app = express();
conectarBD();
app.use(express.urlencoded({extended:true})) //cuando se ocupan formularios
app.set("view engine", "ejs") 
app.use("/", rutas);
app.use((req,res,next) => {
	res.status(404).render("404")
})

const PORT = process.env.PORT  || 3000 //process.env.PORT se queda igual siempre
app.listen(3000, function(){
	console.log("Servidor en http://localhost:" + PORT)
});