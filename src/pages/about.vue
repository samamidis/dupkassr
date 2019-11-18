<template>
  <section class="container" >
    <div>
      <h1>{{ $t('about') }}</h1>
    <gmap-map 
      id="map"
      :center="center" 
      :zoom="15"
      :options="{styles: styles}" 
      style="width: 100%; height:80vh; ">


      <gmap-marker 
        :key="i" 
        v-for="(m,i) in markers"
        :title="m.title" 
        :position="m.position" 
        :clickable="true" 
        @click="toggleInfoWindow(m,i)">
      <gmap-info-window 
        :options="infoOptions" 
        :position="markers[i].position" 
        :opened="markers[i].infoWinOpen"
        draggable="true" 
        @closeclick="markers[i].infoWinOpen=false">
          <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="markers[i].src"
      height="200px"
    ></v-img>

    <v-card-title>
      Top western road trips {{markers[i].infoText}}
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn
        color="purple"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
      </gmap-info-window>
      </gmap-marker>
    </gmap-map>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }]
        }
      ],
      center: {
        lat: 47.376332,
        lng: 8.547511
      },
      show: false,
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [
        {
          position: {
            lat: 47.376332,
            lng: 8.547511
          },
          src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          infoText: 'Marker 1',
          infoWinOpen: false,
          title: 'Marker 1'
        },
        {
          position: {
            lat: 47.374592,
            lng: 8.548867
          },
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          infoText: 'Marker 2',
          infoWinOpen: false,
          title: 'Marker 2'
        },
        {
          position: {
            lat: 47.379592,
            lng: 8.549867
          },
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          infoText: 'Marker 3',
          infoWinOpen: true,
          title: 'Marker 3'
        }
      ]
    }
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      console.log(idx)
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.markers[idx].infoWinOpen = !this.markers[idx].infoWinOpen
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.markers[idx].infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}
</script>
<style>
html,
#map {
  height: auto;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
