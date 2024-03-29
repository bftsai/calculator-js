const output = document.querySelector('.js-output');
const outputSymbol = document.getElementById('outputSymbol');
const prompt = document.getElementById('prompt');
const buttonInputArea = document.getElementById('buttonInputArea');

function calculatorClosure() { 
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
            this.inputSymbol = '=';
            this.str = '';
            this.counting = true;
        },
        minus(){
            // if(this.total || Object.is(this.total,-0) || this.counting){
            //     this.total -= this.store1;
            // }else{
            //     Object.is(this.store1,-0) ? this.store1 = 0 : '';
            //     this.store2<0 ? this.total = this.store1 + this.store2 : this.total = this.store1 - this.store2;;
            // }
            if(this.total){
                this.total -= this.store1;
            }else{
                this.total = this.store1 - this.store2;
            }
            this.store1 = 0;
            this.store2 = 0;
            this.inputSymbol = '=';
            this.str = '';
            this.counting = true;
        },
        multiply(){
            this.total? this.total = this.total * this.store1 : this.total = this.store1 * this.store2;

            this.store1 = 0;
            this.store2 = 0;
            this.inputSymbol = '=';
            this.str = '';
            this.counting = true;
        },
        division(){
            const reg = new RegExp('^00\d+$');
            if(this.counting){
                this.total = Number((this.total / this.store1).toFixed(2));
            }else{
                this.total = Number((this.store1 / this.store2).toFixed(2));
                this.counting = true;
            }
            Number(String(this.total).split('.')[1])? '' : this.total = Number((this.total/1).toFixed(0));

            this.store1 = 0;
            this.store2 = 0;
            this.inputSymbol = '=';
            this.str = '';

            if(this.total === 'Infinity' || isNaN(this.total)){
                reset.call(calculator);
                alert('除數不得為零！！！');
            }
        },
        switchSymbol(symbol){
            this.inputSymbol = symbol;
        },
    }
}
function reset() { 
    this.store1 = 0;
    this.store2 = 0;
    this.total = 0;
    this.inputSymbol = '';
    this.str = '';
    this.counting = false;
}
function checkTotal(){
    const regInt = new RegExp('^-?[\\d]{0,10}$');
    const regFloat = new RegExp('^-?\\d{0,10}.[\\d]{0,2}$');
    
    if(String(this.total).includes('.')){
      if(!regFloat.test(this.total)){
        reset.call(calculator);
        alert('數值過大，無法計算！！！');
      }
    }else{
      if(!regInt.test(this.total)){
        reset.call(calculator);
        alert('數值過大，無法計算！！！');
      }
    }
}

const calculator = calculatorClosure();
output.textContent = calculator.total;

buttonInputArea.addEventListener('click',(e) => {
    const isNum = new RegExp('^[0-9]$');
    const arithmetic = new RegExp('^[+-/\*]$');
    if(isNum.test(Number(e.target.textContent))){
        const reg = new RegExp('^-?[\\d]{1,9}$');
        
        reg.test(Number(calculator.str))? calculator.str += Number(e.target.textContent) : prompt.classList.remove('visibility-hidden');

        if(calculator.inputSymbol === '=' && Number(calculator.str)){
            calculator.total = 0;
            calculator.counting = false;
            calculator.inputSymbol = '';
            outputSymbol.textContent = calculator.inputSymbol;
        }

        Object.is(Number(calculator.str),-0)? output.textContent = '-0' : output.textContent = Number(calculator.str);
    }else{
        if(arithmetic.test(e.target.textContent)){
            prompt.classList.add('visibility-hidden');
            // 去掉 107 行判斷式，可開啟切換符號改變 + - * /
            if(arithmetic.test(calculator.inputSymbol)){
                return;
            }else if(calculator.inputSymbol === '=' && calculator.str){
                calculator.switchSymbol(e.target.textContent);
                calculator.total = Number(calculator.str);
            }else if(calculator.counting){
                calculator.switchSymbol(e.target.textContent);
            }else{
                // e.target.textContent === '-' && !calculator.str? '' : calculator.switchSymbol(e.target.textContent);
                // calculator.store1 || Object.is(calculator.store1,-0)? calculator.store2 = Number(calculator.str) : calculator.store1 = Number(calculator.str);
                calculator.switchSymbol(e.target.textContent);
                calculator.store1? calculator.store2 = Number(calculator.str) : calculator.store1 = Number(calculator.str);
                calculator.str = '';
            }
            
            // e.target.textContent === '-' && !calculator.str && !calculator.counting? calculator.str = '-0' : calculator.str = '';
            // output.textContent = calculator.str === '-0'? calculator.str : Number(calculator.str);
            output.textContent = Number(calculator.str);
            outputSymbol.textContent = calculator.inputSymbol;
        }else{
            if(e.target.textContent === '='){
                prompt.classList.add('visibility-hidden');
                calculator.counting? calculator.store1 = Number(calculator.str) : calculator.store2 = Number(calculator.str);

                if(calculator.store2 < 0 ){
                    calculator.switchSymbol('-');
                }
                switch (calculator.inputSymbol) {
                    case '+':
                        calculator.add();
                        break;
                    case '-':
                        calculator.minus();
                        break;
                    case '*':
                        calculator.multiply();
                        break;
                    case '/':
                        calculator.division();
                        break;
                    default:
                        alert('操作錯誤！！！');
                        this.reset();
                        break;
                }
                checkTotal.call(calculator);
                
                outputSymbol.textContent = calculator.inputSymbol;
                output.textContent = calculator.total;
            }else if(e.target.textContent === 'Reset'){
                reset.call(calculator);
                output.textContent = calculator.store1;
                outputSymbol.textContent = calculator.inputSymbol;
                calculator.str.length < 10 ? prompt.classList.add('visibility-hidden') : '';
            }else if(e.target.textContent === 'Del' && (calculator.str || calculator.str === '-0')){
                calculator.str === '-0'? calculator.str = '' : calculator.str = calculator.str.slice(0,-1);
                output.textContent = Number(calculator.str);
                
                !calculator.inputSymbol? calculator.store1 = Number(calculator.str) : calculator.store2 = Number(calculator.str);
                calculator.str.length < 10 ? prompt.classList.add('visibility-hidden') : '';
            }
        }
    }
});
