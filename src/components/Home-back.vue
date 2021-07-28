<template>
    <div class="container">

      <div class="container-dropdown" v-if="dropdownStatus">
        <div class="pop-up-btn-wrap">

          <div class="arrow-right"></div>

          <button 
            @click="setInputConfig('EMAIL', ['far', 'envelope'])" 
            :class="['pop-up-btn', 'email-btn', {'dropdown-hovered' : emailHovered }]"
          >
            <span class="left-menu-icon">
              <font-awesome-icon :icon="['far', 'envelope']" />
            </span>
            <span class="left-menu-text" > 
              Link to Email
            </span>
          </button>

          <button 
            @click="setInputConfig('URL', ['fas', 'link'])"
            :class="['pop-up-btn', 'url-btn', {'dropdown-hovered' : urlHovered }]"
          >
            <span class="left-menu-icon">
              <font-awesome-icon :icon="['fas', 'file']" />
            </span>
            <span class="left-menu-text" > 
              Link to URL 
            </span>
          </button>


          <button 
            @click="setInputConfig('PHONE', ['fas', 'mobile-alt'])"
            :class="['pop-up-btn', 'phone-btn', {'dropdown-hovered' : phoneHovered }]"
          >
            <span class="left-menu-icon">
              <font-awesome-icon :icon="['fas', 'mobile-alt']" />
            </span>
            <span class="left-menu-text" > 
              Link to Phone 
            </span>
          </button>

        </div>
      </div>

      <div class="container-input">
        <AdvanceInput 
          :inputType="advanceInput.type" 
          :inputIcon="advanceInput.icon"
          :dropdownButtonHover="dropdownButtonHover"
          :dropdownButtonActive="dropdownButtonActive"
          :dropdownButtonClicked="dropdownButtonClicked"
          ref="advanceInput"
        />
      </div>

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import AdvanceInput from './AdvanceInput-bck.vue';
import store from '../store/index'; // importing it this way, to use it with storybook 


@Component({
  components: {
    AdvanceInput,
  },
})

export default class Home extends Vue {

  @Prop({ default : { type: 'URL', icon: ['fas', 'link'] } }) private advanceInput!: any;
  @Prop() private getDropdownStatus!: boolean;

  @Prop() private urlHovered!: boolean;
  @Prop() private emailHovered!: boolean;
  @Prop() private phoneHovered!: boolean;
  @Prop() private dropdownButtonHover!: boolean;
  @Prop() private dropdownButtonActive!: boolean;
  @Prop() private dropdownButtonClicked!: boolean;


  public setInputConfig(inputType: string, inputIcon: Array<string>) : void {

    this.advanceInput.type = inputType;
    this.advanceInput.icon = inputIcon;

    store.dispatch('setDropdownStatus', false);
    this.$refs.advanceInput.clearInput();
  }

  public get dropdownStatus() {
    return this.getDropdownStatus || store.getters.getDropdownStatus;
  }

  public set dropdownStatus(value) {
    this.getDropdownStatus = value;
    store.getters.getDropdownStatus = value;
  }

}
</script>

<style scoped>

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
}

.container-dropdown {
  position: relative;
  right: 8px;
}

.pop-up-btn-wrap {
  position: relative;
  border-radius: 10px;
  width: 165px;
  border: 1px solid gray;
}

.pop-up-btn {
  width: 165px;
  background-color: white;
  height: 32px;
  padding: 0px;
  margin: 0px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.email-btn {
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.url-btn {
  border-radius: 0px;
}

.phone-btn {
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
}

.pop-up-btn:hover {
  background-color: #ececec;
}

.pop-up-btn:active {
  color:white;
  background-color: #6f6f6f;
}

.left-menu-icon {
  color: #4c4c4c;
  width: 20px;
  padding: 0px 0px 0px 5px;
}

.left-menu-text {
  color: #4c4c4c;
  padding: 0px 10px 0px 13px;
}

.pop-up-btn:active .left-menu-icon{
  color:white;
}

.pop-up-btn:active .left-menu-text{
  color:white;
}

.arrow-right {
  position: absolute;
  width: 0; 
  height: 0;
  top: 41px;
  left: 165px; 
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid #9c9c9c;
}

.dropdown-hovered {
  background-color: #ececec;
}

</style>