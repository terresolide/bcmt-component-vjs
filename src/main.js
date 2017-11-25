require("exports-loader?!./l.min.js")

import Vue from 'vue';

import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

//pour la traduction 
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

//@todo use aeris-mixins instead of isgi-tools.js
/*import IsgiTools from './isgi-tools.js';
Vue.use(IsgiTools);*/
const formaterPlugin = {
        install(Vue, options) {
            Vue.prototype.$shadeColor= function(color, percent) {  
                     var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
                     // return "red";
                     return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
            }
            
        }
};

Vue.use( formaterPlugin);




//@todo find better solution for import component from another repository....
//import FormaterLayout from '../../formater-commons-components-vjs/src/formater-layout.vue';
//import FormaterSelect from '../../formater-commons-components-vjs/src/formater-select.vue';
//import FormaterSearchBox from '../../formater-commons-components-vjs/src/formater-search-box.vue';
//import FormaterTemporalSearch from '../../formater-commons-components-vjs/src/formater-temporal-search.vue';
import BcmtForm from './bcmt-form.vue';

import BcmtObservatories from './bcmt-observatories.vue';
// import BcmtComponent from './bcmt-component.vue';
import BcmtMap from './bcmt-map.vue';

ljs.addAliases({
	dep: [//'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 
	  //  'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js',
	  // 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js',
	  //  'https://cdnjs.cloudflare.com/ajax/libs/moment-range/3.0.3/moment-range.min.js',
	  //  'https://cdn.rawgit.com/aeris-data/aeris-commons-components-vjs/0.1.23/dist/aeris-commons-components-vjs_0.1.23.js'
	  
	    //'https://rawgit.com/lvoogdt/Leaflet.awesome-markers/master/dist/leaflet.awesome-markers.css',
	    'https://rawgit.com/epointal/lf-hiker/master/lib/awesome-marker/leaflet.awesome-markers.css',
	    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.css',
	    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.js',
	    //awesome marker old version...
	   // 'https://rawgit.com/lvoogdt/Leaflet.awesome-markers/master/dist/leaflet.awesome-markers.min.js',
	    'https://rawgit.com/epointal/lf-hiker/master/lib/awesome-marker/leaflet.awesome-markers.min.js',
	    
	    //formater commons components from build
	    //'http://localhost:8080/dist/build.js',
	   'https://rawgit.com/terresolide/formater-commons-components-vjs/master/dist0/formater-commons-components-vjs.js' ,
	  //  'https://cdn.rawgit.com/aeris-data/aeris-commons-components-vjs/0.1.23/dist/aeris-commons-components-vjs_0.1.23.js'
		   
	    
	    ]
})
ljs.load('dep', function() {
	
 // le tableau des composants Aeris
    if (!window.registredAerisElements) {
        window.registredAerisElements = [];
    }
    
    function registerElement(name, component) {
       
        if (window.registredAerisElements.indexOf(name) < 0) {
            Vue.customElement(name, component);
            window.registredAerisElements.push(name)
        }
    }
    var componentUsed = [];
    var componentUsed = new Array('formater-select','formater-layout', 'aeris-datepicker');
   // var componentUsed = new Array( 'aeris-datepicker');
    var loaded = setInterval(function() {
        var result = componentUsed.filter( function( cpt){
            return window.registredAerisElements.indexOf(cpt)>-1;
        })
        if ( result.length == componentUsed.length) {
           console.log("Bcmt:  components loaded");
           load();
           clearInterval(loaded);
        }
     }, 100);
     function load(){
      
         
//         registerElement('formater-select', FormaterSelect);
//         registerElement('formater-temporal-search', FormaterTemporalSearch);
//         registerElement('formater-search-box', FormaterSearchBox);
//         registerElement('formater-layout', FormaterLayout);
    	
         registerElement('bcmt-observatories', BcmtObservatories);
    
        registerElement('bcmt-form', BcmtForm);
        registerElement('bcmt-map', BcmtMap);
       // registerElement('bcmt-component', BcmtComponent);
      
    
    }
	
})

