import { handleGetProductLS } from "../persistance/localstorage";
import { handleRenderList } from "../view/store";

export const handleSearchProductByName = () => {
    const inputHeader = document.getElementById('inputHeader');
    const products = handleGetProductLS();
    const result = products.filter((el) => {
       return el.nombre.toLowerCase().includes(inputHeader.value.toLowerCase());
    })
    console.log(result);
    handleRenderList(result);

};