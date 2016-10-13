'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');
var request = require('request');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var config = require('../config.json');

var capsConfig = config.capsConfig;
var screenWidth = config.screenWidth || undefined;

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://akdn.org';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

var testCases = require('./testCases.json');

testCases.forEach(function(group) {
  
  describe(group.name, function() {

    this.timeout(99999999);
    var client = {};

    before(function(done){
      client = shoovWebdrivercss.before(done, caps, {
        screenshotRoot: config.screenShotsRoot+group.name
      });
    });

    after(function(done) {
      shoovWebdrivercss.after(done);
    });

    group.tests.forEach(function(test) {
      it(test.desc,function(done) {
        client
          .url(test.baseUrl)
          .webdrivercss(testName + group.name, {
            name: test.name,
            exclude: test.excluded,
            remove: test.removed,
            hide: test.hidden,
            screenWidth: test.screenWidth || screenWidth,
          }, resultsCallback)
          .call(done);
      });
    });

  });
})

//About-Us pages

// describe('quality of life unit', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'quality-of-life-unit'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the quality of life page',function(done) {
//     client
//       .url(baseUrl + '/about-us/quality-of-life-unit')
//       .webdrivercss(testName + 'quality-of-life-unit', {
//         name: 'qol',
//         exclude: [],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });
// describe('awards-received-akdn', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'awards-received-akdn'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the awards received by AKDN page',function(done) {
//     client
//       .url(baseUrl + '/about-us/awards-received-akdn')
//       .webdrivercss(testName + 'awards-received-akdn', {
//         name: 'awards',
//         exclude: [],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// }); 
// describe('about-us/support', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'about-us-support'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the about-us support page',function(done) {
//     client
//       .url(baseUrl + '/about-us/support')
//       .webdrivercss(testName + 'support', {
//         name: 'support',
//         exclude: [],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });
// describe('akdn-leadership', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'akdn-leadership'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the akdn-leadership page',function(done) {
//     client
//       .url(baseUrl + '/about-us/akdn-leadership')
//       .webdrivercss(testName + 'akdn-leadership', {
//         name: 'leadership',
//         exclude: [],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });

// describe('organisation-information', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'organisation-information'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the organisation-information page',function(done) {
//     client
//       .url(baseUrl + '/about-us/organisation-information')
//       .webdrivercss(testName + 'organisation-information', {
//         name: 'orginfo',
//         exclude: [],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });
// describe('akdns-approach-development', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'akdns-approach-development'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the akdns-approach-development page',function(done) {
//     client
//       .url(baseUrl + '/about-us/akdns-approach-development')
//       .webdrivercss(testName + 'akdns-approach-development', {
//         name: 'devapproach',
//         exclude: ['.flex-nav-container'],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });
// describe('our-partners', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'our-partners'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the our-partners page',function(done) {
//     client
//       .url(baseUrl + '/about-us/our-partners')
//       .webdrivercss(testName + 'our-partners', {
//         name: 'partners',
//         exclude: [],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });
// describe('frequently-asked-questions', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'frequently-asked-questions'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the frequently-asked-questions page',function(done) {
//     client
//       .url(baseUrl + '/about-us/frequently-asked-questions')
//       .webdrivercss(testName + 'frequently-asked-questions', {
//         name: 'faq',
//         exclude: [],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: [],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });

// //What-We-Do(WWD)
// describe('architecture', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'architecture'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the architecture page',function(done) {
//     client
//       .url(baseUrl + '/what-we-do/architecture')
//       .webdrivercss(testName + 'architecture', {
//         name: 'wwdarchitecture',
//         exclude: ['.flex-nav-container .flexslider'],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: ['.project-inner-wrap', '.what-we-do-subwrapper'],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });
// describe('civil-society', function() {

//   this.timeout(99999999);
//   var client = {};

//   before(function(done){
//     client = shoovWebdrivercss.before(done, caps, {
//       screenshotRoot: 'civil-society'
//     });
//   });

//   after(function(done) {
//     shoovWebdrivercss.after(done);
//   });

//   it('should show the civil-society page',function(done) {
//     client
//       .url(baseUrl + '/what-we-do/civil-society')
//       .webdrivercss(testName + 'civil-society', {
//         name: 'wwdcivil-society',
//         exclude: ['.flex-nav-container .flexslider'],
//         remove: ['#sliding-popup.sliding-popup-bottom'],
//         hide: ['.project-inner-wrap', '.what-we-do-subwrapper'],
//         screenWidth: selectedCaps == 'chrome' ? [640, 900, 1200] : undefined,
//       }, resultsCallback)
//       .call(done);
//   });
// });