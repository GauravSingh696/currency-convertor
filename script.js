const dropdowns = document.querySelectorAll('.sel')
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const btn = document.querySelector('.btn')
const from_select = document.querySelector('.level select')
const to_select = document.querySelector('.level #to')
const display = document.querySelector('.display')

const update_rate = async() => {
    let amount = document.querySelector('.amount');
    let amt_value = amount.value;

    if(amt_value === "" && amt_value < 1) {
        amount.value= 1;
        amt_value = "1";
    }

    let url = `${BASE_URL}/${from_select.value.toLowerCase()}.json`;

    let fetching_data = await fetch(url)
    let data = await fetching_data.json();
    console.log(data);
    let rate = data[from_select.value.toLowerCase()][to_select.value.toLowerCase()];
    console.log(rate);

    let total_amount = amt_value * rate;
    display.innerText=`${amt_value} ${from_select.value} = ${total_amount} ${to_select.value}`;
}

btn.addEventListener('click' , (e) => {
    e.preventDefault();
    update_rate();
})

window.addEventListener('load' , () => {
    update_rate();
})

let dropdown = () => {
    for(let select of dropdowns) {
        for(let list in country_list) {
            let new_option = document.createElement('option')
            new_option.innerText = list;

            if(select.id==="from" && list==="USD"){
                new_option.selected=true;
                let new_src=`https://flagsapi.com/${country_list[list]}/flat/64.png`
                select.parentElement.querySelector('img').src=new_src;
            }
            else if(select.id==="to" && list==="INR"){
                new_option.selected=true;
                let new_src=`https://flagsapi.com/${country_list[list]}/flat/64.png`
                select.parentElement.querySelector('img').src=new_src;
            }

            select.appendChild(new_option);
        }
    }
}

from_select.addEventListener('change' , (e) => {
    update_flag(e.target);
    e.target.addEventListener('change', (e) => {
        co.classList.add('.flag')
    })
})


to_select.addEventListener('change' , (e) => {
    update_flag(e.target);
    e.target.addEventListener('change', (e) => {
        co.classList.add('.flag')
    })
})

update_flag = (eve) => {
    let code = country_list[eve.value];

    let new_src = `https://flagsapi.com/${code}/flat/64.png`

    let img = eve.parentElement.querySelector('img')

    img.src = new_src;
}

let ex=document.querySelector(".selection i");
ex.addEventListener("click",()=>{
    let t1=from_select.value;
    let t2=to_select.value;
    from_select.value=t2;
    update_flag(from_select);
    to_select.value=t1;
    update_flag(to_select);
})

dropdown();