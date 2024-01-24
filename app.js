const output = document.querySelector('.js-output');
const outputSymbol = document.getElementById('outputSymbol');
const prompt = document.getElementById('prompt')
const buttonInputArea = document.getElementById('buttonInputArea');

const calculator = count();
output.textContent = calculator.total
buttonInputArea.addEventListener('click',(e) => {
    const isNum = new RegExp('^[0-9]$');
    const arithmetic = new RegExp('^[+-/\*]$')
    if(isNum.test(Number(e.target.textContent))){
        if(calculator.inputSymbol === '='){
            calculator.inputSymbol = '';
        }
        
        calculator.str.length>=10? '': calculator.str === '-0' ? calculator.str -= Number(e.target.textContent) : calculator.str += Number(e.target.textContent);
        calculator.str.length>=10? prompt.classList.remove('visibility-hidden') : '';
        output.textContent = Number(calculator.str)
    }else{
        if(arithmetic.test(e.target.textContent)){
            calculator.inputSymbol = e.target.textContent;

            if(calculator.inputSymbol && (calculator.store1 !== 0 || Object.is(calculator.store1,-0))){
                if(Object.is(calculator.store1,-0) && calculator.inputSymbol === '-' && calculator.str !== '-0'){
                    calculator.store1 = Number(calculator.str);
                    calculator.str = '';
                    output.textContent = Number(calculator.str);
                }
            }else if(!calculator.total && !calculator.store1 && !calculator.store2 && !calculator.str && calculator.inputSymbol === '-' && !calculator.counting){
                if(Object.is(calculator.total,-0)){
                    calculator.inputSymbol = '-';
                    calculator.str = '';
                    output.textContent = Number(calculator.str);
                }else{
                    calculator.store1 = -0;
                    calculator.str = '-0';
                    output.textContent = calculator.str;
                    calculator.inputSymbol = '';
                }
            }else if(calculator.total === 0){
                calculator.store1 = Number(calculator.str);
                calculator.str = '';
                output.textContent = Number(calculator.str);
            }else{
                calculator.str = '';
                output.textContent = Number(calculator.str);
            }
            outputSymbol.textContent = calculator.inputSymbol;
        }else{
            if(e.target.textContent === '='){
                if(Object.is(calculator.store1,-0)){
                    calculator.store2 = Number(calculator.str);
                }else if(Object.is(calculator.store1,0)){
                    calculator.store1 = Number(calculator.str);
                }else{
                    calculator.store2 = Number(calculator.str);
                }

                calculator.str = '';
                
                if(calculator.inputSymbol === '+'){
                    calculator.add();
                }else if(calculator.inputSymbol === '-'){
                    calculator.minus();
                }else if(calculator.inputSymbol === '*'){
                    calculator.multiply();
                }else if(calculator.inputSymbol === '/'){
                    if((!calculator.total && calculator.store2 === 0) || (calculator.total && calculator.store1 === 0)){
                        output.textContent = 'Error !';
                        calculator.total = -0;
                        calculator.store1 = 0;
                        calculator.store2 = 0;
                        calculator.inputSymbol = '';
                        outputSymbol.textContent = calculator.inputSymbol;
                        return;
                    }else{
                        calculator.division();
                    }
                }
                
                calculator.inputSymbol = '=';
                outputSymbol.textContent = calculator.inputSymbol;
                output.textContent = calculator.total;
            }else if(e.target.textContent === 'Reset'){
                reset.call(calculator);
                output.textContent = calculator.store1;
                calculator.inputSymbol = '';
                calculator.str = '';
                outputSymbol.textContent = calculator.inputSymbol;
                if(calculator.str.length < 10){
                    prompt.classList.add('visibility-hidden');
                }
            }else if(e.target.textContent === 'Del'){
                if(calculator.str || calculator.str === '-0'){
                    calculator.str === '-0'? calculator.str = '' : calculator.str = calculator.str.slice(0,-1)
                    output.textContent = Number(calculator.str);
                    
                    !calculator.inputSymbol? calculator.store1 = Number(calculator.str) : calculator.store2 = Number(calculator.str)
                    if(calculator.str.length < 10){
                        prompt.classList.add('visibility-hidden');
                    }
                }
            }
        }
    }
})

function count() { 
    let store1 = 0,store2 = 0,total = 0,counting = false,inputSymbol = '',str = '';
    return {
        total,
        store1,
        store2,
        counting,
        inputSymbol,
        str,
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
