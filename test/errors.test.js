import { test, expect } from 'vitest';
import eventify from '../index.js';

test('Eventify protects your object', () => {
  expect(() => eventify({
    on: "I'm a dummy string, please don't wipe me out",
  })).toThrow();
});

test('Eventify does not allow falsy objects', () => {
  // @ts-expect-error - intentionally wrong
  expect(() => eventify(false)).toThrow();
});

test('Eventify does not allow to subscribe without function', () => {
  const subject = eventify({});
  // @ts-expect-error - intentionally missing callback
  expect(() => subject.on('foo')).toThrow();
});
