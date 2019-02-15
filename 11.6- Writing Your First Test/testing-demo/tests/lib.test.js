const lib = require('../lib')

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should be 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });

});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Alex');
        expect(result).toMatch(/Alex/);
    })
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies(); 
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    })
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1 });
        expect(result).toHaveProperty('id', 1);
    })
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // Null
        // undefined
        // Nan
        // ''
        // 0
        // false
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach((a) => {
            expect(() => { lib.registerUser(a) }).toThrow();
        })
    })

    it('should return a user object if a valid username is passed', () => {
        expect(() => {
            const result = lib.registerUser('Alex');
            expect(result).toMatchObject({ username: 'Alex' });
            expect(result.id).toBeGreaterThan(0);
        })
    })
});
