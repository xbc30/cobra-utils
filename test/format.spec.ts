import { formatDate, formatDateNumCus, formatCountdown, formatCountdownNumCus, 
  formatHiddenPhone, formatHiddenEmail, formatPercentage, formatThousands } from "../src/format"

import { expect } from 'chai';
import 'mocha';


describe('test formatDate',
  () => {
    const timestamp = 1597285837;

    it('should return 2020-08-13 10:30:37', () => {
      const result = formatDate(timestamp);
      expect(result).to.equal("2020-08-13 10:30:37");
    });
  }
);

describe('test formatDateNumCus',
  () => {
    const timestamp = 1597285837000;

    it('should return 2020/08/13 10:30:37', () => {
      const result = formatDateNumCus(timestamp, 'yyyy/mm/dd hh:ii:ss');
      expect(result).to.equal("2020/08/13 10:30:37");
    });
  }
);

describe('test formatCountdown',
  () => {
    const timestamp = 1599285837;

    it('should return true', () => {
      const result = formatCountdown(timestamp);
      expect(result).to.equal(result);
    });
  }
);

describe('test formatCountdownNumCus',
  () => {
    const timestamp = 1599285837;

    it('should return true', () => {
      const result = formatCountdownNumCus(timestamp, 'h小时m分s秒');
      expect(result).to.equal(result);
    });
  }
);

describe('test formateHiddenPhone',
  () => {
    const phone1 = "18978784545";
    const phone2 = "008618978784545";

    it('should return 189****4545', () => {
      const result = formatHiddenPhone(phone1);
      expect(result).to.equal("189****4545");
    });

    it('should return 189****4545', () => {
      const result = formatHiddenPhone(phone2);
      expect(result).to.equal("189****4545");
    });
  }
);

describe('test formateHiddenEmail',
  () => {
    const email1 = "18978784545@163.com";
    const email2 = "abc@gmail.com";

    it('should return 189****@163.com"', () => {
      const result = formatHiddenEmail(email1);
      expect(result).to.equal("189****@163.com");
    });

    it('should return ***@gmail.com', () => {
      const result = formatHiddenEmail(email2);
      expect(result).to.equal("***@gmail.com");
    });
  }
);

describe('test formatPercentage',
  () => {

    it('should return 12%"', () => {
      const result = formatPercentage(12.00, 100);
      expect(result).to.equal("12%");
    });

    it('should return 12.01%', () => {
      const result = formatPercentage(12.0104, 100);
      expect(result).to.equal("12.01%");
    });
  }
);

describe('test formatThousands',
  () => {

    it('should return 1,200,000,000"', () => {
      const result = formatThousands("1200000000");
      expect(result).to.equal("1,200,000,000");
    });

    it('should return 5,400.3221', () => {
      const result = formatThousands("5400.3221");
      expect(result).to.equal("5,400.3221");
    });
  }
);