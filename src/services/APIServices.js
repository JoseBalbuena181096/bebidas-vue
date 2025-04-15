import api from '../lib/axios';

export default {
    obtenerCategorias(){
        return api.get('/list.php?c=list');
    },
    buscarRecetas({categoria, nombre}){
        return api(`/filter.php?c=${categoria}&i=${nombre}`);
    },
    buscarReceta(id){
        console.log(id);
        return api(`/lookup.php?i=${id}`);
    }    

}