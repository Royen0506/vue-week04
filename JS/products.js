const { createApp } = Vue;
import pagination from "../JS/components/pagination.js";
import modal from "../JS/components/modal.js";
import delModal from "../JS/components/delModal.js";

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io",
      path: "royen",
      products: [],
      pagination: {},
      isNew: true,
      bsProductModal: null,
      bsDelProductModal: null,
      tempProduct: {
        imagesUrl: "",
      },
    };
  },
  mounted() {
    const myToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // this.bsDelProductModal = new bootstrap.Modal(this.$refs.delProductModal);

    axios.defaults.headers.common["Authorization"] = myToken;
    this.checkAdminInfo();
  },
  components: { pagination, modal, delModal },
  methods: {
    checkAdminInfo() {
      axios
        .post(`${this.apiUrl}/v2/api/user/check`)
        .then((res) => {
          this.getProductData();
        })
        .catch((err) => {
          alert(err.data.message);
          location.href = "../HTML/index.html";
        });
    },
    getProductData(num = 1) {
      axios
        .get(`${this.apiUrl}/v2/api/${this.path}/admin/products?page=${num}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        });
    },
    productModal(product, isNew) {
      if (isNew === "new") {
        this.isNew = true;
      } else {
        this.isNew = false;
      }
      this.tempProduct = { ...product };
      this.bsProductModal.show();
    },
    delProductModal(product) {
      this.tempProduct = { ...product };
      this.bsDelProductModal.show();
    },
    clearTempProduct() {
      this.tempProduct = { imagesUrl: [] };
    },
    deleteProduct() {
      axios
        .delete(
          `${this.apiUrl}/v2/api/${this.path}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          this.bsDelProductModal.hide();
          this.getProductData();
        });
    },
    addImage() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    updateProduct(id) {
      let url = "";
      let http = "";
      if (this.isNew === true) {
        url = `${this.apiUrl}/v2/api/${this.path}/admin/product`;
        http = "post";
      } else {
        url = `${this.apiUrl}/v2/api/${this.path}/admin/product/${id}`;
        http = "put";
      }

      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          this.bsProductModal.hide();
          this.getProductData();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getProductModal(modal) {
      this.bsProductModal = modal;
    },
    getDelProductModal(modal) {
      this.bsDelProductModal = modal;
    },
  },
});

app.mount("#app");
