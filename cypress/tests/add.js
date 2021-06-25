import {add} from '../../index.js';

describe('add', () => {
  it('should add', () => {
    expect(add(2)(3)).to.equal(5);
  });
});
