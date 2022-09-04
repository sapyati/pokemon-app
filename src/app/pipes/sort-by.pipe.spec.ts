import { SortByPipe } from './sort-by.pipe';

describe('SortByPipe', () => {
  it('create an instance', () => {
    const pipe = new SortByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort the array ascending', () => {
    const pipe = new SortByPipe();

    let arr = [
      { name: 'B', height: '2', weight: '2' },
      { name: 'A', height: '1', weight: '1' },
    ];

    let sortedArr = [
      { name: 'A', height: '1', weight: '1' },
      { name: 'B', height: '2', weight: '2' },
    ];

    const result = pipe.transform(arr, 'name', 'asc');

    expect(result).toEqual(sortedArr);
  });

  it('should sort the array descending', () => {
    const pipe = new SortByPipe();

    let arr = [
      { name: 'A', height: '1', weight: '1' },
      { name: 'B', height: '2', weight: '2' },
    ];

    let sortedArr = [
      { name: 'B', height: '2', weight: '2' },
      { name: 'A', height: '1', weight: '1' },
    ];

    const result = pipe.transform(arr, 'name', 'desc');

    expect(result).toEqual(sortedArr);
  });
});
