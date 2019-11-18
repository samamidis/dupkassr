<template>
<v-container fluid>
  <v-row class="main">
    <v-col cols="12" sm=6>
      <v-card
      shaped
      style="overflow-y :auto">
      <v-card-title primary-title>
        Posts wiil go here
      </v-card-title>
      <v-card-text>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis modi nostrum, sit maiores corporis qui dolores rerum exercitationem atque accusantium veritatis porro necessitatibus consectetur. Ullam numquam molestiae suscipit sapiente quam!</p>
      </v-card-text>
      </v-card>

    </v-col>
    <v-col cols="12" sm=6 >
       <v-card 
        shaped
        >
      <v-card-title 
        class="card-title" >
          title
        </v-card-title>
          <v-card-text 
        class="card-text"
        style="height:100%">
        
          <gmap-map id="mymap"  :center="userCoords" :map-type-id="mapTypeId" :zoom="5">
          <gmap-marker 
            :position="userCoords" 
            :icon="image"  
            :draggable="true"
           
            ></gmap-marker>
          <!-- <gmap-marker
            v-for="(item, index) in markers"
            :key="index"
            :position="item.position"
            @click="center = item.position"
            :clickable="true"
   
    @click="center=m.position"
          /> -->
        </gmap-map>          
       </v-card-text>

      </v-card>
    </v-col> 
  </v-row>
  
</v-container>
</template>

<script>
import fireservice from '@/services/fireservice'

export default {
  components: {},

  async fetch({ store }) {
    if (!store.state.users.user) {
      store.dispatch('profile/resetProfile')
      return null
    } else {
      const profile = await fireservice.readProfile(store.state.users.user.uid)

      store.dispatch('profile/setProfile', profile)
      return profile
    }
  },
  head() {
    return { title: this.$t('home.title') }
  },
  data() {
    return {
      center: { lat: -3.350235, lng: 111.995865 },
      mapTypeId: 'hybrid',
      markers: [
        { position: { lat: -0.48585, lng: 117.1466 } },
        { position: { lat: -6.9127778, lng: 107.6205556 } }
      ],
      image:
        'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      location: null,
      gettingLocation: false,
      errorStr: null
    }
  },
  computed: {
    userCoords() {
      const coords = this.$geolocation.coords
      if (!coords) return { lat: 40, lng: 24 }
      return { lat: coords.latitude, lng: coords.longitude }
    }
  }
}
</script>
<style lang="scss" >
.v-card {
  height: 85vh;
}
.vue-map-container {
  height: 90%;
  width: 100%;
}
</style>
