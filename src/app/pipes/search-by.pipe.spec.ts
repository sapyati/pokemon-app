import { SearchByPipe } from './search-by.pipe';

describe('SearchByPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if the array is not passed', () => {
    const pipe = new SearchByPipe();

    const result = pipe.transform([], 'Name', '');

    expect(result).toEqual([]);
  });

  it('should search the array by name', () => {
    const pipe = new SearchByPipe();

    let arr = [
      { name: 'aabc', abilities: [{ ability: { name: 'aabc' } }] },
      { name: 'babc', abilities: [{ ability: { name: 'aabc' } }] },
    ];

    const result = pipe.transform(arr, 'Name', 'aa');

    expect(result).toEqual([arr[0]]);
  });

  it('should search the array by ability', () => {
    const pipe = new SearchByPipe();

    let arr = [
      { name: 'aabc', abilities: [{ ability: { name: 'abbc' } }] },
      { name: 'babc', abilities: [{ ability: { name: 'aabc' } }] },
    ];

    const result = pipe.transform(arr, 'Abilities', 'abb');

    expect(result).toEqual([arr[0]]);
  });
});
