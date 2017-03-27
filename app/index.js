'use strict';
const Generator = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      chalk.blue(' ____                 _') + '\n' +
      chalk.blue('|  _ \\ ___  __ _  ___| |_') + '\n' +
      chalk.blue('| |_) / _ \\/ _` |/ __| __|') + '\n' +
      chalk.blue('|  _ <  __/ (_| | (__| |_') + '\n' +
      chalk.blue('|_|_\\_\\___|\\__,_|\\___|\\__|                         _') + '\n' +
      chalk.blue(' / ___|___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_') + '\n' +
      chalk.blue('| |   / _ \\| \'_ ` _ \\| \'_ \\ / _ \\| \'_ \\ / _ \\ \'_ \\| __|') + '\n' +
      chalk.blue('| |__| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_') + '\n' +
      chalk.blue(' \\____\\___/|_| |_| |_| .__/ \\___/|_| |_|\\___|_| |_|\\__|') + '\n' +
      chalk.blue(' / ___| ___ _ __   __|_| __ __ _| |_ ___  _ __\'') + '\n' +
      chalk.blue('| |  _ / _ \\ \'_ \\ / _ \\ \'__/ _` | __/ _ \\| \'__|') + '\n' +
      chalk.blue('| |_| |  __/ | | |  __/ | | (_| | || (_) | |') + '\n' +
      chalk.blue(' \\____|\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|') + '\n'
    );

    const prompts = [
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
        .then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'), this.destinationPath('package.json'), {
        name: _.kebabCase(_.deburr(this.props.componentName)),
        version: this.props.version,
        description: this.props.description,
        author: this.props.author,
        ghUser: this.props.ghUser,
        license: this.props.license
      }
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.props.componentName,
        description: this.props.description
      }
    );

    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );

    if (this.props.license === 'MIT') {
      this.fs.copy(
        this.templatePath('LICENSE_MIT'), this.destinationPath('LICENSE')
      );
    }

    this.fs.copy(
      this.templatePath('src/'),
      this.destinationPath('src/')
    );

    this.fs.copy(
      this.templatePath('stories/'),
      this.destinationPath('stories/')
    );

    this.fs.copy(
      this.templatePath('.storybook/'),
      this.destinationPath('.storybook/')
    );
  }

  install() {
    this.installDependencies();
  }
};
