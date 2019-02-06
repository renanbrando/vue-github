import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#512DA8',
    secondary: '#757575',
    accent: '#00BCD4',
    error: '#F44336'
  }
})
