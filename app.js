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
        output.textContent = Number(str)
    }else{
        if(arithmetic.test(e.target.textContent)){
            inputSymbol = e.target.textContent;

            if(inputSymbol && (calculator.store1 !== 0 || Object.is(calculator.store1,-0))){
                if(Object.is(calculator.store1,-0) && inputSymbol === '-' && str !== '-0'){
                    calculator.store1 = Number(str);
                    str = '';
                    output.textContent = Number(str);
                }
            }else if(!calculator.total && !calculator.store1 && !calculator.store2 && !str && inputSymbol === '-' && !calculator.counting){
                if(Object.is(calculator.total,-0)){
                    inputSymbol = '-';
                    str = '';
                    output.textContent = Number(str);
                }else{
                    calculator.store1 = -0;
                    str = '-0';
                    output.textContent = str;
                    inputSymbol = '';
                }
            }else if(calculator.total === 0){
                calculator.store1 = Number(str);
                str = '';
                output.textContent = Number(str);
            }else{
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
                
                // console.log(calculator.store1,calculator.store2,calculator.total,calculator.counting);
                if(inputSymbol === '+'){
                    calculator.add();
                }else if(inputSymbol === '-'){
                    calculator.minus();
                }else if(inputSymbol === '*'){
                    calculator.multiply();
                }else if(inputSymbol === '/'){
                    if((!calculator.total && calculator.store2 === 0) || (calculator.total && calculator.store1 === 0)){
                        output.textContent = 'Error !';
                        calculator.total = -0;
                        calculator.store1 = 0;
                        calculator.store2 = 0;
                        inputSymbol = '';
                        outputSymbol.textContent = inputSymbol;
                        return;
                    }else{
                        calculator.division();
                    }
                }
                
                inputSymbol = '=';
                outputSymbol.textContent = inputSymbol;
                output.textContent = calculator.total;
            }else if(e.target.textContent === 'Reset'){
                reset.call(calculator);
                output.textContent = calculator.store1;
                inputSymbol = '';
                str = '';
                outputSymbol.textContent = inputSymbol;
            }else if(e.target.textContent === 'Del'){
                if(str || str === '-0'){
                    str === '-0'? str = '' : str = str.slice(0,-1)
                    output.textContent = Number(str);
                    
                    !inputSymbol? calculator.store1 = Number(str) : calculator.store2 = Number(str)
                }
            }
        }
    }
})

function count() { 
    let store1 = 0,store2 = 0,total = 0,counting = false;
    return {
        total,
        store1,
        store2,
        counting,
        add(){
            if(this.total){
                this.total += this.store1;
            }else{
                this.total = this.store1 + this.store2;
            }
            this.store1 = 0;
            this.store2 = 0;
            this.counting = true;
        },
        minus(){
            if(this.total || Object.is(this.total,-0) || this.counting){
                this.total -= this.store1;
            }else{
                Object.is(this.store1,-0) ? this.store1 = 0 : '';
                this.store2<0 ? this.total = this.store1 + this.store2 : this.total = this.store1 - this.store2;;
            }
            this.store1 = 0;
            this.store2 = 0;
            this.counting = true;
        },
        multiply(){
            if(this.total){
                this.total = this.total * this.store1;
            }else{
                this.total = this.store1 * this.store2;
            }
            this.store1 = 0;
            this.store2 = 0;
            this.counting = true;
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
            this.counting = true;
        }
    }
}
function reset() { 
    this.store1 = 0;
    this.store2 = 0;
    this.total = 0;
    this.counting = false;
}
