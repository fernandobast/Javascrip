const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")
const Carrito = []

const Productos = [
    {
        imagen: "./img/ryzen5.jpg",
        titulo: "Procesador AMD RYZEN 5 3600 4.2GHz Turbo AM4 Wraith Stealth Cooler",
        precio: 130000,
        boton: "Comprar"
    },
    {
        imagen: "./img/ryzen3.jpg",
        titulo: "Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler",
        precio: 85000,
        boton: "Comprar"
    },
    {
        imagen: "./img/ryzen71.jpg",
        titulo: "Procesador AMD Ryzen 7 5700G 4.6GHz Turbo + Wraith Stealth Cooler",
        precio: 260000,
        boton: "Comprar"
    },
    {
        imagen: "./img/ryzen72.jpg",
        titulo: "Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5 - No incluye Cooler - C/VIDEO",
        precio: 465000,
        boton: "Comprar"
    },
    {
        imagen: "./img/ryzen91.jpg",
        titulo: "Procesador AMD Ryzen 9 7950X 5.7GHz AM5 - No incluye Cooler - C/Video",
        precio: 755000,
        boton: "Comprar"
    },
    {
        imagen: "./img/ryzen92.jpg",
        titulo: "Procesador AMD Ryzen 9 7950X3D 5.7GHz AM5 - No incluye Cooler -",
        precio: 892000,
        boton: "Comprar"
     }
]

const agregadoraAlCarrito = (titulo, precio) => {
    const booleano = Carrito.some(el =>{
        return el.titulo === titulo
    })
    if(booleano){
        const productos = Carrito.find(el=> {
            return el.titulo === titulo
        })
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        })
    }
}




const creadoraDeCards = (titulo, imagen, precio, boton) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const imagenDOM = document.createElement("img")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")
    
    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    imagenDOM.classList.add("imagen")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    imagenDOM.src = imagen
    botonDOM.innerText = "COMPRAR"

    botonDOM.addEventListener("click", ()=>{
        agregadoraAlCarrito(titulo, precio)
    })

    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}

Productos.forEach(el => {
    const productosDOM = creadoraDeCards(el.titulo, el.imagen, el.precio, el.boton)
    productos.appendChild(productosDOM)
})