let nombreUsuario;
let edadUsuario;
const componentesPC = [
    { nombre: "Procesador", precio: 5000 },
    { nombre: "Memoria RAM", precio: 3000 },
    { nombre: "Disco Duro SSD", precio: 2000 }
];
let carritoCompras = [];
let totalCarrito = 0;


function interactuarUsuario() {
    nombreUsuario = prompt("Ingrese su nombre:");
    edadUsuario = parseInt(prompt("Ingrese su edad:"));

    if (edadUsuario >= 18) {
        alert("Bienvenido, " + nombreUsuario + "! Puede proceder con la selección de componentes.");

        let mensajeComponentes = "Tipos de componentes disponibles:\n";
        for (let i = 0; i < componentesPC.length; i++) {
            const componente = componentesPC[i];
            mensajeComponentes += (i + 1) + ". " + componente.nombre + " - Precio: " + componente.precio + " pesos\n";
        }

        let seleccion;
        do {
            seleccion = parseInt(prompt(mensajeComponentes + "\nIngrese el número correspondiente al componente que desea añadir al carrito o, ingrese 0 para terminar:"));

            if (seleccion >= 1 && seleccion <= componentesPC.length) {
                const componenteSeleccionado = componentesPC[seleccion - 1];
                const cantidad = parseInt(prompt("Ingrese la cantidad de " + componenteSeleccionado.nombre + " que desea comprar:"));
                if (parseInt(cantidad) && cantidad > 0) {
                    for (let i = 0; i < cantidad; i++) {
                        carritoCompras.push(componenteSeleccionado);
                        totalCarrito += componenteSeleccionado.precio;
                    }
                    alert(cantidad + " " + componenteSeleccionado.nombre + " añadido al carrito.");
                } else {
                    alert("Cantidad inválida. Por favor, ingrese un número válido mayor a 0.");
                }
            } else if (seleccion !== 0) {
                alert("Selección inválida. Por favor, ingrese un número válido.");
            }
        } while (seleccion !== 0);

        let mensajeCarrito = "Resumen de su carrito de compras, " + nombreUsuario + ":\n";
        for (let i = 0; i < carritoCompras.length; i++) {
            const componente = carritoCompras[i];
            mensajeCarrito += componente.nombre + " - Precio: " + componente.precio + " pesos\n";
        }
        mensajeCarrito += "Total a pagar: " + totalCarrito + " pesos";
        alert(mensajeCarrito);

    } else {
        alert("Lo siento, debe ser mayor de edad para realizar esta acción.");
    }
}

interactuarUsuario();