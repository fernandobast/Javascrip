const productos = document.getElementById("productos");
const carritoDOM = document.getElementById("carrito");
const busqueda = document.getElementById("busqueda");
const verCarrito = document.getElementById("verCarrito");
let Carrito = JSON.parse(localStorage.getItem('Carrito')) || [];

const stockInicial = {
    "Procesador AMD RYZEN 5 3600 4.2GHz Turbo AM4 Wraith Stealth Cooler": 25,
    "Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler": 25,
    "Procesador AMD Ryzen 7 5700G 4.6GHz Turbo + Wraith Stealth Cooler": 25,
    "Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5 - No incluye Cooler - C/VIDEO": 25,
    "Procesador AMD Ryzen 9 7950X 5.7GHz AM5 - No incluye Cooler - C/Video": 25,
    "Procesador AMD Ryzen 9 7950X3D 5.7GHz AM5 - No incluye Cooler -": 25
};

let stock = JSON.parse(localStorage.getItem('stock')) || { ...stockInicial };

function guardarEnLocalStorage() {
    localStorage.setItem('Carrito', JSON.stringify(Carrito));
    localStorage.setItem('stock', JSON.stringify(stock));
}

const agregadoraAlCarrito = (titulo, precio) => {
    const productoEnCarrito = Carrito.find(el => el.titulo === titulo);

    if (stock[titulo] > 0) {
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            Carrito.push({
                titulo,
                precio,
                cantidad: 1
            });
        }
        stock[titulo]--;

        
        Swal.fire({
            title: 'Producto agregado',
            text: `${titulo} ha sido agregado al carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

    } else {
        Swal.fire({
            title: 'Sin stock',
            text: `No hay suficiente stock de ${titulo}.`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

    guardarEnLocalStorage();
    actualizarCarrito();
};

const quitarDelCarrito = (titulo) => {
    const productoEnCarrito = Carrito.find(el => el.titulo === titulo);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        stock[titulo]++;

        if (productoEnCarrito.cantidad === 0) {
            Carrito = Carrito.filter(el => el.titulo !== titulo);
        }

        
        Swal.fire({
            title: 'Producto quitado',
            text: `${titulo} ha sido quitado del carrito.`,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }

    guardarEnLocalStorage();
    actualizarCarrito();
};

const actualizarCarrito = () => {
    carritoDOM.innerHTML = '';

    if (Carrito.length === 0) {
        carritoDOM.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    Carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            ${item.titulo} - $${item.precio} x ${item.cantidad}
            <button onclick="quitarDelCarrito('${item.titulo}')">Quitar</button>
        `;
        carritoDOM.appendChild(itemDiv);
    });
};

const creadoraDeCards = (titulo, imagen, precio) => {
    const contenedor = document.createElement("div");
    const tituloDOM = document.createElement("h3");
    const imagenDOM = document.createElement("img");
    const precioDOM = document.createElement("p");
    const botonDOM = document.createElement("button");

    contenedor.classList.add("contenedor");
    tituloDOM.classList.add("titulo");
    imagenDOM.classList.add("imagen");
    precioDOM.classList.add("precio");
    botonDOM.classList.add("boton");

    tituloDOM.innerText = titulo;
    precioDOM.innerText = "$" + precio;
    imagenDOM.src = imagen;
    botonDOM.innerText = "COMPRAR";

    botonDOM.addEventListener("click", () => {
        agregadoraAlCarrito(titulo, precio);
    });

    contenedor.appendChild(tituloDOM);
    contenedor.appendChild(imagenDOM);
    contenedor.appendChild(precioDOM);
    contenedor.appendChild(botonDOM);

    return contenedor;
};

const mostrarProductos = (productosFiltrados) => {
    productos.innerHTML = '';
    productosFiltrados.forEach(el => {
        const productosDOM = creadoraDeCards(el.titulo, el.imagen, el.precio);
        productos.appendChild(productosDOM);
    });


    productosFiltrados.forEach(producto => {
        const boton = productos.querySelector(`button[onclick*="${producto.titulo}"]`);
        if (boton) {
            boton.addEventListener("click", () => {
                agregadoraAlCarrito(producto.titulo, producto.precio);
            });
        }
    });
};

fetch('productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching productos.json');
        }
        return response.json();
    })
    .then(data => {
        mostrarProductos(data);

        busqueda.addEventListener("input", (e) => {
            const termino = e.target.value.toLowerCase();
            const productosFiltrados = data.filter(producto => 
                producto.titulo.toLowerCase().includes(termino)
            );
            mostrarProductos(productosFiltrados);
        });
    })
    .catch(error => {
       
    });

verCarrito.addEventListener("click", () => {
    if (carritoDOM.style.display === "none" || carritoDOM.style.display === "") {
        actualizarCarrito();
        carritoDOM.style.display = "block";
        carritoDOM.scrollIntoView({ behavior: "smooth" });
    } else {
        carritoDOM.style.display = "none";
    }
});

actualizarCarrito();