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
          map:null,
          observatoriesMarkers:[],
          iconMarker:null,
          iconSelected: null,
          observatoriesChangeListener:null,
          allObservatoriesListener:null
      }
  },
  methods: {
      	updateObservatories(ev){
      	    console.log( ev.detail);
      	},
      	addClickListener( marker){
      	   var iconSelected = this.iconSelected;
      	   var iconMarker = this.iconMarker;
      	    marker.on('click', function( e ){
      	      
      	        // change icon 
      	        if( this.options.selected){
      	            this.setIcon(iconMarker);
      	            this.options.selected = false;
      	        }else{
      	            this.setIcon(iconSelected);
      	          this.options.selected = true;
      	        }
      	      var event = new CustomEvent('selectMarkerObservatory', { detail:{ name: this.options.name, selected: this.options.selected}});
      	      document.dispatchEvent(event);
      	        
      	    })
      	},
      	initIcons(){
      	    this.iconMarker = new L.AwesomeMarkers.icon({
  	            	icon: 'circle',
    	          	prefix: 'fa',
    	            markerColor: 'orange'
    	          });
      	    this.iconSelected =  L.AwesomeMarkers.icon({icon: 'spinner', prefix: 'fa', markerColor: 'red', spin:true});
      	},
      	addObservatoriesMarkers(ev){
      	    if(this.observatoriesMarkers.length == 0){
      	        //create icon marker
      	        this.initIcons();
      	        for(var key in ev.detail){
      	            var marker = new L.Marker(
      	                  ev.detail[key].location,
      	                 {icon: this.iconMarker,
      	                  name: key,
      	                  selected:false,
      	                  title: ev.detail[key].name[this.lang]});
      	            marker.addTo(this.map); 
      	            this.addClickListener(marker);
      	          	this.observatoriesMarkers[key] = marker;
      	        }
      	    }
      	}
	
	},
	
  created(){
      this.$i18n.locale = this.lang;
      this.observatoriesChangeListener = this.updateObservatories.bind(this) 
      document.addEventListener('observatoriesChange', this.observatoriesChangeListener);
      this.allObservatoriesListener = this.addObservatoriesMarkers.bind(this) 
      document.addEventListener('allObservatories', this.allObservatoriesListener);
    
  },  
  mounted(){
      this.map = L.map(this.$el.querySelector(".bcmt-map > div")).setView([51.505, -0.09], 3);
	  L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	      attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
	      maxZoom: 18,
	      id: 'mapbox.streets'}).addTo( this.map );
	  var event = new CustomEvent('observatoriesRequest', {});
      document.dispatchEvent(event);
  },
  destroyed(){
      document.removeEventListener('observatoriesChange', this.observatoriesChangeListener);
  	  this.observatoriesChangeListener = null;
  	  document.removeEventListener('allObservatories', this.allObservatoriesListener);
 	  this.allObservatoriesListener = null;
  }

}

</script>

<style>
[id="bcmtmap"]{
  width:100%;
  min-height:400px;
}
</style>