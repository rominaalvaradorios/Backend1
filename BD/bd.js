
import mongoose from "mongoose"
import 'dotenv/config'

export async function conectarBD(){
	try{
		//const conexion = await mongoose.connect("mongodb+srv://rominaarti24_db_user:230333R0m1na@cluster0.eya1ny8.mongodb.net/?retryWrites=true&w=majority&appName=backend1")
		const conexion = await mongoose.connect(process.env.SECRET_MONGO)
	
	    console.log("conexión establecida con mongo atlas");
	}
	catch(err){
		console.log("Error " + err)
	}
}


//export default conectarBD
//conectarBD()