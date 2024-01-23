export default {
  props: ["pagination"],
  methods: {
    emitPage(num) {
      this.$emit("emitPage", num);
    },
  },
  template: ` <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a @click="emitPage(pagination.current_page - 1)" class="page-link" :class="{'disabled':!pagination.has_pre}"
                             href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" v-for="(item,key) in pagination.total_pages"
                       ><a @click="emitPage(pagination.current_page = item)" class="page-link" :class="{'active':pagination.current_page == item}" href="#">{{item}}</a>
                    </li>
                    <li class="page-item">
                        <a @click="emitPage(pagination.current_page + 1)" class="page-link" :class="{'disabled':!pagination.has_next}" 
                            href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>`,
};
