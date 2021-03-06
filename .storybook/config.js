import { configure, addParameters, addDecorator } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import backgrounds from './addons/background'
import VTooltip from 'v-tooltip'
import 'frontend/plugins/LazyLoad'

import '../app/packs/stylesheets/main.scss'

Vue.use(BootstrapVue)
Vue.use(VTooltip)

function loadStories() {
  const req = require.context('../app/packs/frontend/components', true, /__story__\/index.js$/)

  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {
    name: 'FleetYards.net Styleguide',
  },
  backgrounds,
})

addDecorator(centered)

configure(loadStories, module)
