'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var chai   = require('chai');
var expect = chai.expect;

describe('general', function () {
  describe('core functionality', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({ title: "Test Blog Post" })
        .inDir(path.join(__dirname, 'temp'))
        .on('end', done);
    });

    it('the generator can be required without throwing', function () {
      // not testing the actual run of generators yet
      require('../app');
    });

    // it('creates expected files', function () {
    //   assert.file([
    //     'src/content/'
    //   ]);
    // });

  });

});
