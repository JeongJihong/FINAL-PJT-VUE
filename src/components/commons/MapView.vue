<template>
<GmapMap
  :center="{lat: 37.5012743, lng: 127.039585}"
  :zoom="17"
  style="width: 70%; height: 600px; margin: auto; float: left;"
>
<GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
</template>
<script>
export default {
  name: 'Map',
  data() {
    return {
      markers: [
        {
          title: "ssafy",
          position: {
            lat: 37.5012743,
            lng: 127.039585,
          },
        },
      ]
    }
  },
}
</script>