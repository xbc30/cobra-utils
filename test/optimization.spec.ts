import { Debounced, Throttle } from "../src/optimization"

import { expect } from 'chai';
import 'mocha';

describe('test Debounced',
    () => {
        it('should return true', () => {
            const add = () => { expect(true).to.equal(true); }
            const debouncedUse: Function = new Debounced().use(add, 2000, true)
            debouncedUse();
        });
    }
);

describe('test Throttle',
    () => {
        it('should return true', () => {
            const add = () => { expect(true).to.equal(true); }
            const throttleUse: Function = new Throttle().use(add, 2000, true)
            throttleUse();
        });
    }
);