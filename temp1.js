const c = 56;
const d = 65;
const b = 99;
const af = function () { console.log([this, c, d]); };
{
  const c = 666;
  const obj1 = { b: 98 };
  obj1.m1 = function () {
    console.log(this);
    af();
    const af2 = () => console.log([this, c, d]);
    af2();
  };
  obj1.m1();
}

const user = {
  [Symbol.toStringTag]: 'User',
};
const a = ['a'];
console.log({}.toString.call(Array)); // [object User]
console.log(Array.prototype[Symbol.toStringTag]); // [object User]
console.log(Object.getOwnPropertyNames(Array.__proto__));
console.log(Array.prototype.__proto__ === Object.prototype);
console.log(Object.__proto__ === Function.prototype);
console.log(Array.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Function.__proto__ === Function.prototype);

function func() {
  try {
    abbd();
  } catch (err) {
    console.log('fld');
    throw new Error('dfkds');
  } finally {
    console.log('finally');
    // return 2;
  }

  try {
    console.log('werwtr');
  } catch {
    return 4;
  }
}
try {
  console.log(func()); // first works console.log from finally, and then this one
} catch (err) {
  console.log(err);
}

class A {
  constructor(self) {
    console.log(self);
    this.a = 1;
  }
}
const f1 = function (){
  console.log(f1);
};

const tempA = new A();
console.log(tempA.constructor === A);
console.log(A.name, f1.name);
