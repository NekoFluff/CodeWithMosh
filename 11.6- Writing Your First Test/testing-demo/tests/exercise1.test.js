const ex1 = require('../exercise1')

describe('fizzBuzz', () => {
    it('should throw an error if not a number', () => {
        expect(() => { ex1.fizzBuzz('a') }).toThrow();
    })

    it('should be FizzBuzz if divisible by 3 and 5', () => {
        const result = ex1.fizzBuzz(15);
        expect(result).toMatch(/FizzBuzz/);
    })

    it('should be Fizz if only divisible by 3', () => {
        const result = ex1.fizzBuzz(3);
        expect(result).toMatch(/Fizz/);
    })

    it('should be Buzz if only divisible by 5', () => {
        const result = ex1.fizzBuzz(5);
        expect(result).toMatch(/Buzz/);
    })

    it('should be the input if not divisible by 3 or 5', () => {
        const result = ex1.fizzBuzz(1);
        expect(result).toBe(1);
    })
})