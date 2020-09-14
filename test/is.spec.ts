import { isNullOrUndefined, isValidString, isValidDate, isCardID } from "../src/is"

import { expect } from 'chai';
import 'mocha';

describe('test isNullOrUndefined',
  () => {
    it('should return true', () => {
      expect(isNullOrUndefined(null)).to.equal(true);
    });

    it('should return true', () => {
      expect(isNullOrUndefined(undefined)).to.equal(true);
    });
  }
);

describe('test isValidString',
  () => {
    it('should return false', () => {
      expect(isValidString('')).to.equal(false);
    });

    it('should return true', () => {
      expect(isValidString('a')).to.equal(true);
    });
  }
);

describe('test isValidDate',
  () => {
    it('should return true', () => {
      expect(isValidDate(new Date(1597285837000))).to.equal(true);
    });
  }
);

describe('test isCardID',
  () => {
    it('should return true', () => {
      const {flag, msg} = isCardID("44034619990418231X")
      expect(flag).to.equal(true);
    });
  }
);