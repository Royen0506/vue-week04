export default {
  data() {
    return {
      bsProductModal: null,
      isNew: true,
    };
  },
  props: ["tempProduct"],
  mounted() {
    this.bsProductModal = new bootstrap.Modal(this.$refs.productModal);
    this.$emit("bsModal", this.bsProductModal);
  },
  methods: {
    clearTempData() {
      this.$emit("clearTempData");
    },
    updateProductData(id) {
      this.$emit("updateProductData", id);
    },
    addImage() {
      this.$emit("addImage");
    },
  },
  template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 id="productModalLabel" class="modal-title">
                            <span v-if="isNew">新增產品</span>
                            <span v-else>編輯產品</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="mb-3">
                                    <label for="imageUrl" class="form-label">主要圖片</label>
                                    <input id="imageUrl" type="text" class="form-control mb-2"
                                        v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                                    <img class="img-fluid" :src="tempProduct.imageUrl">
                                </div>
                                <h3 class="mb-3">多圖新增</h3>
                                <div v-if="tempProduct.imagesUrl">
                                    <div v-for="(url,key) in tempProduct.imagesUrl" :key="url" class="mb-1">
                                        <div class="mb-3">
                                            <label :for="key" class="form-label">圖片網址</label>
                                            <input :id="key" type="text" v-model="tempProduct.imagesUrl[key]"
                                                class="form-control" placeholder="請輸入圖片連結">
                                        </div>
                                        <img class="img-fluid" :src="url">
                                    </div>
                                    <div
                                        v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                                        <button class="btn btn-outline-primary btn-sm d-block w-100"
                                            @click="tempProduct.imagesUrl.push('')">
                                            新增圖片
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-outline-danger btn-sm d-block w-100"
                                            @click="tempProduct.imagesUrl.pop()">
                                            刪除圖片
                                        </button>
                                    </div>
                                </div>
                                <div v-else>
                                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImage">
                                        新增圖片
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="mb-3">
                                    <label for="title" class="form-label">標題</label>
                                    <input id="title" type="text" v-model="tempProduct.title" class="form-control"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="category" class="form-label">分類</label>
                                        <input id="category" type="text" v-model="tempProduct.category"
                                            class="form-control" placeholder="請輸入分類">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="unit" class="form-label">單位</label>
                                        <input id="unit" type="text" v-model="tempProduct.unit" class="form-control"
                                            placeholder="請輸入單位">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="origin_price" class="form-label">原價</label>
                                        <input id="origin_price" type="number" min="0" class="form-control"
                                            placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="price" class="form-label">售價</label>
                                        <input id="price" type="number" min="0" class="form-control"
                                            v-model.number="tempProduct.price" placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>

                                <div class="mb-3">
                                    <label for="description" class="form-label">產品描述</label>
                                    <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                                        v-model="tempProduct.description">
                                      </textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="content" class="form-label">說明內容</label>
                                    <textarea id="content" type="text" class="form-control" placeholder="請輸入說明內容"
                                        v-model="tempProduct.content">
                                      </textarea>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input id="is_enabled" v-model="tempProduct.is_enabled" true-value="1"
                                            false-value="0" class="form-check-input" type="checkbox">
                                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"
                            @click="clearTempData">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="updateProductData(tempProduct.id)">
                            確認
                        </button>
                    </div>
                </div>
            </div>
        </div>`,
};
