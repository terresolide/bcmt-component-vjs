<i18n>
{
   "en":{
       "no_observatories": "No observatory",
       "unreadable_observatories": "The observatories file is unreadable",
       "not_found_observatories": "Observatories file not found"
   },
   "fr":{
        "no_observatories": "aucun observatoire",
        "unreadable_observatories": "Le fichier des observatoires est illisible",
         "not_found_observatories": "Le fichier des observatoires est introuvable"
   }
}
</i18n>
<template>
	<span class="bcmt-observatories">
	<formater-select name="observatories" multiple="true" :width="width" :options="obsString" :size="computedSize" type="associative" v-if="observatories"  @input="observatoriesChange"></formater-select>
	<p class="error-message" v-else>{{ $t(errorMsg )}}</p>
	</span>
</template>
<script>
export default {
    props:{
        width:{
            type:String,
            default:"auto"
        },
        lang: {
            type:String,
            default:'fr'
        },
        obsurl: {
            type:String,
        	default: "data/observatories.json"
            //default: "https://rawgit.com/terresolide/bcmt-component-vjs/master/data/observatories.json"
        },
        size: {
            type:String,
            default:null
        }
    },
    data(){
        return {
            obsString: "['AAE', 'CCD']",
            observatories:null,
            errorMsg:'no_observatories',
            computedSize: 'auto',
            observatoriesRequestListener:null,
            selectMarkerObservatoryListener:null
        }
    },
    methods:{
       
        getObservatories(){
            this.$http.get( this.obsurl).then( 
                    response => {this.addObservatories( response)},
                    response => {this.noObservatories( response)});
        },
        addObservatories(response){
            try{
            	this.observatories = JSON.parse(response.bodyText);
            	console.log('length='+Object.keys(this.observatories).length);
            	this.obs2string();
            	this.computeSize();
            	this.observatoriesRequest();
            	//event observatories for map
            }catch(e){
                this.observatories = null;
                this.errorMsg = 'unreadable_observatories'
            }
            
        },
        noObservatories( response){
            switch(response.status){
            case 404:
                this.errorMsg = "not_found_observatories";
                break;
            default:
                this.errorMsg = 'unreadable_observatories';
            }
           
            this.observatories = null
        },
        observatoriesChange(ev){
            console.log(ev.detail);
            console.log( this.values);
            var event = new CustomEvent('observatoriesChange', {detail:ev.detail});
           // event.detail = ev.detail;
            document.dispatchEvent(event);
        },
        observatoriesRequest(){
            if(this.observatories ){
                var event = new CustomEvent('allObservatories', {detail:this.observatories});
                // event.detail = ev.detail;
                 document.dispatchEvent(event);
            }
        },
        obs2string(){
            var options = {};
        	for(var key in this.observatories){
        	    options[key ] = "<span>"+key + "</span> " + this.observatories[key].name[this.lang] + " - " + this.observatories[key].country[this.lang];      
        	}
        	this.obsString =JSON.stringify( options).replace(/"/g, "'");
        },
        computeSize(){
            if( !this.size ){
                this.computedSize = Object.keys(this.observatories).length;
            }
        }
    },
    created: function(){
        this.getObservatories();
        this.$i18n.locale = this.lang;
        this.observatoriesRequestListener = this.observatoriesRequest.bind(this) 
        document.addEventListener('observatoriesRequest', this.observatoriesRequestListener);
    },
    destroyed(){
        document.removeEventListener('observatoriesRequest', this.observatoriesRequestListener);
		this.observatoriesRequestListener = null;
    }
   
}
</script>
<style>
.bcmt-observatories{
}
.error-message::first-letter{
	text-transform: uppercase;
}
.bcmt-observatories .error-message {
    font-size: 12px;
    color: red;
   
}
.bcmt-observatories span{
	font-weight:800;
}
</style>