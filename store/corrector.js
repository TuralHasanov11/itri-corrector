import axios from 'axios'

export const state = () => ({
    corrector:{},
    correctors:[],
    selectedCorrectors:[],
    searchedCorrectors:[],
})
  
export const mutations = {
    setCorrector(state, data){
        state.corrector = data
    },

    setCorrectors(state, data){
        state.correctors = data
    },

    addCorrector(state, data){
        state.selectedCorrectors.push(data)
    },

    removeCorrector(state, data){
        state.selectedCorrectors = state.selectedCorrectors.filter(el => el.id !== data)
    },

    searchCorrector(state, data){
        if(data.length>0){
            state.searchedCorrectors = state.correctors.filter(el => {
                return el.name.toLowerCase().includes(data.toLowerCase())
            })
        }
    }
}

export const actions = {
    async getCorrector({commit}, id){
        const {data} = await axios.get(`http://www.filltext.com/?rows=1&id={index}}&name={business}&temperature={numberLength|5}&pressure_diff={numberLength|5}&pressure={numberLength|5}&current_consumption={numberLength|5}&daily_consumption={numberLength|5}&yesterday_consumption={numberLength|5}&current_energy={numberLength|5}&info_date={date}&pretty=true`)
        commit('addCorrector', {...data[0], id})
    },

    async getCorrectors({commit}){
        const {data} = await axios.get(`http://www.filltext.com/?rows=10&id={index}}&name={business}&temperatue={numberLength|5}&pressure_diff={numberLength|5}&pressure={numberLength|5}&current_consumption={numberLength|5}&daily_consumption={numberLength|5}&yesterday_consumption={numberLength|5}&current_energy={numberLength|5}&info_date={date}&pretty=true`)
        commit('setCorrectors', data)
    },
}

export const getters = {
    correctors:(state)=>state.correctors,
    corrector:(state)=>state.corrector,
    selectedCorrectors:(state)=>state.selectedCorrectors,
}