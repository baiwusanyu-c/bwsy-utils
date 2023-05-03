import { describe, expect, test } from 'vitest'
import {
    isEmptyObj,
    isBool,
    isObject,
    isArray,
    isString,
    isNumber,
    isFunction
} from '../is'

describe('is', () => {
    test('isEmptyObj should return true for empty object', () => {
        expect(isEmptyObj({})).toBeTruthy()
    });

    test('isEmptyObj should return false for non-empty object', () => {
        expect(isEmptyObj({foo: 'bar' })).not.toBeTruthy()
    });

    test('isEmptyObj should return false for non-object values', () => {
        expect(isEmptyObj('foo')).not.toBeTruthy()
        expect(isEmptyObj(1)).not.toBeTruthy()
        expect(isEmptyObj([])).not.toBeTruthy()
        expect(isEmptyObj(null)).not.toBeTruthy()
        expect(isEmptyObj(undefined)).not.toBeTruthy()
    });

    test('isBool should return true for boolean values', () => {
        expect(isBool(true)).toBeTruthy()
        expect(isBool(false)).toBeTruthy()
    });

    test('isBool should return false for non-boolean values', () => {

        expect(isBool(null)).not.toBeTruthy()
        expect(isBool(undefined)).not.toBeTruthy()

        expect(isBool(42)).not.toBeTruthy()
        expect(isBool('foo')).not.toBeTruthy()

        expect(isBool({})).not.toBeTruthy()
        expect(isBool([])).not.toBeTruthy()
    });

    test('isString should return true for string values', () => {
        expect(isString('')).toBeTruthy()
        expect(isString('foo')).toBeTruthy()
        expect(isString(new String('bar'))).not.toBeTruthy()
    });

    test('isString should return false for non-string values', () => {
        expect(isString(null)).not.toBeTruthy()
        expect(isString(undefined)).not.toBeTruthy()

        expect(isString(42)).not.toBeTruthy()
        expect(isString('foo')).toBeTruthy()

        expect(isString({})).not.toBeTruthy()
        expect(isString([])).not.toBeTruthy()
    });

    test('isNumber should return true for number values', (t) => {
        expect(isNumber(0)).toBeTruthy()
        expect(isNumber(42)).toBeTruthy()
        expect(isNumber(-3.14)).toBeTruthy()
    });

    test('isNumber should return false for non-number values', (t) => {
        expect(isNumber(null)).not.toBeTruthy()
        expect(isNumber(undefined)).not.toBeTruthy()
        expect(isNumber('foo')).not.toBeTruthy()
        expect(isNumber(true)).not.toBeTruthy()
        expect(isNumber({})).not.toBeTruthy()
        expect(isNumber([])).not.toBeTruthy()
    });
})
