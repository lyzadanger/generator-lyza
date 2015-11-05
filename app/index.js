var generators = require('yeoman-generator');
var slug       = require('slug');
var _          = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  prompting: function () {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'title',
      message: 'Blog post title',
      default: 'I need a title'
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Space-separated tags (opt.)'
    },
    {
      type: 'input',
      name: 'blurb',
      message: 'Post blurb',
      default: 'Gimme a blurb'
    },
    {
      type: 'confirm',
      name: 'status',
      message: 'Publish immediately?',
      default: false
    }], function (answers) {
      answers.tags = (answers.tags) ? answers.tags.split(' ') : [];
      answers.status = (answers.status) ? 'published' : 'draft';
      this.choices = answers;
      done();
    }.bind(this));
  },
  writing: {
    post: function () {
      var postSlug = slug(this.choices.title, { lower: true });
      this.fs.copyTpl(
        this.templatePath('post.md'),
        this.destinationPath('src/content/drafts/' + postSlug + '/index.md'),
        this.choices
      );
    }
  }
});
