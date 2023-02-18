import { createApp } from 'vue'
import App from './App.vue'
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/style.css';
import VueSweetalert2 from 'vue-sweetalert2';

// App.use(VueSweetalert2)
const app = createApp(App)

app.use(VueSweetalert2)
app.mount('#app')
