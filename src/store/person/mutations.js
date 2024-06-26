import * as mutationsTypes from '../mutationsTypes'

export default {
    [mutationsTypes.PERSON_GET_AVATAR_URL](state, data) {
        state.avatarsMap.set(data.imageID, data.avatar_url)
    },

    [mutationsTypes.PERSON_REMOVE_AVATAR](state, { imageID }) {
        state.avatarsMap.delete(imageID);
    },
}

