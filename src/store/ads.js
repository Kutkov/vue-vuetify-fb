import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
// import 'vuetify/dist/vuetify.min.css'

class Ad {
    constructor(title, description, imageSrc = '', id = null, promo = false) {
        this.title = title
        this.description = description
        // this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id
    }
}

export default {
    state: {
        ads: [
            {
                title: 'First ad',
                description: 'Hello i am description',
                promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: '123'
            },
            {
                title: 'Second ad',
                description: 'Hello i am description',
                promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                id: '1234'
            },
            {
                title: 'Third ad',
                description: 'Hello i am description',
                promo: false,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                id: '1235'
            }
        ]
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        }
    },
    actions: {
        async createAd({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                const newAd = new Ad(
                    payload.title,
                    payload.description,
                    getters.user.id,
                    payload.imageSrc,
                    payload.promo
                )

                const fbValue = await firebase.database().ref('ads').push(newAd)
                console.log(fbValue);
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
            // commit('createAd', payload)
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds(state) {
            return state.ads
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}