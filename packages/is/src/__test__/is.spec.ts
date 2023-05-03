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
})
