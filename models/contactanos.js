import mongoose from "mongoose"; //clase

const contactanosSchema = new mongoose.Schema({
	nombre:{
		type:String,
		required: true,
		trim: true,
		unique: false,
	}, //coma para otro atributo
	edad:{
		type: Number,
		required: true,
		trim: true,
		unique: false,

	},

})

export default mongoose.model("contactanos", contactanosSchema)