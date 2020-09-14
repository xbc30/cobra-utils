import { deepClone, qsParse, qsStringify } from "../src/common"
import { TAnyObject } from "../src/types"

import { expect } from 'chai';
import 'mocha';

const origin = {
    a: 0,
    b: '1',
    c: {
        1: NaN,
        2: undefined,
        3: null,
        4: Symbol('aa')
    },
    d: () => {
        console.log('ddd');
    },
    e: new Date(),
    f: [1, 2, 3]
};

const beEqual = (obj1: TAnyObject, obj2: TAnyObject) => {
    expect(obj1.a).to.equal(obj2.a);
    expect(obj1.b).to.equal(obj2.b);
    expect(String(obj1.c[1])).to.equal(String(obj2.c[1]));
    expect(obj1.c[2]).to.equal(obj2.c[2]);
    expect(obj1.c[3]).to.equal(obj2.c[3]);
    expect(String(obj1.c[4])).to.equal(String(obj2.c[4]));
    expect(obj1.d.toString()).to.equal(obj2.d.toString());
    expect(obj1.e.getTime()).to.equal(obj2.e.getTime());
    expect(obj1.f.toString()).to.equal(obj2.f.toString());
};

describe('test deepClone', () => {
    it('Object it shoule be pass', () => {
        const duplicate = deepClone(origin);
        // console.log(duplicate);
        // console.log(origin);
        beEqual(origin, duplicate);
    });
    it('Array it shoule be pass', () => {
        const duplicate = deepClone([origin]);
        // console.log(duplicate);
        // console.log(origin);
        beEqual(origin, duplicate[0]);
    });
});

describe('test qsParse', () => {
    it('qsParse shoule be pass', () => {
        expect(JSON.stringify(qsParse("a=1&b=2"))).to.equal(JSON.stringify({a: '1', b: '2'}));
    });
});

describe('test qsStringify', () => {
    it('qsStringify shoule be pass', () => {
        expect(qsStringify({a: '1', b: '2'}, false)).to.equal("a=1&b=2");
    });
});
