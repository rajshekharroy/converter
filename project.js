const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("form button");

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
const swipe = document.querySelector('.swipe')
const amountBox = document.querySelector('.amount-box')


amountBox.addEventListener("input",(evt)=>{
    let value = evt.target.value;
    if(value.length > 6){
        evt.target.value = value.slice(0,6);
    }
})

msg.classList.add("hide")
for (let select of dropdowns) {
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";}
        select.append(newOption);
    }

    select.addEventListener("change" ,(evt)=>{
        updateFlag(evt.target);
    })
}


const updateFlag = (element)=>{
    let allCode = element.value;
    let counCode = countryList[allCode];
    let newSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
    let flagImg = element.parentElement.querySelector("img");
    flagImg.src = newSrc;
}

swipe.addEventListener("click",()=>{
    const tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;
    updateFlag(fromCurr);
    updateFlag(toCurr);
})


btn.addEventListener("click",async(evt) =>{
    msg.classList.remove("hide");
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal<1){
        amtVal = 1;
        amount.value = "1";
    } 
    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json` 
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalVal1 = rate * amtVal;
    let finalVal2 = finalVal1.toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalVal2} ${toCurr.value}`
})
