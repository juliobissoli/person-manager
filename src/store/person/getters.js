export default {
    personAvatarUrl: (state) => (userId) => {
        return state.avatarsMap.get(userId) || 'https://driveranalytics.com.br/assets/images/avatar-default.jpg';
      },
}