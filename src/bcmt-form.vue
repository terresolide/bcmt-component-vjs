<i18n>
{
   "en":{
       "time_slot": 	"time slot",
       "output_format": "Output Format",
       "search": "Search",
       "observatories": "observatories",
       "data_interval": "data interval",
       "second":	"second",
       "minute": "minute",
       "hour": "hour",
       "day": "day",
       "month": "month"
   },
   "fr":{
        "time_slot": 	"intervalle de temps",
        "output_format": "Format de sortie",
        "search": "Rechercher",
        "observatories": "observatoires",
         "data_interval": "Fréquence des données",
         "second":	"seconde",
       "minute": "minute",
       "hour": "heure",
       "day": "jour",
       "month": "mois"
   }
}
</i18n>

<template>	
	<div class="bcmt-container">
	<form id="bcmt-form" >
		<formater-search-box header-icon-class="fa fa-bars" :title="$t('observatories')" deployed="true">
			<formater-select  name="obsCode" options="['AAE', 'AMS', 'BNG']" width="260px" ></formater-select>
			<bcmt-observatories width="260px" :lang="lang"></bcmt-observatories>
		</formater-search-box>
		<formater-search-box header-icon-class="fa fa-calendar" :title="$t('time_slot')" >	
			 <formater-temporal-search :lang="lang"></formater-temporal-search>
		</formater-search-box>
		<formater-search-box header-icon-class="fa fa-clock-o" :title="$t('data_interval')" deployed="true">	
		 	<formater-select type="associative" name="DataInterval" :options="dataInterval" defaut="min" width="260px" ></formater-select> 
		</formater-search-box>
		<formater-search-box header-icon-class="fa fa-file" :title="$t('output_format')" deployed="true">
			<formater-select name="format" options="['IAGA2002']" width="260px"></formater-select>
	    </formater-search-box>
	    <a id="download" href="#" style="display=none;" download="bcmt_data.zip"></a>
	    <div class= "bcmt-buttons" >
	    <input class="bcmt-search-button" type="button" :value="$t('search')" @click="search"/>
	    </div>
	</form>
	</div>
</template>



<script>


export default {

  props:{
	  info:{
	      type:String,
	      default:null
	  },
      lang: {
          type: String,
          default: 'fr'
      },
      url:{
          type: String,
          default: 'http://service.test/bcmt.php'
      }
      
  },
  computed:{
      dataInterval(){
          var interval = JSON.stringify({
              sec: this.$i18n.t('second'),
              min: this.$i18n.t('minute'),
              hor: this.$i18n.t('hour'),
              day: this.$i18n.t('day'),
              mon:this.$i18n.t('month')
          }).replace(/"/g, "'");
          return interval;
      }
  },
  data(){
      return {
                  
	              format:'IAGA2002',
	              test:'rein' ,
	              user:null,
	            
	              aerisThemeListener:null,
	              theme:null
      }
  },
  methods: {
      	
		search(){
		    if( ! this.user ){
		        
		    }
		    var e = new CustomEvent("aerisSearchEvent", { detail: {}});
			document.dispatchEvent(e);

		   if(e.detail.error){
		       return;
		   }

		   var url = this.url + '?' + this.$buildQuery( e.detail );

		   this.$http.get(url, e.detail).then(response => {
		        this.handleSuccess(response)
		      }, response => {
		        this.handleError(response)
		      });
		  
	            
		  // this.$el.querySelector('#download').href = url;
		 
		  
		  // this.$el.querySelector('#download').click();
		//   e.stopPropagation();
		    
		},
		
		isValid: function (query){
		    
		},
		handelSuccess: function(rep){
		    
		},
		handleError: function(rep){
		    
		},
		handleTheme: function(theme) {
		  		this.theme = theme.detail
				this.ensureTheme()
		},
		  	
		 ensureTheme: function() {
		  	if ((this.$el) && (this.$el.querySelector)) {
		  		this.$el.querySelector(".bcmt-search-button").style.background= this.theme.primary;
		  		var color1 = this.$shadeColor( this.theme.primary, 0.1); //lightcolor
		  		var color2 = this.$shadeColor( this.theme.primary, -.1); //dark color
		  		this.$el.querySelector(".bcmt-search-button").style.borderColor= color1 + ' '+ color2 + ' ' + color2;
		  	}
		 },
	  	 reverse: function(){
	  	      var n= '';
	  	      for( var i=this.user.length-5; i >= 0; i--){
	  	          n       +=     this.user.charAt(i);
	  	      }
	  	  	  return n;
	  	  },
	  	  saveUser: function(rep){
	  	      this.user = rep.body;
	  	  }
	},
	
  created: function(){
      this.$i18n.locale = this.lang;
      //search user used for request
      if(this.info != null){
      	this.user = this.info;
      }else{
         
          this.$http.get('/user.txt', {}).then(response=>{ this.saveUser(response)},response=>{console.log("no user")});
      }
      this.aerisThemeListener = this.handleTheme.bind(this) 
      document.addEventListener('aerisTheme', this.aerisThemeListener);
 
  },
  mounted: function(){
   
     var event = new CustomEvent('aerisThemeRequest', {});
    	document.dispatchEvent(event);
  },
  destroyed: function(){
      document.removeEventListener('aerisTheme', this.aerisThemeListener);
      this.aerisThemeListener = null;
  }
}

</script>

<style>
.bcmt-container h1,
.bcmt-container h2,
.bcmt-container h3,
.bcmt-container h4,
.bcmt-container h5,
.bcmt-container h6{
    color: #fff;
}
.bcmt-container #isgi-form{
	width:280px;
	height:700px;
}

.bcmt-container .isgi-buttons{
    margin-top:10px;
	text-align:right;
}
.bcmt-container .bcmt-buttons input[type="button"]{
/*	font-family:  "Dejavu serif";*/
	margin: 0px 0px 3px 7px;
  padding: 3px 12px;
  /*white-space: normal;*/
  text-align: center;
/*  background: #DD9946;*/
  border-width: 1px;
  border-style: solid;
  border-radius: 1px;
  font-size: 16px;
 /* font-weight:bold;*/
  line-height:1.7;
  border-color: #e5b171 #cb8025 #cb8025;
  color: #fff;
  text-decoration: none;
 /* text-shadow: 0 -1px 1px #a0651d, 1px 0 1px #cb8025, 0 1px 1px #cb8025, -1px 0 1px #a0651d;*/
  vertical-align: top;
  cursor: pointer;
  pointer-events: auto;
  box-sizing: border-box;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}
.bcmt-container input[type="button"]::first-letter{
	text-transform: uppercase;
}



</style>