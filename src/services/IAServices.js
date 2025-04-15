import {openrouter} from '../lib/ia';
import {streamText} from 'ai';


export default {
    async generarReceta(prompt){
        const resutado = streamText({
            model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            // model: openrouter('deepseek/deepseek-chat-v3-0324:free'),
            // model: openrouter('google/gemini-2.0-flash-exp:free'),
            prompt,
            system: 'Eres un experto en la preparación de bebidas. Genera una receta para la bebida que el usuario te pida. La receta debe ser clara y sencilla de seguir.'
        });
        
        return resutado.textStream;
    }
}