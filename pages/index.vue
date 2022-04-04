<template>
  <div class="home">
    
    <Loading v-if="$fetchState.pending"></Loading>

    <div class="container">
      <div v-if="selectedCorrectors.length==0" class="row justify-content-center align-items-center flex-column">
            <h4 class="text-center">Monitoring üçün ROC seçilməyib. Real vaxt rejimində izləmək istədiyiniz ROC-u seçin</h4>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#selectROCOffcanvas" aria-controls="selectROCOffcanvas">
                ROC seç
            </button>
            
      </div>
      <div v-else class="py-4 row">
          <div class="row justify-content-between">
                <div class="col-12 col-sm-10">
                    <div class="d-flex flex-row flex-wrap">
                        <div v-for="(corrector, index) in selectedCorrectors" :key="index" 
                            class="alert alert-primary alert-dismissible fade show rounded-pill mx-1" role="alert"
                        >
                        <strong>{{corrector.name}}</strong>
                            <button @click="removeCorrector(corrector)" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-2">
                    <button class="btn btn-success rounded-pill" data-bs-toggle="offcanvas" data-bs-target="#selectROCOffcanvas" aria-controls="selectROCOffcanvas">
                        + Əlavə et
                    </button>   
                </div>
          </div>
        <hr>
        <div v-for="(corrector, index) in selectedCorrectors" :key="index" class="col-12 col-sm-6 col-md-4 my-2">
            <div class="card">
                <div class="card-header fw-bolder">
                {{corrector.name}}
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="text-muted roc-attr-name">Təzyiqlər fərqi (kPa):</span> 
                        <span class="fw-bold">{{corrector.pressure_diff}}</span>
                    </li>
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="text-muted roc-attr-name">Təzyiq (kPa):</span> 
                        <span class="fw-bold">{{corrector.pressure}}</span>
                    </li>
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="text-muted roc-attr-name">Temperatur (C):</span> 
                        <span class="fw-bold">{{corrector.temperature}}</span>
                    </li>
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="text-muted roc-attr-name">Cari sərf (min m<sup>3</sup> ):</span> 
                        <span class="fw-bold">{{corrector.current_consumption}}</span>
                    </li>
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="text-muted roc-attr-name">Günlük sərf (min m<sup>3</sup> ):</span> 
                        <span class="fw-bold">{{corrector.daily_consumption}}</span>
                    </li>
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="text-muted roc-attr-name">Dünənki sərf (min m<sup>3</sup> ):</span> 
                        <span class="fw-bold">{{corrector.yesterday_consumption}}</span>
                    </li>
                    <li class="list-group-item justify-content-between d-flex">
                        <span class="text-muted roc-attr-name">Cari enerji (GJ/gün):</span> 
                        <span class="fw-bold">{{corrector.current_energy}}</span>
                    </li>
                </ul>
            </div>
            </div>
        </div>
      </div>

        <SelectCorrector :correctors="correctors" :selectedCorrectors="selectedCorrectors" :searchedCorrectors="searchedCorrectors" @selectRoc="getRoc"/>
    </div>

  </div>
</template>

<script>
import SelectCorrector from '../components/corrector/SelectCorrector.vue';

export default {
    name: "IndexPage",
    
    components: { SelectCorrector },
    
    scrollToTop: true,
    
    async fetch() {
        await this.$store.dispatch("corrector/getCorrectors")
    },

    fetchDelay: 1000,

    head() {
        return {
            title: "Corrector App",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Get all the corrector data",
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "corrector",
                },
            ]
        };
    },
    computed: {
        selectedCorrectors(){
            return this.$store.state.corrector.selectedCorrectors
        },

        correctors(){
            return this.$store.state.corrector.correctors
        },

        searchedCorrectors(){
            return this.$store.state.corrector.searchedCorrectors
        }
    },
    
    methods:{
        getRoc(roc){
            this.$store.dispatch('corrector/getCorrector', roc.id)
        },

        removeCorrector(corrector){
            this.$store.commit('corrector/removeCorrector', corrector.id)
        },
    }
}
</script>
