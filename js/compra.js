let carrito = []
let stockProductos = []
const sumaDePrecio = document.getElementById('precioTotal');
const agregarCantidadIcono = document.querySelector('#cantidadCarrito');
const activarFuncion = document.querySelector('#activarFuncion');
const listaCompra = document.querySelector('#lista-compra tbody');

if (activarFuncion === true) {
  activarFuncion.addEventListener('click', finalizarCompra)
}

//FINALIZAR COMPRA FORMULARIO (PROBANDO)
function finalizarCompra() {
  const listaCompra = document.querySelector('#lista-compra tbody');
  carrito.forEach((producto) => {
    const { id, nombre, precio, cantidad, img } = producto
    listaCompra.innerHTML += `
        <td>
          <img class="img-fluid img-carrito" src="${img}">
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${precio * producto.cantidad}</td>`
  })
}

async function fetchAPI2() {
  const response = await fetch('../data/data.json')
  const data2 = await response.json();
  carrito = data2
  finalizarCompra(carrito)
}

fetchAPI2()

function agregarProducto(id) {
  const cantidadProducto = carrito.some((producto) => producto.id === id)
  if (cantidadProducto) {
    const producto = carrito.map((producto) => {
      if (producto.id === id) {
        producto.cantidad++
      }
    })
  } else {
    const items = stockProductos.find((producto) => producto.id === id)
    carrito.push(items)
  }
  mostrarCarrito();
  carritoContador();
}

//FUNCION PARA MOSTRAR LOS PRODUCTOS EN EL CARRITO
function mostrarCarrito() {
  const modalBody = document.querySelector('.modal .modal-body')
  modalBody.innerHTML = ''
  carrito.forEach((producto) => {
    const { id, nombre, precio, cantidad, img } = producto
    modalBody.innerHTML += `
      <div class= "modal-container">
        <div>
      <img class="img-fluid img-carrito" src="${img}">
        </div>
      <div class="mt-1">
        <p>Producto: ${nombre}</p>
        <p>Precio: $${precio}</p>
        <p>Cantidad: ${cantidad}</p>
        <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>
      </div>
      </div>`
  })
  if (carrito.length === 0) {
    modalBody.innerHTML = `<p>Tu carrito está vacio</p>`
  }
  //Método para sumar el total del precio
  sumaDePrecio.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)

  guardarStorage()
}


//GUARDAR DATOS EN LOCAL STORAGE
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

const carritoContador = () => {
  agregarCantidadIcono.innerHTML = carrito.length;
}

document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  document.querySelector('#activarFuncion').click(finalizarCompra)
  mostrarCarrito();
  carritoContador();
})
