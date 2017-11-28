<i18n>
{
   "en":{
   },
   "fr":{
   }
}
</i18n>
<template>
<span>
<div>truc muche</div>
<formater-layout >
		<header>
	<h1>Bureau Central de Magnétisme Terrestre</h1>

	</header>
  
	<div class="formater-wrapper">
	
		<aside>
		<div>
			<bcmt-form :lang="lang"></bcmt-form>
			</div>
			
		</aside>
		<main>
			<bcmt-map :lang="lang"></bcmt-map>

		</main>
  	</div>
	<footer>
	</footer>
	</formater-layout>
	
	</span>
</template>
<script>
export default {
    props:{
        lang: {
            type:String,
            default:'fr'
        }
    },
    created(){
        this.$i18n.locale = this.lang;
    }
}
</script>
