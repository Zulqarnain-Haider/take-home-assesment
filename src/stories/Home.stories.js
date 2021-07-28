import Home from '../components/Home';


export default {
  title: 'VueJsAssignment/Home',
  component: Home,
  argTypes: {
    advanceInput: { 
      type: '', 
      icon: [] 
    }
  },
  getDropdownStatus: false,
  urlHovered: false,
  // emailHovered: false,
  // phoneHovered: false,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Home },
  template: '<Home v-bind="$props" />',
});

export const Default = Template.bind({});

Default.args = {
  advanceInput: { 
    type: 'URL', 
    icon: ['fas', 'link'] 
  },
  getDropdownStatus: false,
  urlHovered: false,
  emailHovered: false,
  phoneHovered: false,
};



export const DropdownButtonHover = Template.bind({});

DropdownButtonHover.args = {
  advanceInput: { 
    type: 'URL', 
    icon: ['fas', 'link'] 
  },
  getDropdownStatus: false,
  urlHovered: false,
  emailHovered: false,
  phoneHovered: false,
  dropdownButtonHover: true
};

export const DropdownButtonActive = Template.bind({});

DropdownButtonActive.args = {
  advanceInput: { 
    type: 'URL', 
    icon: ['fas', 'link'] 
  },
  getDropdownStatus: false,
  urlHovered: false,
  emailHovered: false,
  phoneHovered: false,
  dropdownButtonHover: true,
  dropdownButtonActive: true,
};


export const DropdownButtonClicked = Template.bind({});

DropdownButtonClicked.args = {
  advanceInput: { 
    type: 'URL', 
    icon: ['fas', 'link'] 
  },
  getDropdownStatus: true,
  urlHovered: false,
  emailHovered: false,
  phoneHovered: false,
  dropdownButtonHover: false,
  dropdownButtonClicked: true,
};


export const DropdownLinkHover = Template.bind({});

DropdownLinkHover.args = {
  advanceInput: { 
    type: 'URL', 
    icon: ['fas', 'link'] 
  },
  getDropdownStatus: true,
  urlHovered: true,
  emailHovered: false,
  phoneHovered: false,
};


// export const ValidInput= Template.bind({});

// ValidInput.args = {
//   advanceInput: { 
//     type: 'URL', 
//     icon: ['fas', 'link'] 
//   },
//   getDropdownStatus: false,
//   isFieldInFocus: true,
//   isFieldValid: true,
// };


// export const InvalidInput= Template.bind({});

// InvalidInput.args = {
//   advanceInput: { 
//     type: 'URL', 
//     icon: ['fas', 'link'] 
//   },
//   getDropdownStatus: false,
//   isFieldInFocus: true,
//   isFieldValid: false,
// };