import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import AsImage from './components/AsImage.vue'
import AsBanner from './components/AsBanner.vue'
import Layout from './Layout.vue'

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({ app, router, siteData }) {
        app.component('AsImage', AsImage)
        app.component('AsBanner', AsBanner)
    },
}