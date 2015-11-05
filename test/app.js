'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var chai   = require('chai');
var slug   = require('slug');
var expect = chai.expect;

describe('default generator: blog', function () {
  var getPostDir = function (generator) {
    return generator.config.get('postDir');
  };
  var getPostFilename = function (generator) {
    var slugTitle = slug(generator.choices.title, {lower: true}),
      postDir = getPostDir(generator);
    return postDir + '/' + slugTitle + '/index.md';
  };
  describe('core functionality and defaults', function () {
    var runContext;
    before(function (done) {
      runContext = helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('end', done);
    });

    it('uses the config defaults', function () {
      assert.equal(getPostDir(runContext.generator), 'src/content/drafts');
    });

    it('creates a directory with default slug', function () {
      assert.file(getPostFilename(runContext.generator));
    });

    it('creates a file with default properties', function () {
      var postFilename = getPostFilename(runContext.generator);
      assert.fileContent(postFilename, runContext.generator.choices.title);
      assert.fileContent(postFilename, 'draft');
      assert.fileContent(postFilename, runContext.generator.choices.blurb);
      assert.noFileContent(postFilename, 'tags');
      assert.fileContent(postFilename, 'Gimme a blurb');
    });

    it('creates a .yo-rc file', function () {
      assert.file('.yo-rc.json');
    });
  });

  describe('prompts and choices', function () {
    it ('uses provided title to generate slug', function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withPrompts({title: 'Foo'})
        .on('end', function () {
          var postFilename = getPostFilename(this.generator)
          assert.file(postFilename);
          assert.equal(this.generator.choices.title, 'Foo');
          assert.fileContent(postFilename, 'Foo');
          done();
      });
    });
    it ('uses provided tags for tags property', function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withPrompts({tags: 'one two three'})
        .on('end', function () {
          var postFilename = getPostFilename(this.generator)
          assert.fileContent(postFilename, 'tags:');
          assert.fileContent(postFilename, '- two');
          done();
      });
    });
    it ('uses provided blurb for blurb property', function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withPrompts({blurb: 'My Blurb'})
        .on('end', function () {
          var postFilename = getPostFilename(this.generator)
          assert.fileContent(postFilename, 'My Blurb');
          done();
      });
    });

  });

});
