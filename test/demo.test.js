/**
 * @description test demo
 * @author rq
 */

 function sum (a, b) {
     return a + b;
 }

 test('10 + 20 = 30', () => {
     const res = sum(10,20);
     expect(res).toBe(30) // 断言,期望结果是30
 })