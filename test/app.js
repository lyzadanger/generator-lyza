'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var chai   = require('chai');
var expect = chai.expect;

describe('default generator: blog', function () {
  describe('core functionality', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('end', done);
    });

    it('the generator can be required without throwing', function () {
      // not testing the actual run of generators yet
      require('../app');
    });

    it('creates a file with a default title', function () {
      assert.file('src/content/drafts/i-need-a-title/index.md');
      assert.noFileContent('src/content/drafts/i-need-a-title/index.md', 'tags');
    });
  });

});
