let coursesList = document.getElementById("courses-list");

function showItem(Item) {
    console.log(Item);
}

coursesList.addEventListener("click", function(event)
{
    event.preventDefault();
    let tr = event.target;
    let Target = tr.classList.contains("add-to-cart");

     
    let card = tr.parentNode.parentNode;
    let image = card.firstElementChild.getAttribute('src');

    let cardInfo = card.lastElementChild;
    let name = cardInfo.querySelector("h4").innerText;

    let price = cardInfo.querySelector(".price").querySelector("span").innerText;

    const object = {
        Name: name,
        Image: image,
        Price: price,
    }
    showItem(object);

})



//--------------------Footer-----------------------------------------------------

let Allfooter = document.querySelector(".footer");
let footerElement = Allfooter.querySelectorAll(".link");


for(let i=0; i<8; i++)
{
    if(i%2==0)
    {
        let footer = footerElement[i];
        footer.style.color="red";
    }
    
}