import { handleGetProductLS, setInLocalStorage } from "./src/persistance/localstorage";
import { renderCategories } from "./src/services/categories";
import { handleSearchProductByName } from "./src/services/searchBar";
import { handleGetProductsToStore, handleRenderList } from "./src/view/store";
import Swal from "sweetalert2";
import  './style.css';

export let categoriaActiva = null;
export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
}

export let productoActivo = null;
export const setProductoActivo = (productoIn) => {
    productoActivo = productoIn;
}

handleGetProductsToStore();
renderCategories();

const btnAdd = document.getElementById('buttonAdd');

btnAdd.addEventListener('click', () => {
    openModal();
});

const handleCancelButton = () => {
    closeModal();
};
const btnCancel = document.getElementById('cancelBtn');
btnCancel.addEventListener('click', () => {
    handleCancelButton();
});

export const openModal = () => {
const modal = document.getElementById('modalPopUp');
modal.style.display = 'flex';
const buttonDelete = document.getElementById('deleteBtn');
if (productoActivo) {
    buttonDelete.style.display = 'block'; 
} else {
    buttonDelete.style.display = 'none';
}

    if (productoActivo) {
        const nombre = document.getElementById('nombre');
        const imagen = document.getElementById('imagen');
        const precio = document.getElementById('precio');
        const categoria = document.getElementById('categoria');
        imagen.value = productoActivo.imagen;
        nombre.value = productoActivo.nombre;
        precio.value = productoActivo.precio;
        categoria.value = productoActivo.categoria;
    }

}
export const closeModal = () => {
    const modal = document.getElementById('modalPopUp');
    modal.style.display = 'none';
    setProductoActivo(null);
    resetModal();
}

const resetModal = () => {
    const nombre = document.getElementById('nombre');
    const imagen = document.getElementById('imagen');
    const precio = document.getElementById('precio');
    const categoria = document.getElementById('categoria');
    imagen.value = '';
    nombre.value = '';
    precio.value = 0;
    categoria.value = 'Seleccione una categoria';
}

const deleteButton = document.getElementById('deleteBtn');
deleteButton.addEventListener('click', () => {
    handleDeleteButton();
});

const handleDeleteButton = () => {
   handleDeleteProduct();
}

const acceptBtn = document.getElementById('acceptBtn');
acceptBtn.addEventListener('click', () => {
    handleSaveOrModify();
});

const buttonSearch = document.getElementById('buttonSearch');
buttonSearch.addEventListener('click', () => {
    handleSearchProductByName();
});

const handleDeleteProduct = () => {
    Swal.fire({
        title: "¿Seguro quieres eliminar?",
        text: "No hay vuelta atras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLS();
    const result = products.filter((el)=> el.id !== productoActivo.id);
    localStorage.setItem('products', JSON.stringify(result));
    const newProducts = handleGetProductLS();
    handleRenderList(newProducts);
    closeModal();
        } else {
            closeModal();
        }
      });

  
}

const handleSaveOrModify = () => {
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('imagen').value;
    const precio = document.getElementById('precio').value;
    const categoria = document.getElementById('categoria').value;

    let object = null;
    if (productoActivo) {
         object = {
            ... productoActivo,
            nombre,
            imagen,
            precio,
            categoria
        }
    } else {
         object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categoria
        };
    }
    Swal.fire({
        title: "Hecho",
        text: "Producto guardado con exito!",
        icon: "success"
      });

    console.log(object);
    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();


};