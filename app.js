var productos=["Pollo Ranchero", "Pollo Mexicano ", "Pollo Yucateco", "Arroz", "Salsa", "Refresco"];

var precios=[150, 170, 200, 50, 20, 27];

var selectProductos=document.getElementById("productos");
var imgProductos=document.getElementById("imgProducto");
var precioProductos=document.getElementById("precioProductos");
var inputCantidad=document.getElementById("inputCantidad");
var agregarCarrito=document.getElementById("agregarCarrito");
var carrito=new Array();


var posProducto=-1;
var cantidadProducto=0;
var pagar=0;
var totalp=0;
var cambio=0;

const cargarProductos=()=>{
    let optionProductos="";
    productos.forEach((producto)=>{
        optionProductos+=`<option value="${producto}">${producto.toUpperCase()}</option>`;
    })
    selectProductos.innerHTML=optionProductos;
    cargarPrecio();
}                   

selectProductos.onchange=()=>{
    cargarPrecio();
}

const cargarPrecio=()=>{
    imgProductos.src=`productos/${selectProductos.value.toLowerCase()}.png`;
    precioProductos.innerHTML=`$ ${precios[selectProductos.selectedIndex]}`;
    posProducto=selectProductos.selectedIndex;
}

inputCantidad.oninput=()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value;
    cantidadProducto=parseInt(inputCantidad.value);
}

agregarCarrito.onclick=()=>{
    cantidadProducto=parseInt(inputCantidad.value);


        if(checarProducto(posProducto, cantidadProducto)){
      imprimirTabla();

    }else{
      let item=new Array();
    item.push(posProducto);
    item.push(cantidadProducto);
    carrito.push(item);
    imprimirTabla();
    }
}

const checarProducto=(pos, cant)=>{
  let x=false;
  carrito.forEach(item=>{
    if(item[0]==pos){
      item[1]=item[1]+cant;
      x=true;
    }
  });
  return x;
}


const imprimirTabla=()=>{
    let total=0;
    let divCarrito=document.getElementById("carrito");
    let tablaHTML=`<table class="table w-100 m-auto">
        <tr>
        <td>PRODUCTO</td>
        <td>PRECIO</td>
        <td>CANTIDAD</td>
        <td>IMPORTE</td>
        <td>*</td>
        </tr>
        `;
        let index=0;
        carrito.forEach(item=>{
            tablaHTML+=`
            <tr>

            
            <td>${productos[item[0]]}</td>
            <td>$ ${precios[item[0]]}.00</td>
            <td>${item[1]}</td>
            <td>${(precios[item[0]]*item[1])}</td>
            <td><button class="btn btn-danger" onclick="eliminarProducto(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button></td>
            </tr>
            `
            index++;
            total+=(precios[item[0]]*item[1]); //array multiplica por cantidad precio
            totalp=total;
    })
    let cambio=0;
    tablaHTML+=`
    <tr>
    <td></td>
    <td></td>
    <td><h3>TOTAL</h3></td>
    <td><h3>$${total}.00</h3></td>
    <td><button onclick="pagarProducto(${pagar})" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
</svg></button></td>
    </tr>
    `


    divCarrito.innerHTML=tablaHTML;
}


const eliminarProducto=(index)=>{
  Swal.fire({
  title: "¿Estás seguro de eliminar este producto?",
  showDenyButton: true,
  confirmButtonText: "Si, eliminar",
  denyButtonText: "No estoy seguro"
}).then((result) => {

  if (result.isConfirmed) {
    carrito.splice(index, 1);
    imprimirTabla();
    Swal.fire("El producto ha sido eliminado", "", "success");
  }
});
}

const pagarProducto=()=>{

  Swal.fire({
  title: 'Total a Pagar  $'+totalp,
  input: 'text',
  inputPlaceholder: 'Ingrese el total a pagar'+totalp,
  showCancelButton: true,
  confirmButtonText: 'Enviar',
  cancelButtonText: 'Cancelar'
}).then((result) => {
  if (result.isConfirmed) {
    const pago = result.value;
if (pago>= totalp) {
  let cambio=pago-totalp;
  Swal.fire({
        title: "GRACIAS POR TU COMPRA",
        text: "Tu cambio es de : $"+cambio,
        icon: "success"
    });
    desaparecerT();
} else {
  Swal.fire({
        title: "Ingresa una cantidad válida",
        text: "Inténtalo de nuevo",
        icon: "error"
    });
}
  }
});

        }


const verProductos=()=>{
  let divListaProductos=document.getElementById("listaProductos");
  let tablaHTML=
  `<table class="table w-100 m-auto">
      <tr>
      <td>PRODUCTO</td>
      <td>PRECIO</td>
      <td>DEL</td>
      </tr>
      `;
      let index=0;
      productos.forEach(item=>{
          tablaHTML+=`
          <tr>
          <td>${item}</td>
          <td>$ ${precios[index]}.00</td>
          <td><button class="btn btn-danger" onclick="delProductos(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button></td>
          </tr>
          `
          index++;
  })
  divListaProductos.innerHTML=tablaHTML;
}


const addProductos=()=>{
  let nombre=document.getElementById('nombreProducto').value;
  let precio=document.getElementById('pProducto').value;
  productos.push(nombre);
  precios.push(precio);
  cargarProductos();
  verProductos();
}

delProductos=(index)=>{
  let divListaProductos=document.getElementById("listaProductos");
  Swal.fire({
    title: "¿Estás seguro de eliminar este producto?",
    showDenyButton: true,
    confirmButtonText: "Si, eliminar",
    denyButtonText: "No estoy seguro"
  }).then((result) => {

    if (result.isConfirmed) {
      productos.splice(index, 1);
      precios.splice(index, 1);
      verProductos();
      cargarProductos();
      Swal.fire("El producto se eliminó exitosamente", "", "success");
    }
  });
}

const desaparecerT=()=>{
  carrito=[];
  document.getElementById("carrito").innerHTML="";
}