import api from '../../service/api'
import * as mutationsTypes from '../mutationsTypes'


/**
 * Obtém a imagem do avatar de um usuário e gerencia o cache de imagens.
 * 
 * @param {Object} context - O contexto do Vuex, contendo commit e state.
 * @param {Function} context.commit - A função de commit do Vuex para invocar mutações no estado.
 * @param {Object} context.state - O estado atual do módulo Vuex.
 * @param {number|string} imageID - O identificador único da imagem do avatar.
 * @returns {Promise<string>} A URL do avatar, que pode ser usada diretamente em elementos <img> no frontend.
 * 
 * @description
 * Este método verifica se a imagem do avatar já está armazenada no cache (state.avatarsMap) utilizando o ID da imagem.
 * Se a imagem já estiver no cache, a URL armazenada é retornada, evitando uma nova requisição ao servidor.
 * Caso contrário, uma requisição é feita ao servidor para obter a imagem, que é então armazenada no cache para usos futuros.
 */
export const getUrlAvatar = async ({ commit, state }, imageID) => {
    if (!imageID) return '';
    // Verifica se a imagem já está armazenada no cache
    if (state.avatarsMap.has(imageID)) {
        return state.avatarsMap.get(imageID);
    } else {
        // Se não estiver, faz uma requisição ao servidor para obter a imagem
        // e armazenar no cache para usos futuros
        try {
            const response = await api.get(`/foto/download/${imageID}`, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            commit(mutationsTypes.PERSON_GET_AVATAR_URL, { imageID, avatar_url: url });
            return url;
        } catch (error) {
            console.error(error);
            return '';
        }
    }
}

