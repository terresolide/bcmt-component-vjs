<i18n>
{
   "en":{
       "no_observatories": "No observatory"
   },
   "fr":{
        "no_observatories": "aucun observatoire"
   }
}
</i18n>
<template>
	<span class="bcmt-observatories">
	<formater-select name="observatories" multiple="true" :width="width" :options="obsString" associative="true" v-if="observatories"></formater-select>
	<p class="error-message">{{ $t('no_observatories') }}</p>
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
            default: "https://rawgit.com/terresolide/bcmt-component-vjs/master/data/observatories.json"
        }
    },
    data(){
        return {
            obsString: "['AAE', 'CCD']",
            observatories:null
        }
    },
    methods:{
        getObservatories(){
            this.$http.get( this.obsurl).then( 
                    response => {this.addObservatories( response)},
                    response => {this.noObservatories( response)});
        },
        addObservatories(response){
            var type = response.headers.get('Content-Type');
            console.log( type);
            console.log( response);
        },
        noObservatories( response){
            this.observatories = null
        }
    },
    created: function(){
        this.getObservatories();
         this.$i18n.locale = this.lang;
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

</style>