'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var chai   = require('chai');
var slug   = require('slug');
var expect = chai.expect;

describe('default generator: blog', function () {
  describe('core functionality and defaults', function () {
    var config,
      postDir,
      postFilename,
      runContext;
    before(function (done) {
      runContext = helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('end', function () {
          var slugTitle = slug(this.generator.choices.title, {lower: true});
          config = this.generator.config;
          postDir = config.get('postDir');
          postFilename = postDir + '/' + slugTitle + '/index.md';
          done();
        });
    });

    it('uses the config defaults', function () {
      assert.equal(postDir, 'src/content/drafts');
    });

    it('creates a directory with default slug', function () {
      assert.file(postFilename);
    });

    it('creates a file with default properties', function () {
      assert.fileContent(postFilename, runContext.generator.choices.title);
      assert.fileContent(postFilename, 'draft');
      assert.fileContent(postFilename, runContext.generator.choices.blurb);
      assert.noFileContent(postFilename, 'tags');
    });

    it('creates a .yo-rc file', function () {
      assert.file('.yo-rc.json');
    });
  });

});
