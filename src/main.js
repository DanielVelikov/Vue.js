import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'

import BoostrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import firebase from 'firebase'
import VueSimpleAlert from 'vue-simple-alert'

///register Packages for use
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BoostrapVue);
Vue.use(VueSimpleAlert);

firebase.initializeApp({
// Your web app's Firebase configuration
    apiKey: "AIzaSyBXiLPHDQL5XLP0xZK4epmDPZEiyCRRkRw",
    authDomain: "sample-8c9b1.firebaseapp.com",
    databaseURL: "https://sample-8c9b1.firebaseio.com",
    projectId: "sample-8c9b1",
    storageBucket: "sample-8c9b1.appspot.com",
    messagingSenderId: "100654470906",
    appId: "1:100654470906:web:5b642f5640cd853a049b43"
});

Vue.filter('snippet', function(data){
  return data.slice(0, 225) + "...";
});

const sampleRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: sampleRouter
})