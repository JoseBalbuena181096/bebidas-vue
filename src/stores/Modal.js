import { ref, computed } from 'vue';
import {defineStore} from 'pinia';
import {useFavoritosStore} from './favoritos';
import {useBebidasStore} from './bebidas';
 

export const useModalStore = defineStore('modal', ()=>{

    const favoritos = useFavoritosStore();
    const bebidas = useBebidasStore();
    const modal = ref(false);

    // Los actiosn se recomienda usar functions
    function handleClickModal(){
        modal.value = !modal.value;
    }

    // Los getter(computed on store) se recomienda usar arrow functions
    const textBoton = computed(()=>{
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de Favoritos' 
        : 'Agregar a favoritos ';
    });

    return {
        modal,
        handleClickModal,
        textBoton
    }
});