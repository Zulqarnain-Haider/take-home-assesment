import * as tsx from "vue-tsx-support";
import styles from "./advanceInput.module.css";
import store from "../store/index";
import { component } from "vue/types/umd";

export default tsx.component({
  name: "AdvanceInput",
  props: {
    inputType: {
      type: String,
      required: true,
    },
    inputIcon: {
      type: Array,
      required: true,
    },
    dropdownButtonHover: {
      type: Boolean,
      required: true,
    },
    dropdownButtonActive: {
      type: Boolean,
      required: true,
    },

    dropdownButtonClicked: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isFieldInFocus: false,
      isFieldValid: false,
      urlRegExp: new RegExp(
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
      ),
      emailRegExp: new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
      phoneNoRegExp: new RegExp(
        /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
      ),
      advInputData: "",

      //   isFieldInFocus: {
      //     default: false,
      //     type: Boolean,
      //     required: true,
      // },
      // isFieldValid: {
      //     default: false,
      //     type: Boolean,
      //     required: true,
      // },
      // urlRegExp: {
      //     default: new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/),
      //     type: RegExp
      // },
      // emailRegExp: {
      //     default: new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
      //     type: RegExp
      // },
      // phoneNoRegExp:{
      //     default: new RegExp(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/),
      //     type: RegExp
      // },
      // advInputData:{
      //     default: '',
      //     type: String
      // }
    };
  },
  methods: {
    changeDropdownStatus(): void {
      store.getters.getDropdownStatus
        ? store.dispatch("setDropdownStatus", false)
        : store.dispatch("setDropdownStatus", true);
    },

    onAdvInputFocus(): void {
      this.isFieldInFocus = true;
    },

    validateInput(): boolean {
      if (this.inputType === "URL") {
        this.isFieldValid = this.urlRegExp.test(this.advInputData);
      } else if (this.inputType === "EMAIL") {
        this.isFieldValid = this.emailRegExp.test(this.advInputData);
      } else {
        this.isFieldValid = this.phoneNoRegExp.test(this.advInputData);
      }

      return this.isFieldValid;
    },

    verifyInput(): void {
      if (this.isFieldValid) {
        this.isFieldInFocus = false;
      } else {
        this.isFieldInFocus = true;
      }
    },

    clearInput(): void {
      this.advInputData = "";
      this.isFieldValid = true;
      this.isFieldInFocus = false;
    },

    openInputData(): void {
      if (this.isFieldValid) {
        if (this.inputType === "URL") {
          window.open(`${this.advInputData}`, "_blank");
        } else if (this.inputType === "EMAIL") {
          window.location.href = `mailto:${this.advInputData}`;
        } else {
          window.open(`tel:${this.advInputData}`);
        }
      }
    },
  },
  render() {
    return (
      <div class={styles.advInputWrap}>
        {!this.isFieldInFocus && (
          <button
            onClick={() => this.changeDropdownStatus()}
            class={`${styles["popupBtn"]} ${styles["urlBtn"]}
                  ${
                    this.dropdownButtonHover ? styles["dropdownBtnHovered"] : ""
                  } ${
              this.dropdownButtonActive ? styles["dropdownBtnActive"] : ""
            } ${this.dropdownButtonClicked ? styles["dropdownBtnActive"] : ""}`}
          >
            <span class={styles.leftMenuIcon}>
              <font-awesome-icon icon={this.inputIcon} />
            </span>
          </button>
        )}

        <input
          type={["text"]}
          class={styles.advInput}
          placeholder={this.inputType}
          vModel={this.advInputData}
          onFocus={() => this.onAdvInputFocus()}
          onInput={() => this.validateInput()}
        />

        {this.isFieldValid && !this.isFieldInFocus && (
          <div>
            <button
              class={`${styles["popupBtn"]} ${styles["extBtn"]}`}
              onClick={() => this.openInputData()}
              disabled={!this.advInputData}
            >
              <span class={styles.leftMenuIcon}>
                <font-awesome-icon icon={["fas", "external-link-alt"]} />
              </span>
            </button>
          </div>
        )}

        {this.isFieldInFocus && (
          <div class={styles.displayInherit}>
            <button
              class={`${styles["popupBtn"]} ${styles["checkBtn"]}
                ${
                  this.isFieldInFocus && !this.isFieldValid
                    ? styles["checknotValid"]
                    : ""
                }`}
              onClick={() => this.verifyInput()}
            >
              <span class={styles.leftMenuIcon}>
                <font-awesome-icon icon={["fas", "check"]} />
              </span>
            </button>

            <button
              class={`${styles["popupBtn"]} ${styles["crossBtn"]}`}
              onClick={() => this.clearInput()}
            >
              <span class={styles.leftMenuIcon}>
                <font-awesome-icon icon={["fas", "times"]} />
              </span>
            </button>
          </div>
        )}
      </div>
    );
  },
});
