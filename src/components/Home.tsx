import * as tsx from "vue-tsx-support";
import styles from "./homeStyle.module.css";
import store from "../store/index";
import AdvanceInput from "./AdvanceInput";

export default tsx.component({
  name: "App",
  props: {
    urlHovered: {
      type: Boolean,
      required: true,
    },
    emailHovered: {
      type: Boolean,
      required: true,
    },
    phoneHovered: {
      type: Boolean,
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
    getDropdownStatus: {
      type: Boolean,
      required: true,
    },
    advanceInput: {
      default: { type: "URL", icon: ["fas", "link"] },
    },
  },
  computed: {
    dropdownStatus: {
      get: function() {
        return this.getDropdownStatus || store.getters.getDropdownStatus;
      },
      set: function(value) {
        // this.getDropdownStatus = value;
        store.getters.getDropdownStatus = value;
      },
    },
  },
  methods: {
    setInputConfig(inputType: string, inputIcon: Array<string>): void {
      this.advanceInput.type = inputType;
      this.advanceInput.icon = inputIcon;

      store.dispatch("setDropdownStatus", false);
      // this.$refs.advanceInput.clearInput();
    },
  },
  render() {
    return (
      <div class={styles.container}>
        {this.dropdownStatus && (
          <div class={styles.containerDropdown}>
            <div class={styles.popupBtnWrap}>
              <div class={styles.arrowRight}></div>
              <button
                onClick={() =>
                  this.setInputConfig("EMAIL", ["far", "envelope"])
                }
                class={` ${styles["popupBtn"]} ${styles["phoneBtn"]} ${
                  this.emailHovered ? styles["dropdownHovered"] : ""
                }`}
              >
                <span class={styles.leftMenuIcon}>
                  <font-awesome-icon icon={["far", "envelope"]} />
                </span>
                <span class={styles.leftMenuText}>Link to Email</span>
              </button>

              <button
                onClick={() => this.setInputConfig("URL", ["fas", "link"])}
                class={` ${styles["popupBtn"]} ${styles["phoneBtn"]} ${
                  this.urlHovered ? styles["dropdownHovered"] : ""
                }`}
              >
                <span class={styles.leftMenuIcon}>
                  <font-awesome-icon icon={["fas", "file"]} />
                </span>
                <span class={styles.leftMenuText}>Link to URL</span>
              </button>

              <button
                onClick={() =>
                  this.setInputConfig("PHONE ", ["fas", "mobile-alt"])
                }
                class={` ${styles["popupBtn"]} ${styles["phoneBtn"]} ${
                  this.phoneHovered ? styles["dropdownHovered"] : ""
                }`}
              >
                <span class={styles.leftMenuIcon}>
                  <font-awesome-icon icon={["fas", "mobile-alt"]} />
                </span>
                <span class={styles.leftMenuText}>Link to Phone</span>
              </button>
            </div>
          </div>
        )}

        <div class="container-input">
          <AdvanceInput
            inputType={this.advanceInput.type}
            inputIcon={this.advanceInput.icon}
            dropdownButtonHover={this.dropdownButtonHover}
            dropdownButtonActive={this.dropdownButtonActive}
            dropdownButtonClicked={this.dropdownButtonClicked}
            ref="advanceInput"
          />
        </div>
      </div>
    );
  },
});
