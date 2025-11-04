import { Router } from "express";
import {
  contactanosNuevo,
  mostrarContactos,
  buscarNombre,
  buscarId,
  editarContacto,
  borrarContacto
} from "../BD/contactanosBD.js";

const router = Router();

router.get("/", (req, res) => {
  var nombre = "Mickey Mouse";
  var grupo = "DS01SM-24";
  var desayunos = ["Queso", "Nueces", "Cereal", "Mango"];
  res.render("index", { nombre, grupo, desayunos });
});

router.get("/abc/:nombre/", (req, res) => {
  var nombre = req.params.nombre;
  console.log(nombre);
  res.send("otro");
});

router.get("/contactanos", (req, res) => {
  res.render("contactanos");
});

router.post("/contactanos", async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    console.log("req.body =", req.body);
    console.log("Nombre: " + nombre + " Edad:" + edad);

    const doc = await contactanosNuevo({ nombre, edad });
    res.render("recibeDatos_Formulario", { nombre: doc.nombre, edad: doc.edad });
  } catch (err) {
    console.error("Error en POST /contactanos:", err);
    res.status(500).send("Error al guardar contacto");
  }
});

router.get("/mostrarContactos", async (req, res) => {
  try {
    const contactosMongo = await mostrarContactos();
    res.render("mostrarContactos", { contactosMongo });
  } catch (err) {
    console.error("Error en GET /mostrarContactos:", err);
    res.status(500).send("Error obteniendo contactos");
  }
});

router.post("/buscar", async (req, res) => {
  try {
    const buscar = req.body.buscar;
    const contactosMongo = await buscarNombre(buscar);
    console.log(contactosMongo);
    res.render("mostrarContactos", { contactosMongo });
  } catch (err) {
    console.error("Error en POST /buscar:", err);
    res.status(500).send("Error buscando contactos");
  }
});

router.get("/editarContacto/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contactoMongo = await buscarId(id);
    if (!contactoMongo) return res.status(404).send("Contacto no encontrado");
    res.render("editarContacto", { contactoMongo });
  } catch (err) {
    console.error("Error en GET /editarContacto/:id:", err);
    res.status(500).send("Error obteniendo contacto");
  }
});

router.post("/editarContacto", async (req, res) => {
  try {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const respuesta = await editarContacto({ id, nombre, edad });
    console.log("Respuesta editar:", respuesta);
    res.redirect("/mostrarContactos");
  } catch (err) {
    console.error("Error en POST /editarContacto:", err);
    res.status(500).send("Error editando contacto");
  }
});

router.get("/borrarContacto/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const respuesta = await borrarContacto(id);
    console.log("Borrado:", respuesta);
    res.redirect("/mostrarContactos");
  } catch (err) {
    console.error("Error en GET /borrarContacto/:id:", err);
    res.status(500).send("Error borrando contacto");
  }
});

export default router;
