import { describe, expect, test } from 'vitest'
import {
    isEmptyObj,
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
})
