let display = document.getElementById('display');
let btnNumeros = document.querySelectorAll('.numeros')
let btnSub = document.getElementById('subtrair');
let btnAd = document.getElementById('somar');
let btnMult = document.getElementById('multiplicar');
let btnDiv = document.getElementById('dividir');
let btnRes = document.getElementById('igual');
let btnOp = document.querySelectorAll('.operadores')
let btnApagar = document.getElementById('apagar');
var n1 = 0.0;
var n2 = 0.0;
let operacao = '';
let boolMudou = 0;
var numero = [];
var decimal = []
let virgula = false;


function verificarNumeroDisplay(){
    let numeroArray = String(display.innerText).split('').map(String);
    return Number((numeroArray.filter(elemento => String(elemento) !== '.')).join(''));
}

btnNumeros.forEach(btn=> {
    btn.addEventListener('click', (e) =>{
        let numero = e.target.innerText;
        atualizaDisplay(numero);
    })
}
)

btnOp.forEach(btn=> {
    btn.addEventListener('click', adicionarDecimal)
}
)

function adicionarDecimal(){
    if(decimal.length!=0){
        decimal[0] = '.'
        numero.push(...decimal)
    }
}

btnSub.addEventListener('click', () => {
    if(operacao != ''){
        resultado();
    }
    adicionarDecimal();
    n1 = Number(numero.join(''));
    operacao = '-';
    boolMudou = 1;
})
btnAd.addEventListener('click', () => {
    if(operacao != ''){
        resultado();
    }
    n1 = Number(numero.join(''));
    operacao = '+';
    boolMudou = 1;
})
btnMult.addEventListener('click', () => {
    if(operacao != ''){
        resultado();
    }
    n1 = Number(numero.join(''));
    operacao = 'x';
    boolMudou = 1;
})
btnDiv.addEventListener('click', () => {
    if(operacao != ''){
        resultado();
    }
    n1 = Number(numero.join(''));
    operacao = '/';
    boolMudou = 1;
})

btnApagar.addEventListener('click', () =>{
    if(btnApagar.innerText == 'AC'){
        n1 = 0;
        n2 = 0;
    }else{
        btnApagar.innerText = 'AC'
    }
    numero = [];
    display.innerText = 0;
})

btnRes.addEventListener('click', resultado)

function resultado() {
    n2 = Number(numero.join(''));
    switch(operacao){
        case '-':
            n1 = Number(n1) - Number(n2);
            break
        case '+':
            n1 = Number(n1) + Number(n2);
            break
        case 'x':
            n1 = Number(n1) * Number(n2);
            break
        case '/':
            n1 = Number(n1) / Number(n2);
            break
    }
    operacao = '=';
    boolMudou = 1;
    atualizaDisplay(String(n1));
}

function atualizaDisplay(num){
    if(boolMudou == 1){
        console.log('mudou')
        boolMudou = 0;
        numero = [];
        decimal = [];
        virgula = false;
        btnApagar.innerText = 'AC'
        atualizaDisplay(num);
    }else {
        btnApagar.innerText = 'C'
        if(num.length>1){
            let novoNumero = num.toString().split('').map(digito => digito)
            let aux = novoNumero.indexOf('.');
            if (aux !== -1) {
                let elementosRemovidos = novoNumero.splice(aux);
                elementosRemovidos[0] = ','
                decimal.push(...elementosRemovidos)
            }
            numero.push(...novoNumero);

        }else{
            if(num == ',' || virgula == true){
                if(num!= ',' || virgula == false){
                    if(numero.length == 0){
                        numero.push(0);
                    }
                    decimal.push(num);
                }
                virgula = true;
            }else{
                numero.push(num);
            }
        }
        let numeroDisplay = numero.join('');
        if(numero.length>3){
            if(numero.length%3==1){
                numero.unshift('0' , '0')
                numeroDisplay = separaGrupo(2);
                numero.splice(0, 2);

            }else if(numero.length%3==2){
                numero.unshift('0')
                numeroDisplay = separaGrupo(1);
                numero.splice(0, 1);
            }else{
                numeroDisplay = separaGrupo(0);
            }
        }
        display.innerText = numeroDisplay + decimal.join('');
    }
}

function separaGrupo(quant){
    let grupos = []
    for (let i = 0; i < numero.length; i += 3) {
        let grupo = numero.slice(i, i + 3);
        grupos.push(grupo);
    }
    grupos[0].splice(0, quant);
    return grupos.map(arr => arr.join('')).join('.')
}
