var {window, loadWindow} = require('../libs/testHelper');
const should = require('should');

const testCases = [
  [ 10.21, 20, {
    dollars: 9,
    quarters: 3,
    dimes: 0,
    nickels: 0,
    pennies: 4
  }],
  [ 13.34, 20, {
    dollars: 6,
    quarters: 2,
    dimes: 1,
    nickels: 1,
    pennies: 1
  }]
];

var $;

describe('Change Calculator', () => {
  beforeEach(() => {
    window = loadWindow();
    $ = require('jquery')(window);
  });

  describe('HTML', () => {
    it('should have a title', (done) => {
      should.equal($('h1#title').text(), 'Change Calculator')
      done();
    });
    it('should have an input element with an id of amount-due', (done) => {
      should.equal($('input#amount-due').length == 1
        ? 'Sale amount input element exists'
        : 'Sale amount input element does not exist', 'Sale amount input element exists');
      done();
    });

    it('should have an input element with an id of amount-received', (done) => {
      should.equal($('input#amount-received').length == 1
        ? 'Amount received input element exists'
        : 'Amount received input element does not exist', 'Amount received input element exists');
      done();
    });

    it('should contain a button with an id of calculate-change', (done) => {
      should.equal($('button#calculate-change').length == 1
        ? 'Calculate change button exists'
        : 'Calculate change button does not exist', 'Calculate change button exists');
      done();
    });

    ['dollars', 'quarters', 'dimes', 'nickels', 'pennies'].map(id => {
      it(`should contain a paragraph element with an id of ${id}Output`, done => {
        should.equal($(`p#${id}Output`).length == 1
          ? `${id} output exists`
          : `${id} output does not exist`, `${id} output exists`);
        done();
      });
    });
  });

  describe('JavaScript', () => {
    it('should have a function called calculateChange', () => {
      should.exist(window.calculateChange);
    });

    it('should have a function called handleClickEvent', () => {
      should.exist(window.handleClickEvent);
    });

    it('should bind click event to handleClickEvent', () => {
      const actualLength = $('button#calculate-change')
        .data('events')
        .filter(x => x.toString() === 'handleClickEvent')
        .length;

      should.equal(actualLength, 1);
    });

    it('should calculate change correctly', () => {
      testCases
        .forEach(([due, received, expected]) => {
          should.deepEqual(window.calculateChange(due, received), expected)
        });
    });
  })

  describe('Integration', () => {
    testCases
      .forEach(([due, received, expected], i) => {
        it(`should show correct output (${i})`, (done) => {
          $("input#amount-due").val(due);
          $("input#amount-received").val(received);
          $("button#calculate-change").click();

          should.equal($("p#dollarsOutput").text(), expected.dollars);
          should.equal($("p#quartersOutput").text(), expected.quarters);
          should.equal($("p#dimesOutput").text(), expected.dimes);
          should.equal($("p#nickelsOutput").text(), expected.nickels);
          should.equal($("p#penniesOutput").text(), expected.pennies);

          done();
        });
      });
  });
});
