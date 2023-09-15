document.addEventListener("DOMContentLoaded", function () {
    const chocolateData = [
        {
            id: 1,
            name: "Dairy Milk",
            img: "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: 3
        },{
            id:2,
            name:"Kit Kat",
            img:"https://media.istockphoto.com/id/458090597/photo/kitkat-chocolate-candy-bar.jpg?s=2048x2048&w=is&k=20&c=svRRv8Cegihewurlp2L6C2yOuj0w-gCo6mWS7uGajOc=",
            price:5
        },
        {
            id:3,
            name:"5 Star",
            img:"https://img1.exportersindia.com/product_images/bc-small/2019/5/5118241/5-star-chocolate-1558517535-4919038.jpeg",
            price:2
        },
        {
            id:4,
            name:"Snickers",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTmOTwkT_pqeTeaqDArzlABnKrS1S24rL2HA&usqp=CAU",
            price:6
        },
        {
            id:5,
            name:"Munch",
            img:"https://5.imimg.com/data5/SELLER/Default/2022/7/PT/ST/VR/16553030/munch-chocolate.png",
            price:4
        },
        {
            id:6,
            name:"Bar One",
            img:"https://mishry.com/wp-content/uploads/2021/06/nestle-bar-one-chocolate-review.jpg",
            price:5
        },
        {
            id:7,
            name:"Dark Fantacy",
            img:"https://bgstores.in/wp-content/uploads/2020/07/61hLMtTxIFL._SL1000_.jpg",
            price:7
        },
        {
            id:8,
            name:"Hershey'S",
            img:"https://www.bigbasket.com/media/uploads/p/l/40239142_1-hersheys-dark-chocolate-bar-rich-taste.jpg",
            price:1
        }
    ];

    let selectedChocolates = [];
    selectedChocolates = chocolateData.map((chocolate) => ({ ...chocolate, quantity: 0 }));

    function updateUI() {
        const totalSelectedChocolates = selectedChocolates.reduce((total, c) => total + c.quantity, 0);

        let totalPrice = 0;
        selectedChocolates.forEach((chocolate) => {
            totalPrice += chocolate.price * chocolate.quantity;
        });

        document.getElementById("totalSelectedChocolates").textContent = totalSelectedChocolates;
        document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);

        const chocolateContainer = document.getElementById("chocolateContainer");
        chocolateContainer.innerHTML = "";

        chocolateData.forEach((chocolate) => {
            const card = document.createElement("div");
            card.className = "col-md-3  card bg-light";

            card.innerHTML = `
                <img src="${chocolate.img}" style="width: 100%; height: 50%;" class="card-img-top" alt="${chocolate.name}">
                <div class="card-body">
                    <h5 class="card-title">${chocolate.name}</h5>
                    <p class="card-text">Price: $${chocolate.price.toFixed(2)}</p>
                    <span>Chocolates Added: ${getTotalChocolatesAdded(chocolate.id)}</span>
                    <div>
                        <button class='btn btn-outline-danger m-2' data-id="${chocolate.id}" data-action="add">Add Chocolate</button>
                        <button class='btn btn-outline-danger m-1' data-id="${chocolate.id}" data-action="subtract">Subtract Chocolate</button>
                    </div>
                </div>
            `;

            chocolateContainer.appendChild(card);
        });

        if (totalSelectedChocolates >= 8) {
            alert("You can't add more than 8 chocolates.");
        }
    }

    document.getElementById("chocolateContainer").addEventListener("click", function (event) {
        const target = event.target;
        if (target.tagName === "BUTTON") {
            const action = target.getAttribute("data-action");
            const chocolateId = parseInt(target.getAttribute("data-id"));

            if (action === "add") {
                const currentQuantity = selectedChocolates.find((c) => c.id === chocolateId)?.quantity || 0;
                if (currentQuantity < 8) {
                    handleChocolateSelection(chocolateId, currentQuantity + 1);
                }
            } else if (action === "subtract") {
                const currentQuantity = selectedChocolates.find((c) => c.id === chocolateId)?.quantity || 0;
                if (currentQuantity > 0) {
                    handleChocolateSelection(chocolateId, currentQuantity - 1);
                }
            }
        }
    });

    function handleChocolateSelection(chocolateId, quantity) {
        const existingIndex = selectedChocolates.findIndex((c) => c.id === chocolateId);

        if (existingIndex !== -1) {
            selectedChocolates[existingIndex].quantity = quantity;
        }

        updateUI();
    }

    function getTotalChocolatesAdded(chocolateId) {
        const selectedChocolate = selectedChocolates.find((c) => c.id === chocolateId);
        return selectedChocolate ? selectedChocolate.quantity : 0;
    }

    updateUI();
});
