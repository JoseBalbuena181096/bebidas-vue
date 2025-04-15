import {ref, onMounted, reactive, computed} from 'vue';
import { defineStore } from "pinia";
import APIServices from '@/services/APIServices';
import { useModalStore } from './Modal';


export const useBebidasStore = defineStore('bebidas', ()=>{

    const modal = useModalStore();
    const categorias = ref([]);
    
    const busqueda = reactive({
        nombre: '',
        categoria: '' 
    });

    const recetas = ref([]);
    const receta = ref({

    });

    onMounted(async function(){
        const {data: {drinks}} = await APIServices.obtenerCategorias();
        categorias.value = drinks;  
    });

    // actions 
    async function obtenerRecetas(){
        const {data: {drinks}} = await APIServices.buscarRecetas(busqueda);
        // console.log(drinks);
        recetas.value = drinks;

    }

    async function seleccionarBebidas(id){
        const {data: {drinks}} = await APIServices.buscarReceta(id);
        modal.handleClickModal();
        receta.value = drinks[0];
    }

    const noRecetas = computed( () => recetas.value.length === 0);

    return {
        categorias,
        busqueda,
        recetas,
        receta,
        obtenerRecetas,
        seleccionarBebidas,
        noRecetas
    }
});