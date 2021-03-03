// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListner()
function cargarEventListner(){ // Cuando agregas un curso presionando "Agregar carrito"
  listaCursos.addEventListener('click',agregarCurso);
  
  //Elimina cursos del carrito 
  carrito.addEventListener('click',eliminarCurso);

  //Vaciar carrito
  vaciarCarritoBtn.addEventListener('click',()=>{
    articulosCarrito = [];//Reseteamos el arreglo

    limpiarHML();
  })
}


//Funciones

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
    }
}

// Elimina un curso del carrito 
function eliminarCurso(e) {
  e.preventDefault();
  if(e.target.classList.contains('borrar-curso') ) {
       // e.target.parentElement.parentElement.remove();
       const cursoId = e.target.getAttribute('data-id')
      //  console.log(e.target.getAttribute('data-id'));
       // Eliminar del arreglo del carrito
       articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
       console.log(articulosCarrito)
       carritoHTML();
  }
}

// Lee el contenido del HtML

function leerDatosCursos(curso){
//   console.log(curso);

  //Obejto con el contenido del curso actual
  const infoCurso = {
      imagen: curso.querySelector('img').src,
      titulo: curso.querySelector('h4').textContent,
      precio: curso.querySelector('Span').textContent,
      id: curso.querySelector('a').getAttribute('data-id'),
      cantidad: 1

  }
  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

  if(existe){

    //Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso =>{
      if(curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else{
        return curso;
      }
    });
    articulosCarrito=[...articulosCarrito]
  }else{
    articulosCarrito = [...articulosCarrito,infoCurso];

  }
 
  //Agrega elementos al arreglo de carrito
 
 console.log(articulosCarrito);
 carritoHTML();
  
}

//Muestra el carrito de compras 
function carritoHTML(){
    
  //Limpiar HTML

   limpiarHML();
 //Recorre el carrito y genera el HTML
   articulosCarrito.forEach(curso =>{
     const {imagen,titulo,precio,cant,id} = curso;
     const row = document.createElement('tr');
     row.innerHTML = `
       <td>
        <img src="${imagen}" width="100">
       </td>

       <td> ${titulo} </td> 

       <td> ${precio} </td>

       <td> ${cant} </td>
       <td>
         <a href= "#" class="borrar-curso" data-id="${id}"> x </a>
       </td>
     `;

     //Agrega el HTML del carrito en el tbody
     contenedorCarrito.appendChild(row)
   })
}

//Elimina los cursos del body
function limpiarHML(){
// contenedorCarrito.innerHTML = '';

while(contenedorCarrito.firstChild){
  contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
}

