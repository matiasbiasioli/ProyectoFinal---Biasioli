let carrito = []
let stockProductos = []
const contenedor = document.getElementById('cardsContainer');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const sumaDePrecio = document.getElementById('precioTotal');
const terminarCompra = document.querySelector('#terminarCompra');
const agregarCantidadIcono = document.querySelector('#cantidadCarrito');

//Fetch recibe (url, options)

// function arrayJson () {
//   fetch('../data/data.json')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//       stockProductos = data
//       renderProductos(stockProductos)
//     })
// }
// arrayJson()

//HOLA PROFE, PUDE RESOLVER LA CARGA DEL FETCH IGUALANDO EL NOMBRE QUE LE HABIA PUESTO AL ARRAY DE OBJETOS = DATA Y ENTONCES LO USÉ COMO PARAMETRO! GRACIAS!

//LLAMADO DEL ARRAY JSON CON FETCH
async function fetchAPI() {
  const response = await fetch ('../data/data.json')
  const data = await response.json();
  stockProductos = data
  renderProductos(stockProductos)
}
fetchAPI()

//HTML DE LAS CARDS
//MOSTRAR CARDS
const renderProductos = (producto) => {
  contenedor.innerHTML = ''
  for(const item of producto) {
    const { id, nombre, cantidad, descripcion, precio, img, } = item
    contenedor.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <p class="card-text">Descripcion: ${descripcion}</p>
            <p class="card-text">Cantidad: ${cantidad}</p>
            <a onclick="agregarProducto(${id})" id="btnAgregar" class="btn btn-primary botonP">Agregar a carrito</a>
          </div>
        </div>
      `;
  }
}

//FUNCION PARA SUMAR PRODUCTOS AL CARRITO
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

//POP-UP: AGREGASTE PRODUCTO AL CARRITO
contenedor.addEventListener('click', () => {
  Swal.fire({
    title: 'Agregaste un producto al carrito!',
    html: '<p class= text-class> Muy bien!</p>',
    confirmButtonText: 'OK',
    background: '#000',
    timer: 2000,
    icon: 'success',
    customClass: {
      title: 'title-class',
    }
  }
  )
})

//FUNCION PARA BOTON DE ELIMINAR PRODUCTO EN CARRITO
function eliminarProducto(id) {
  const platoId = id
  carrito = carrito.filter((platos) => platos.id != platoId)
  mostrarCarrito()
  carritoContador()
}

//FUNCION PARA BOTON DE VACIAR CARRITO
vaciarCarrito.addEventListener('click', () => {
  carrito.length = []
  mostrarCarrito();
  carritoContador();
})

//POP UP PARA TERMINAR COMPRAR
terminarCompra.addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: 'Tu carrito está vacio!',
      confirmButtonText: 'OK',
      timer: 2000,
      background: '#000',
      icon: 'error',
      customClass: {
        title: 'title-class',
      }
    }
    )
  } else {
    location.href = "compra.html"
  }
})

// AGREGAR NUMERO DE CANTIDADES AL ICONO CARRITO EN NAVBAR
const carritoContador = () => {
  agregarCantidadIcono.innerHTML = carrito.length;
}


//FINALIZAR COMPRA (PROBANDO)
function finalizarCompra() {
  carrito.forEach((producto) => {
    const listaCompra = document.querySelector('#lista-compra tbody');
    const row = document.createElement('tr');
    const { nombre, precio, cantidad, img } = producto;
    row.innerHTML += `
    <td>
      <img src="${img}">
    </td>
    <td>${nombre}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>`;
    listaCompra.appendchild(row);
  })

}

//GUARDAR DATOS EN LOCAL STORAGE
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}
// METODO PARA ACTUALIZAR PAGINA Y QUE NO SE PIERDA LA INFO DEL CARRITO
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito();
  carritoContador();
})





