import {Router} from "express"
import {contactanosNuevo, mostrarContactos, buscarNombre, buscarId, editarContacto, borrarContacto} from "../bd/contactanosBD.js"
const router = Router()

router.get("/", (req,res)=>{
    var nombre="Mickey Mouse"
    var grupo = "DS01SM-24"
    var desayunos=["Queso","Nueces", "Cereal", "Mango"]
    res.render("index", {nombre,grupo,desayunos})
})

router.get("/abc/:nombre",(req,res)=>{
    var nombre = req.params.nombre
    console.log(nombre)
    res.render("otro")
})

router.get("/contactanos",(req,res)=>{
    res.render("contactanos")
})

//envio del formulario
router.post("/contactanos",(req,res)=>{
    var nombre = req.body.nombre //
    var edad = req.body.edad
    console.log("Nombre: "+nombre+ " Edad: " +edad)
    contactanosNuevo(req.body)

    res.redirect("/mostrarContactos")
})

router.get("/mostrarContactos", async (req,res)=> {
    const contactosMongo = await mostrarContactos();

    res.render("mostrarContactos", {contactosMongo})
})

//metodo del buscador
router.post("/buscar", async (req,res) => {
    const buscar = req.body.buscar 
    const contactosMongo = await buscarNombre(buscar)
    console.log(contactosMongo)
    res.render("mostrarContactos", {contactosMongo})
})


router.get("/editarContacto/:id", async (req, res) => {
    const id = req.params.id 
    const contactoMongo = await buscarId(id)
    res.render("editarContacto", {contactoMongo})
})

router.post("/editarContacto", async(req, res)=>{
    const id = req.body.id
    const nombre = req.body.buscarNombre
    const edad = req.body.edad 
    const respuesta = await editarContacto(req.body)
    console.log(respuesta)
    res.redirect("/mostrarContactos")
})

router.get("/borraContacto/:id", async(req, res) =>{
    const id = req.params.id
    const respuesta = await borrarContacto(id)
    res.redirect("/mostrarContactos")
})





export default router
