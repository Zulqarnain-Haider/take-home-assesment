// .storybook/main.js

const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    '../src/**/*/stories.js',
		'../src/components/**/stories.ts',
		'../src/components/**/stories.tsx',
	],
  addons : ['@storybook/addon-actions', '@storybook/addon-links','storybook-addon-jsx'],
  webpackFinal: async (config, { configType }) => {

    config.resolve.extensions.push(
      ".ts",
      ".tsx",
      ".vue",
      ".css",
      ".less",
      ".scss",
      ".sass",
      ".html"
    );
  
    config.module.rules.push({
      test: /\.tsx$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          }
        }
      ]
    });


    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });



    // Return the altered config
    return config;
  },
};