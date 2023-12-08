let productName = document.getElementById("ProductName");
let productPrice = document.getElementById("ProductPrice");
let productCategory = document.getElementById("ProductCategory");
let productDescription = document.getElementById("ProductDescription");
// console.log(productName, productPrice, productCategory, productDescription);
/*********************add product**************************** */
let addBtn = document.getElementById("AddBtn");
// console.log(addBtn);
let allProducts = [];
if (window.localStorage.getItem("products") !== null) {
    allProducts = JSON.parse(window.localStorage.getItem("products"));
    loopData();
}
addBtn.addEventListener("click", function () { // console.log("welcome")
    if (validateInputs()) {
        let productData = {
            pname: productName.value,
            pprice: productPrice.value,
            pcat: productCategory.value,
            pdesc: productDescription.value
        };
        // console.log(productData);
        allProducts.push(productData);
        // console.log(allProducts);
        window.localStorage.setItem('products', JSON.stringify(allProducts));
        loopData();
        clearData();
    }
});
/******************Read Products**************************/
function loopData() {
    let tableData = ``;
    let pid = 0;
    for (let i = 0; i < allProducts.length; i++) { // console.log(allProducts);
        tableData += `
        <tr>
        <td>${
            ++ pid
        }</td>
        <td>${
            allProducts[i].pname
        }</td>
        <td>${
            allProducts[i].pprice
        }</td>
        <td>${
            allProducts[i].pcat
        }</td>
        <td>${
            allProducts[i].pdesc
        }</td>
        <td><button class="delete" onclick="deleteProduct(${i})">Delete</button></td> 
        <td><button class="update" onclick="updateProduct(${i})">Update</button></td>
    </tr>
    `;
    }
    document.getElementById("info").innerHTML = tableData;
}
/********************Delete Product*****************************/
function deleteProduct(product) {
    allProducts.splice(product, 1);
    loopData();
    window.localStorage.setItem("products", JSON.stringify(allProducts));
}
/********************Update Product*****************************/
let updateBtn = document.getElementById("UpdateBtn");
// console.log(updateBtn);
let productNumber;
function updateProduct(product) {
    productNumber = product;
    productName.value = allProducts[product].pname;
    productPrice.value = allProducts[product].pprice;
    productCategory.value = allProducts[product].pcat;
    productDescription.value = allProducts[product].pdesc;
    addBtn.classList.toggle("hide");
    updateBtn.classList.toggle("hide");
}
updateBtn.addEventListener("click", function () {
    if (validateInputs()) {
        allProducts[productNumber].pname = productName.value;
        allProducts[productNumber].pprice = productPrice.value;
        allProducts[productNumber].pcat = productCategory.value;
        allProducts[productNumber].pdesc = productDescription.value;
        loopData();
        window.localStorage.setItem("products", JSON.stringify(allProducts));
        addBtn.classList.toggle("hide");
        updateBtn.classList.toggle("hide");
        clearData();
    }
});
/******************clear products data****************************/

function clearData() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}
/***************simple validation for inputs********/
function validateInputs() {
    if (productName.value.trim() === "") {
        alert("Please enter a product name.");
        return false;
    }

    if (productPrice.value.trim() === "") {
        alert("Please enter a product price.");
        return false;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(productPrice.value.trim())) {
        alert("Product price must be a number with up to 2 decimal places.");
        return false;
    }

    if (productCategory.value.trim() === "") {
        alert("Please enter a product category.");
        return false;
    }

    if (productDescription.value.trim() === "") {
        alert("Please enter a product description.");
        return false;
    }
    return true;
}
/*********************************/
