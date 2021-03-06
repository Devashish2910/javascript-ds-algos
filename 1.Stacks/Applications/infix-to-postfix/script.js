/*
 Polish Expression: Infix to Postfix
 N.B - Consider '?' as '/'(for division)
*/
class Stack {
    constructor(capacity = Infinity) {
        this._capacity = capacity;
        this._storage = [];
        this._min = [];
        this._max = [];
    }
    push(el) {
        if (this._storage.length < this._capacity) {
            if (this._storage.length === 0) {
                this._min.push(el);
                this._max.push(el);
            }
            else if (this._storage.length > 0) {
                if (this._max[this._max.length - 1] < el) {
                    this._max.push(el);
                }
                else {
                    this._max.push(this._max[this._max.length - 1])
                }
                if (this._min[this._min.length - 1] > el) {
                    this._min.push(el);
                }
                else {
                    this._min.push(this._min[this._min.length - 1])
                }
            }
            this._storage.push(el);
            return this._storage;
        }
        return 'Stack is full. Delete some elements.'
    }
    pop() {
        if (this._storage.length > 0) {
            const top = this._storage[this._storage.length - 1];
            this._min.pop();
            this._max.pop();
            this._storage.pop();
            return top;
        }
        return 'Stack is empty.'
    }
    peek() {
        if (this._storage.length > 0) {
            const top = this._storage[this._storage.length - 1];
            return top;
        }
        return 'Stack is empty.'
    }
    isEmpty() {
        if (this._storage.length > 0) {
            return false;
        }
        else {
            return true;
        }
    }
    min() {
        const min = this._min[this._min.length - 1];
        return min;
    }
    max() {
        const max = this._max[this._max.length - 1];
        return max;
    }
    show() {
        console.log(this._storage);
    }
    size() {
        return this._storage.length;
    }
}
let stack = new Stack()
    , postfix = new Stack();
const precedence = new Map()
    , operator = '^*?%+-'
    , open = '('
    , close = ')';
precedence.set('^', 1);
precedence.set('?', 2);
precedence.set('*', 2);
precedence.set('%', 2);
precedence.set('+', 3);
precedence.set('-', 3);
foo = str => {
    let i = 0;
    str = `(${str})`;
    while (i < str.length) {
        const el = str.charAt(i);
        if (el === open || el === close || operator.indexOf(el) >= 0) {
            if (el === open) {
                stack.push(el);
            }
            else if (operator.indexOf(el) >= 0) {
                if (stack.size() > 0) {
                    let isDone = false;
                    const precedenceEl = precedence.get(el);
                    while (!isDone) {
                        const top = stack.peek()
                            , precedenceTop = precedence.get(top);
                        if (precedenceTop <= precedenceEl) {
                            postfix.push(stack.pop());
                            isDone = false;
                        }
                        else {
                            stack.push(el);
                            isDone = true;
                        }
                    }
                }
            }
            else if (el === close) {
                if (stack.size() > 0) {
                    let isDone = false;
                    while (!isDone) {
                        const top = stack.peek();
                        if (top === open) {
                            isDone = true;
                        }
                        else {
                            postfix.push(stack.pop());
                            isDone = false;
                        }
                    }
                    stack.pop();
                }
            }
        }
        else {
            postfix.push(el);
        }
        i++;
    }
    return postfix._storage;
};
console.log(foo('A+(B*C-(D?E^F)*)*H'));