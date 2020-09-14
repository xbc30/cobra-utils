import { filterTag, filterSpecial } from "../src/filter"

import { expect } from 'chai';
import 'mocha';

describe('test filterTag',
  () => {
    it('should return &lt;b&gt;', () => {
      expect(filterTag("<b>")).to.equal("&lt;b&gt;");
    });
  }
);

describe('test filterSpecial',
  () => {
    it('should return abc', () => {
      expect(filterSpecial("$abc&")).to.equal("abc");
    });
  }
);