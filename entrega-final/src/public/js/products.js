const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");
const btnPrevPage = document.getElementById("btn-prev-page");
const btnNextPage = document.getElementById("btn-next-page");
let page = 1;

const loadProductsList = async () => {
    const response = await fetch(`/api/products?page=${page}`, { method: "GET" });
    const data = await response.json();
    const products = data.payload.docs ?? [];

    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `<li>Id: ${product.id} - Nombre: ${product.title} </li>`;
    });

};

btnRefreshProductsList.addEventListener("click", () => {
    loadProductsList();
    console.log("Lista recargada");
});

btnPrevPage.addEventListener("click", () => {
    if (page > 1) {
        page--;
        loadProductsList();
    }
});

btnNextPage.addEventListener("click", () => {
    page++
    loadProductsList();
});

loadProductsList();