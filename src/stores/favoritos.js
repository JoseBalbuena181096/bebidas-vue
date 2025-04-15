import {ref, watch, onMounted, computed} from 'vue';
import {defineStore} from 'pinia';
import { useBebidasStore } from './bebidas';
import { useModalStore } from './Modal';
import { useNotificacionStore } from '../stores/notificaciones';

export const useFavoritosStore = defineStore('favoritos', ()=>{

    const bebidas = useBebidasStore();
    const modal = useModalStore();
    const notificaciones = useNotificacionStore();


    const favoritos = ref([]);

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []; 
    });

    watch(favoritos, ()=>{
        sincronizarlocalStorage()
    },{
        deep: true
    });


    function existeFavorito(){
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritosLocalStorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink);
    }

    function sincronizarlocalStorage(){
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    }

    function eliminarFavorito(){
        favoritos.value = favoritos.value.filter(
            favorito => favorito.idDrink !== bebidas.receta.idDrink
        );
        notificaciones.mostrar = true;
        notificaciones.mostrar = false;
        notificaciones.texto = 'Eliminado de favoritos';
        
    }

    function agregarFavorito(){
        favoritos.value.push(bebidas.receta);
        notificaciones.mostrar = true;
        notificaciones.texto = 'Se agrego a favoritos';

    }

    function handleClickFavoritos (){
        // console.log('agregando...');
        if(existeFavorito()){
            // console.log('Ya existe');
            eliminarFavorito();
        }
        else{
            agregarFavorito();
        }
        modal.modal = false;

       //console.log(favoritos.value);
    }

    const noFavoritos = computed(() => favoritos.value.length === 0 );

    return {
        favoritos,
        handleClickFavoritos,
        existeFavorito,
        noFavoritos
    }
});