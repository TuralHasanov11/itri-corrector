<template>
    <div class="select-corrector">
        <div ref="selectRoc" class="offcanvas offcanvas-end" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" :data-bs-scroll="true" id="selectROCOffcanvas" aria-labelledby="selectROCOffcanvasLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="selectROCOffcanvasLabel">Qoşulan ROC-ların siyahısı</h5>
                <a data-bs-dismiss="offcanvas" class="btn-close text-reset"  aria-label="Close"></a>
            </div>
            <div class="offcanvas-body">
                <form @submit="()=>{return false}">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="rocSearchInput">@</span>
                        <input type="text" style="display: none;">
                        <input type="text" v-model="search" class="form-control" placeholder="Axtar" aria-describedby="rocSearchInput" @keyup.prevent="searchCorrector" >
                    </div>
                </form>

                <ul class="list-group list-group-flush overflow-scroll" style="height:75vh">
                    <li v-for="(roc,index) in search?searchedCorrectors:correctors" :key="index" class="list-group-item justify-content-between d-flex">
                        <span class="roc-name">{{index+1}}. {{roc.name}}</span> 
                        <span class="badge" role="button"
                            :class="[isSelected(roc) ? 'bg-success' : 'bg-danger']"
                            :title="isSelected(roc)?'Aktiv et':'Deaktive et'"
                            @click="selectRoc(roc)" 
                        >
                            {{isSelected(roc)?'Aktiv':'Deaktiv'}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'SelectCorrector',
    props:{
        correctors:{
            type:Array,
            default:()=>{
                return []
            },
        },

        selectedCorrectors:{
            type:Array,
            default:()=>{
                return []
            },
        },

        searchedCorrectors:{
            type:Array,
            default:()=>{
                return []
            },
        },
    },

    data(){
        return {
            search:null,
        }
    },

    methods:{
        selectRoc(roc){
            this.$emit('selectRoc', roc)
        },

        isSelected(roc){
            const index = this.selectedCorrectors.findIndex((element)=>{ 
                return element.id === roc.id
            })

            return index >= 0
        },

        searchCorrector(){
            this.$store.commit('corrector/searchCorrector', this.search)
        }
    }
}
</script>
