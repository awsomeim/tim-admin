import { restApi } from '../../../plugins/axios'

export default {
	load ({ commit }) {
		return new Promise((resolve, reject) => {
			return restApi.get(
				`/v1/admin/life/list`,
				{
					params: {
						page: 1,
						size: 20
					}
				}
			)
				.then((response) => {
					commit('setSquareList', response.data.data);
					resolve(response)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	list ({ commit }, payload) {
		return new Promise((resolve, reject) => {
			return restApi.get(
				`/v1/admin/life/list`,
				{
					params: {
						page: payload.page,
						size: 20
					}
				}
			)
				.then((response) => {
					commit('setSquareList', response.data.data);
					resolve(response)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	// eslint-disable-next-line no-unused-vars
	forbid ({ commit }, payload) {
		return new Promise((resolve, reject) => {
			return restApi.post(
				`/v1/admin/life/forbid`,
				{
					id: payload.id
				}
			)
			// .then((response) => {
			// 	commit('setSquareList', response.data.data);
			// 	resolve(response)
			// })
			// .catch((error) => {
			// 	console.log(error)
			// 	reject(error)
			// })
		})
	}
}