import { test, expect } from 'vitest';
import eventify from '../index.js';

test('fire fires callback', (t) => {
  const subject = {};
  eventify(subject);
  let called = false;
  subject.on('something', function () {
    called = true;
  });

  subject.fire('something');
  expect(called).toBe(true);
});

test('fire fires all callbacks', () => {
  let count = 0;
  const subject = eventify({});
  const onSomething = function () {
    count += 1;
  };

  subject.on('something', onSomething);
  subject.on('something', onSomething);

  subject.fire('something');
  expect(count).toBe(2);
});

test('Chaining can be used on fire and "on"', () => {
  let count = 0;

  const subject = eventify({});
  const onSomething = function () {
    count += 1;
  };

  subject.on('beep', onSomething).on('bop', onSomething);
  subject.fire('beep').fire('bop');

  expect(count).toBe(2);
});

test('fire passes all arguments', () => {
  const subject = eventify({});
  const testX = 42;
  const testY = 'hello';

  subject.on('something', function (x, y) {
    expect(x).toBe(testX);
    expect(y).toBe(testY);
  });

  subject.fire('something', testX, testY);
});

test('"on" and fire preserves the context', () => {
  const subject = eventify({});
  const context = {};
  let got;
  subject.on('something', function () {
    got = this;
  }, context);

  subject.fire('something');
  expect(got).toBe(context);
});

test('"off" removes passed listener', () => {
  let ok = false;
  const subject = eventify({});
  const onFoo = function () {
    // should not be called
    ok = false;
  };
  const onBar = function () {
    ok = true;
  };

  subject.on('foo', onFoo);
  subject.on('bar', onBar);

  subject.off('foo', onFoo);

  subject.fire('foo');
  subject.fire('bar');
  expect(ok).toBe(true);
});

test('"off" removes only one from the same event name', () => {
  let ok = false;
  const subject = eventify({});
  const onFoo1 = function () {
    // should not be called
    ok = false;
  };
  const onFoo2 = function () {
    ok = true;
  };

  subject.on('foo', onFoo1);
  subject.on('foo', onFoo2);

  subject.off('foo', onFoo1);

  subject.fire('foo');
  expect(ok).toBe(true);
});

test('"off" removes all for given event name', () => {
  const subject = eventify({});
  const onFoo = function () {
    throw new Error('should not be called');
  };

  subject.on('foo', onFoo);
  subject.off('foo');
  subject.fire('foo');
});

test('"off" removes all events', () => {
  const subject = eventify({});
  const onFoo = function () {
    throw new Error('should not be called');
  };

  subject.on('foo', onFoo);
  subject.on('bar', onFoo);
  subject.off();

  subject.fire('foo');
  subject.fire('bar');
});

test('"off" does not harm when no such event', () => {
  let called = 0;
  const subject = eventify({});
  const onFoo = function () {
    called += 1;
  };

  subject.on('foo', onFoo);
  subject.off('bar', onFoo);

  subject.fire('foo');
  subject.fire('bar');
  expect(called).toBe(1);
});

test('"off" can remove by function', () => {
  let called = 0;
  const subject = eventify({});
  const onFooYes = function () {
    called += 1;
  };

  const onFooNo = function () {
    throw new Error('should not be called');
  };

  subject.on('foo', onFooYes);
  subject.on('foo', onFooNo);
  subject.off('foo', onFooNo);

  subject.fire('foo');
  expect(called).toBe(1);
});

test('eventify can chain', () => {
  const subject = {};
  const eventifiedSubject = eventify(subject);
  expect(subject).toBe(eventifiedSubject);
});
