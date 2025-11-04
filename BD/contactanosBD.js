// BD/contactanosBD.js
import Contactanos from "../models/contactanos.js";

export async function contactanosNuevo(data) {
  try {
    if (!data) throw new Error("No se recibieron datos para guardar");
    const edadNum = data.edad ? Number(data.edad) : undefined;

    const contactanosObj = new Contactanos({
      nombre: data.nombre,
      edad: edadNum
    });

    console.log("Objeto a guardar:", contactanosObj);

    const respuestaMongo = await contactanosObj.save();
    console.log("El registro en Mongo fue guardado:", respuestaMongo);
    return respuestaMongo;
  } catch (err) {
    console.log("Error en contactanosNuevo: " + err);
    throw err;
  }
}

export async function mostrarContactos() {
  try {
    const contactosMongo = await Contactanos.find();
    return contactosMongo;
  } catch (err) {
    console.log("Error en mostrarContactos: " + err);
    throw err;
  }
}

export async function buscarNombre(nombre) {
  try {
    // búsqueda case-insensitive por nombre (parcial)
    const contactosMongo = await Contactanos.find({ nombre: new RegExp(nombre, "i") });
    return contactosMongo;
  } catch (err) {
    console.log("Error en buscarNombre: " + err);
    throw err;
  }
}

export async function buscarId(id) {
  try {
    const contactoMongo = await Contactanos.findById(id);
    return contactoMongo;
  } catch (err) {
    console.log("Error en buscarId: " + err);
    throw err;
  }
}

export async function editarContacto({ id, nombre, edad }) {
  try {
    const edadNum = edad !== undefined ? Number(edad) : undefined;
    const respuesta = await Contactanos.findByIdAndUpdate(
      id,
      { nombre, edad: edadNum },
      { new: true } // devuelve el documento actualizado
    );
    return respuesta;
  } catch (err) {
    console.log("Error en editarContacto: " + err);
    throw err;
  }
}

export async function borrarContacto(id) {
  try {
    const respuesta = await Contactanos.findByIdAndDelete(id);
    return respuesta;
  } catch (err) {
    console.log("Error en borrarContacto: " + err);
    throw err;
  }
}
