import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    isDropDownOpen: false
  },

  getters: {
    getDropdownStatus(state: any) : boolean {
      return state.isDropDownOpen;
    }

  },

  mutations: {

    SET_DROPDOWN_STATUS(state: any, dropDownStatus) : void {
      state.isDropDownOpen = dropDownStatus;
    }

  },

  actions: {

    setDropdownStatus(context: any, dropDownStatus) : void {
      context.commit('SET_DROPDOWN_STATUS', dropDownStatus);
    }

  },

  modules: {
  }

})
