import { mapGetters, mapActions } from 'vuex'

export const loginMixin = {
    computed: {
      ...mapGetters([
        'token',
        'username',
        'id'
      ])
    },
    methods: {
      ...mapActions(['setToken', 'setUsername', 'setId'])
    }
}
