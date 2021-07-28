<template>
  <div :class="[
    'adv-input-wrap', 
    { 'not-valid' : !isFieldValid } ]"
  >

    <button
      :class="['pop-up-btn', 'url-btn', {'dropdown-btn-hovered' : dropdownButtonHover }, {'dropdown-btn-active' : dropdownButtonActive }, {'dropdown-btn-active' : dropdownButtonClicked }]"
      v-if="!isFieldInFocus" @click="changeDropdownStatus"
    >
      <span class="left-menu-icon">
        <font-awesome-icon :icon="inputIcon" />
      </span>
    </button>

    <input 
      type="text"
      :class="['adv-input']" 
      :placeholder="inputType"
      v-model="advInputData" 
      @focus="onAdvInputFocus" 
      @input="validateInput" 
    />

    <template v-if="isFieldValid && !isFieldInFocus">
      <button class="pop-up-btn ext-btn" @click="openInputData" :disabled="!advInputData">
        <span class="left-menu-icon">
          <font-awesome-icon :icon="['fas', 'external-link-alt']" />
        </span>
      </button>
    </template>


    <template v-if="isFieldInFocus">
      <button :class="[
        'pop-up-btn', 
        'check-btn',
        {'check-not-valid': isFieldInFocus && !isFieldValid }]"
        @click="verifyInput"
      >
        <span class="left-menu-icon">
          <font-awesome-icon :icon="['fas', 'check']" />
        </span>
      </button>

      <button class="pop-up-btn cross-btn"
        @click="clearInput"
      >
        <span class="left-menu-icon">
          <font-awesome-icon :icon="['fas', 'times']" />
        </span>
      </button>
    </template>

  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '../store/index'; // importing it to use it with storybook 

@Component
export default class AdvanceInput extends Vue {

  @Prop() private inputType!: string;
  @Prop() private inputIcon!: Array<string>;
  @Prop() private dropdownButtonHover!: boolean;
  @Prop() private dropdownButtonActive!: boolean;
  @Prop() private dropdownButtonClicked!: boolean;

  public isFieldInFocus: boolean = false;
  public isFieldValid: boolean = true;

  public advInputData: string = '';

  public urlRegExp: RegExp =  new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/);
  public emailRegExp: RegExp =  new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  public phoneNoRegExp: RegExp =  new RegExp(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/);


  changeDropdownStatus() : void {
    store.getters.getDropdownStatus ? store.dispatch('setDropdownStatus', false) : store.dispatch('setDropdownStatus', true); 
  }

  onAdvInputFocus() : void {
    this.isFieldInFocus = true;
  }

  validateInput() : boolean {

    if(this.inputType === 'URL')
    {
      this.isFieldValid = this.urlRegExp.test(this.advInputData);
    }
    else if(this.inputType === 'EMAIL')
    {
      this.isFieldValid = this.emailRegExp.test(this.advInputData);
    }
    else
    {
      this.isFieldValid = this.phoneNoRegExp.test(this.advInputData);
    }

    return this.isFieldValid;
  }


  verifyInput() : void {

    if (this.isFieldValid) 
    {
      this.isFieldInFocus = false;
    }
    else
    {
      this.isFieldInFocus = true;
    }
  }

  clearInput() : void {
    this.advInputData = '';
    this.isFieldValid = true;
    this.isFieldInFocus = false;
  }


  openInputData(): void {

    if(this.isFieldValid)
    {
      if(this.inputType === 'URL')
      {
        window.open(`${this.advInputData}`, '_blank');
      }
      else if(this.inputType === 'EMAIL')
      {
        window.location.href = `mailto:${this.advInputData}`;
      }
      else
      {
        window.open(`tel:${this.advInputData}`);
      }
    }
  }

}
</script>


<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped>

.adv-input-wrap {
  display: flex;
  border: 1px solid #4c4c4c;
  border-radius: 5px;
}

.adv-input {
  height: 30px;
  padding: 5px 5px 5px 15px;
  width: 200px;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.adv-input:focus-visible{
  outline: unset;
}

.pop-up-btn {
  width: 35px;
  height: 42px;
  background-color: rgb(243, 243, 243);
  margin: 0px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4c4c4c;
}

.url-btn {
  font-size: 17px;
  padding: 5px 10px 5px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.ext-btn {
  font-size: 17px;
  padding: 5px 10px 5px 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.url-btn:hover  {
  background-color: #d8d8d8;
}

.ext-btn:hover  {
  background-color: #d8d8d8;
}

.url-btn:active {
  color:white;
  background-color: #6f6f6f;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.ext-btn:active {
  color:white;
  background-color: #6f6f6f;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.check-btn {
  font-size: 17px;
  padding: 5px 10px 5px 10px;
}

.cross-btn {
  font-size: 17px;
  padding: 5px 10px 5px 10px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
}

.check-btn:hover {
  background-color: #ececec;
}

.cross-btn:hover {
  background-color: #ececec;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.check-btn:active {
  color:white;
  background-color: #6f6f6f;
}

.cross-btn:active {
  color:white;
  background-color: #6f6f6f;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.not-valid {
  border: 1px solid #df5127;
}

.check-not-valid {
  background-color: #df5127;
  color: white;
}

.check-btn.check-not-valid:hover {
  background-color: #df5127;
}

.check-btn.check-not-valid:active {
  background-color: #e04616;
}

.dropdown-btn-hovered {
  background-color: #d8d8d8;
}

.dropdown-btn-active {
  color:white;
  background-color: #6f6f6f;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.dropdown-btn-clicked {
  color:white;
  background-color: #6f6f6f;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

:disabled{
  opacity: 0.7;
  cursor:not-allowed
}
</style>