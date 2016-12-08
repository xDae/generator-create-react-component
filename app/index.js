'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('generator-react-component-boilerplate') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'First, what is the name of your Component?',
        default: 'My React Component'
      },
      {
        type: 'input',
        name: 'version',
        message: 'The initial version of your Component',
        default: '0.1.0'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Component description',
        default: 'My awesome React Component!'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: ''
      },
      {
        type: 'input',
        name: 'ghUser',
        message: 'What is your GitHub Username?',
        default: ''
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: 'MIT'
      }
    ];

    return this.prompt(prompts)
      .then(function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'), this.destinationPath('package.json'),
      {name: _.kebabCase(_.deburr(this.props.componentName)),
        version: this.props.version,
        description: this.props.description,
        author: this.props.author,
        ghUser: this.props.ghUser,
        license: this.props.license}
      );

    this.fs.copyTpl(
      this.templatePath('_README.md'), this.destinationPath('README.md'),
      {name: this.props.componentName,
        description: this.props.description}
    );

    this.fs.copy(
      this.templatePath('babelrc'), this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('eslintrc'), this.destinationPath('.eslintrc')
    );

    this.fs.copy(
      this.templatePath('gitignore'), this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('editorconfig'), this.destinationPath('.editorconfig')
    );

    if (this.props.license === 'MIT') {
      this.fs.copy(
        this.templatePath('LICENSE_MIT'), this.destinationPath('LICENSE')
      );
    }

    this.fs.copy(
      this.templatePath('src/'), this.destinationPath('src/')
    );

    this.fs.copy(
      this.templatePath('stories/'), this.destinationPath('stories/')
    );

    this.fs.copy(
      this.templatePath('.storybook/'), this.destinationPath('.storybook/')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
