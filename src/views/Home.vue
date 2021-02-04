<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    Hello <b>{{this.user.firstName}} {{this.user.lastName}}</b>
    <br/><br/>
    This is the landing Page
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data(){
    return {
      user : {}
    }
  },
  async created(){
    const apiUrl = "http://localhost:8090/getUserDetails";
    // const response = axios.get(apiUrl, {
    //   headers : {
    //     Authorization : 'Bearer '+localStorage.getItem('token')
    //   }
    // });
     axios.get(apiUrl, {
       headers : {
         Authorization : 'Bearer '+localStorage.getItem('token')
       }
     })
     .then((response) => {
       this.user = response.data;
     })
     .catch(err => console.log(err))

    //console.log(response);
  }
}
</script>
