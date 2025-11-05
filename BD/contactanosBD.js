// BD/contactanosBD.js
import Contactanos from "../models/contactanos.js"


export async function contactanosNuevo({nombre, edad}){
  try{
    const contactanosObj = new Contactanos({nombre, edad})
    console.log("---------------")
    console.log(contactanosObj)
    console.log("---------------")
    const respuestaMongo = await contactanosObj.save()
    console.log("El registro en Mongo fue guardado")
  }
  catch(err){
    console.log("Error"+err)
    throw err
  }
}
export async function mostrarContactos(){
  try{
    const contactosMongo = await Contactanos.find()
    
    return contactosMongo
  }
  catch(err){
    console.log("Error" + err)
  }
}



//buscador
export async function buscarNombre(nombre){
  const contactosMongo = await Contactanos.find({nombre})
  return contactosMongo
}

export async function buscarId(id){
  const contactoMongo = await Contactanos.findById(id)
  return contactoMongo
}

export async function editarContacto({id, nombre, edad}){
  
  const respuesta = await Contactanos.findByIdAndUpdate(id, {nombre, edad})
  return respuesta
}

export async function borrarContacto(id){
  const respuesta = await Contactanos.findByIdAndDelete(id)
  return respuesta
}