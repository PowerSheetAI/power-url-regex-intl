import test from 'ava';
import { urlRegex, isUrlRegex } from '..';

const m = urlRegex;

test('match URLs with parenthesis in text', t => {
  const fixtureParen = require('./fixture-paren.json');
  const fixture = fixtureParen.test;
  t.deepEqual(fixtureParen.result, fixture.match(m()));
});

test('match exact URLs', t => {
  const fixtures = require('./fixture-exact.json');

  for (const x of fixtures) {
    t.true(m({exact: true}).test(x));
  }
});

test('match URLs in text', t => {
  const fixtureURL = require('./fixture-paren.json');
  const fixture = fixtureURL.test;

  t.deepEqual(fixtureURL.result, fixture.match(m()));
});

test('do not match URLs', t => {
  const fixtures = require('./fixture-fail.json');

  for (const x of fixtures) {
    t.false(m({exact: true}).test(x));
  }
});

test('match using list of TLDs', t => {
  const fixtures = require('./fixture-tlds.json');

  for (const x of fixtures) {
    t.true(m({exact: true, strict: false}).test(x));
  }
});
