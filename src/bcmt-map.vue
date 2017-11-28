<i18n>
{
   "en":{
      
   },
   "fr":{
       
   }
}
</i18n>

<template>	
	<span class="bcmt-map">
    <div id="bcmtmap" ></div>

	</span>
</template>



<script>


export default {

  props:{
	  
      lang: {
          type: String,
          default: 'fr'
      }
    
  },

  data(){
      return {
          map:null
        
  
      }
  },
  methods: {
    
	
	},
	
  created(){
      this.$i18n.locale = this.lang;
    
  },  
  mounted(){
      this.map = L.map(this.$el.querySelector(".bcmt-map > div")).setView([51.505, -0.09], 3);
	  L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	      attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
	      maxZoom: 18,
	      id: 'mapbox.streets'}).addTo( this.map );
	 var elements = new L.SelectGroup( "observatories", this.map , {iconMarker:{icon:"binoculars"}, iconSelected:{icon:'binoculars'}});
	//  var event = new CustomEvent('observatoriesRequest', {});
    //  document.dispatchEvent(event);
  },
  destroyed(){
  }

}

</script>

<style>
[id="bcmtmap"]{
  width:100%;
  min-height:500px;
}
</style>