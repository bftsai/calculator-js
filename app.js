const output = document.getElementById('js-output')
const outputSymbol = document.getElementById('outputSymbol')
const buttonInputArea = document.getElementById('buttonInputArea')

const calculator = count()
let str = '',inputSymbol = '';
output.textContent = calculator.total
buttonInputArea.addEventListener('click',(e) => {
    const isNum = new RegExp('^[0-9]$');
    const arithmetic = new RegExp('^[+-/\*]$')
    if(isNum.test(Number(e.target.textContent))){
        if(inputSymbol === '='){
            inputSymbol = '';
        }
        
        str.length>=10? '': str === '-0' ? str -= Number(e.target.textContent) : str += Number(e.target.textContent);
        console.log(str);
        output.textContent = Number(str)
    }else{
        if(arithmetic.test(e.target.textContent)){
            inputSymbol = e.target.textContent;

            if(!calculator.total && !calculator.store1 && !calculator.store2 && !str && inputSymbol === '-'){
                calculator.store1 = -0;
                str = '-0';
                output.textContent = str;
                inputSymbol = '';
                console.log(calculator);
            }else{
                calculator.store1 = Number(str);
                str = '';
                output.textContent = Number(str);
            }
            outputSymbol.textContent = inputSymbol;
        }else{
            if(e.target.textContent === '='){
                
                if(Object.is(calculator.store1,-0)){
                    calculator.store2 = Number(str);
                }else if(Object.is(calculator.store1,0)){
                    calculator.store1 = Number(str);
                }else{
                    calculator.store2 = Number(str);
                }

                str = '';
                
                if(inputSymbol === '+'){
                    calculator.add();
                }else if(inputSymbol === '-'){
                    calculator.minus();
                }else if(inputSymbol === '*'){
                    calculator.multiply();
                }else if(inputSymbol === '/'){
                    calculator.division();
                }
                console.log(calculator);
                inputSymbol = '=';
                outputSymbol.textContent = inputSymbol;
                output.textContent = calculator.total;
            }else if(e.target.textContent === 'Reset'){
                reset.call(calculator);
                output.textContent = calculator.store1;
                inputSymbol = '';
                str = '';
                outputSymbol.textContent = inputSymbol;
                console.log(calculator);
            }else{
                if(calculator.store1 === 0 && calculator.store2 === 0){
                    return;
                }
                if(!calculator.store2 && !inputSymbol){
                    calculator.store1 = Number(String(calculator.store1).slice(0,-1))
                    output.textContent = calculator.store1
                }else{
                    calculator.store2 = Number(String(calculator.store2).slice(0,-1))
                    output.textContent = calculator.store2
                }
            }
        }
    }
})

function count() { 
    let store1 = 0,store2 = 0,total = 0;
    return {
        total,
        store1,
        store2,
        add(){
            if(this.total){
                this.total += this.store1;
            }else{
                this.total = this.store1 + this.store2;
            }
            this.store1 = 0;
            this.store2 = 0;
        },
        minus(){
            if(this.total){
                this.total -= this.store1;
            }else{
                this.total = this.store1 - this.store2;
            }
            console.log(this);
            this.store1 = 0;
            this.store2 = 0;
        },
        multiply(){
            if(this.total){
                this.total = this.total * this.store1;
            }else{
                this.total = this.store1 * this.store2;
            }
            this.store1 = 0;
            this.store2 = 0;
        },
        division(){
            if(this.total){
                this.total /= this.store1;
            }else{
                this.total = this.store1 / this.store2;
            }
            this.total === Infinity ? this.total = 0 : isNaN(this.total) ?
            this.total = 0 : '';
            this.store1 = 0;
            this.store2 = 0;
        }
    }
}
function reset() { 
    this.store1 = 0;
    this.store2 = 0;
    this.total = 0;
}
