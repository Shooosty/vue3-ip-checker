import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = 'http://ip-api.com'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const useIpStore = defineStore('ip', {
  state: () => ({
    items: [] as any[],
    item: {} as any
  }),

  getters: {
    getItems: (state) => state.items,
    getItem: (state) => state.item
  },

  actions: {
    CREATE(DATA: string[]) {
      return axios.post('/batch', DATA).then((response) => {
        const newData = response.data.filter((item) => {
          return !this.items.some((existingItem) => existingItem.query === item.query)
        })
        this.items.push(...newData)
      })
    },

    GET(DATA: string) {
      return axios.post(`/json/${DATA}`).then(({ data }) => {
        this.item = data
      })
    },

    DELETE(DATA: string) {
      const index = this.items.findIndex((item) => item.query === DATA)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    }
  },

  persist: true
})
