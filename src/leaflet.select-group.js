/**
 * 
 */
L.SelectGroup = L.Class.extend({
	iconMarker:null,
	iconSelected:null,
	allElementsListener:null,
	elementsChangeListener:null,
	markers:[],
	bounds:[],
	map:null,
	options:{
		defaultIcon :{ icon: 'circle', prefix: 'fa', markerColor: 'orange'}, 
	
	},
	initialize: function( name, map, options ){
		this.name = name;
		this.map = map;
		var iconOptions =  this.options.defaultIcon;
		if( options.iconMarker){
			iconOptions = Object.assign( iconOptions ,  options.iconMarker);
		}
		this.iconMarker = new L.AwesomeMarkers.icon( iconOptions);
		
		var iconOptions = { icon: 'circle', prefix: 'fa', markerColor: 'red'};
		if(options.iconSelected){
			iconOptions = Object.assign( iconOptions,  options.iconSelected);
		}
		this.iconSelected = new L.AwesomeMarkers.icon( iconOptions);
		
		 this.elementsChangeListener = this.updateMarkers.bind(this) 
	      document.addEventListener(this.name + 'ElementsChange', this.elementsChangeListener);
	      this.allElementsListener = this.addMarkers.bind(this) 
	      document.addEventListener( this.name + 'AllElements' , this.allElementsListener);
	      var event = new CustomEvent( this.name + 'Request', {});
	      document.dispatchEvent(event);
	},
	
	addMarkers: function(ev){
		var componentName = this.name;
		 for(var key in ev.detail){
	           var marker = new L.Marker(
	                 ev.detail[key].location,
	                {icon: this._iconMarker,
	                 name: key,
	                 selected:false,
	                 title: ev.detail[key].name[this.lang]});
	           
	           this._bounds.push( ev.detail[key].location );
	           marker.on('click', function( e ){
	       	      var event = new CustomEvent('selectMarkerEvent', { detail:{ component: componentName, name: this.options.name}});
	       	      document.dispatchEvent(event);
	       	        
	       	    })
	       	   
	           marker.addTo( this.map);
	           this.markers[ key] = marker;
	         //	this.observatoriesMarkers[key] = marker;
	       }
	       this.map.fitBounds( this._bounds);
	},
	updateMarkers: function (ev){
		  var iconSelected = this.iconSelected;
    	   var iconMarker = this.iconMarker;
     	    for(var key in this.observatoriesMarkers){
     	    	if( ev.detail && ev.detail[0].indexOf(key)>-1 ){
     	    		this.markers[key].setIcon(iconSelected);
     	    	}else{
     	    		this.markers[key].setIcon(iconMarker);
     	    	}
     	    }
	}
})