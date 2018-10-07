<template>
  <div>
    <b-row class="mb-4">
      <b-col cols="6">
        <input type="text" v-model="filter" class="form-control" id="input-text" placeholder="Search title">
      </b-col>
      <b-col cols="6">
        <b-form-group horizontal label="Per" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <b-table
      id="tt"
      ref="table"
      show-empty
      stacked="md"
      :items="list"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :busy.sync="isBusy"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      no-local-sorting
    >
      <!--@sort-changed="sortingChanged"-->
      <!--:no-local-sorting="true"-->
      <template slot="_id" slot-scope="row">
        <b-badge variant="info">
          {{ id2time(row.item._id) }}
        </b-badge>
      </template>
      <template slot="ut" slot-scope="row">
        <b-badge variant="info">
          {{ ago(row.item.ut) }}
        </b-badge>
      </template>
       <template slot="cmt_ids" slot-scope="row">
        <b-badge pill variant="success">
          {{ row.item.cmt_ids.length }}
        </b-badge>
      </template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" variant="primary" @click.stop="row.toggleDetails" @click="read(row)">
          {{ row.detailsShowing ? 'Hide' : 'View' }}
        </b-button>
        <!--<b-btn>{{row.item._id}}</b-btn>-->
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card no-body
                :title="row.item.title"
        >
          <b-card-body>
            <p class="card-text" style="white-space: pre;">{{row.item.content}}</p>
          </b-card-body>

          <b-list-group flush>
            <b-list-group-item v-for="(cmt) in row.item.cmt_ids" :key="cmt._id">
              <b-row>
                <b-col cols="2">
                  <b-badge>{{ cmt.id }}</b-badge>
                </b-col>
                <b-col cols="6">
                  <span style="white-space: pre;">  {{ cmt.content}}</span>
                </b-col>
                <b-col cols="2">
                  <small class="text-muted">  {{ ago(cmt.ut) }}</small>
                </b-col>
                <b-col cols="2">
                  <b-button-group class="float-right" size="sm">
                    <b-btn variant="outline-warning" @click="mdModCmtOpen(cmt)"><icon name="pen"></icon></b-btn>
                    <b-btn variant="outline-danger" @click="delCmt(cmt)"><icon name="trash"></icon></b-btn>
                  </b-button-group>
                </b-col>
              </b-row>


            </b-list-group-item>
            <b-list-group-item>
              <span> New Comment </span>
              <b-button-group class="float-right" size="sm">
                <b-btn variant="outline-success" @click="mdAddCmtOpen(row.item)"><icon name="plus"></icon></b-btn>
              </b-button-group>
            </b-list-group-item>

          </b-list-group>

          <b-card-footer>
            <small class="text-muted">{{ ago(row.item.ut) }}</small>
            <b-button-group class="float-right">
              <b-btn variant="outline-warning" @click="mdModOpen(row.item)"><icon name="pen"></icon></b-btn>
              <b-btn variant="outline-danger" @click="del(row.item)"><icon name="trash"></icon></b-btn>
            </b-button-group>
          </b-card-footer>
        </b-card>
      </template>
    </b-table>
    <!--<b-table id="my-table" show-empty :busy.sync="isBusy" :items="list"></b-table>-->


    <b-row>
      <b-col>
        <b-btn variant="info" @click="refresh">Refresh</b-btn>
        <b-btn variant="success" @click="mdAddOpen" >Write Content</b-btn>
      </b-col>
      <b-col>
        <b-pagination
          align="right"
          size="md"
          :total-rows="totalRows"
          v-model="currentPage"
          :per-page="perPage"
          >
        </b-pagination>
      </b-col>
    </b-row>

    <b-modal ref="mdAdd" hide-footer title="Write New content">
      <b-form @submit="add">
        <b-form-group label="Name:"
                      label-for="f-a-id">
          <b-form-input id="f-a-id"
                        type="text"
                        v-model="form.id"
                        required
                        placeholder="User Name">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Title:"
                      label-for="f-a-title">
          <b-form-input id="f-a-title"
                        type="text"
                        v-model="form.title"
                        required
                        placeholder="Title here">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Content"
                      label-for="f-a-content">
          <b-form-textarea id="f-a-content"
                           v-model="form.content"
                           placeholder="Your content here"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="primary" class="float-right">Write content</b-btn>
      </b-form>
    </b-modal>

    <b-modal ref="mdMod" hide-footer title="Modify content">
      <b-form @submit="mod">
        <b-form-group label="name:"
                      label-for="f-m-id">
          <b-form-input id="f-m-id"
                        type="text"
                        v-model="form.id"
                        required
                        placeholder="User name here">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Title:"
                      label-for="f-m-title">
          <b-form-input id="f-m-title"
                        type="text"
                        v-model="form.title"
                        required
                        placeholder="Your title here">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Content"
                      label-for="f-m-content">
          <b-form-textarea id="f-m-content"
                           v-model="form.content"
                           placeholder="Content here"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="warning" class="float-right">Modify content</b-btn>
      </b-form>
    </b-modal>

    <b-modal ref="mdAddCmt" hide-footer title="Write comment">
      <b-form @submit="addCmt">
        <b-form-group label="Name:"
                      label-for="f-a-c-id">
          <b-form-input id="f-a-c-cid"
                        type="text"
                        v-model="formCmt.id"
                        required
                        placeholder="User name">
          </b-form-input>
        </b-form-group>

        <b-form-group label="content"
                      label-for="f-a-c-content">
          <b-form-textarea id="f-a-c-content"
                           v-model="formCmt.content"
                           placeholder="Content Here"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="primary" class="float-right">Write Content</b-btn>
      </b-form>
    </b-modal>

    <b-modal ref="mdModCmt" hide-footer title="Modify comment">
      <b-form @submit="modCmt">
        <b-form-group label="Name:"
                      label-for="f-m-c-id">
          <b-form-input id="f-m-c-id"
                        type="text"
                        v-model="formCmt.id"
                        required
                        placeholder="User name">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Content"
                      label-for="f-m-c-ontent">
          <b-form-textarea id="f-m-c-ontent"
                           v-model="formCmt.content"
                           placeholder="Content here"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="warning" class="float-right">Modify Content</b-btn>
      </b-form>
    </b-modal>

  </div>
</template>

<script>

  export default {
    name: 'talk',
    data() {
      return {
        fields: [
          {
            key: '_id',
            label: 'Date',
            sortable: true,
          },
          // {
          //   key: 'ut',
          //   label: '수정날짜',
          //   sortable: true,
          // },
          {
            key: 'id',
            label: 'Writer',
            sortable: true,
          },
          {
            key: 'title',
            label: 'Title',
            sortable: true,
          },
          {
            key: 'cntView',
            label: 'View',
            sortable: true,
          },
          {
            key: 'cmt_ids',
            label: 'Conmment',
            sortable: true,
          },
          {
            key: 'actions',
            label: 'Content',
            sortable: true,
          },
        ],
        isBusy: false,
        items: [],
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        pageOptions: [5, 10, 15],
        sortBy: 'ut',
        sortDesc: false,
        filter: '',
        draw: 0,
        form: {
          _id: '',
          id: '',
          title: '',
          content: '',
        },
        formCmt: {
          bd_id: '',
          _id: '',
          id: '',
          content: '',
        },
      };
    },
    // props: ['items'],
    mounted() {
      // this.list();
      // this.test();
    },
    computed: {
      setSkip() {
        if (this.currentPage <= 0) return 0;
        return (this.currentPage - 1) * this.perPage;
      },
      setSort() {
        return this.sortDesc ? -1 : 1;
      },
    },
    methods: {
      swalSuccess(msg) {
        return this.$swal({
          icon: 'success',
          title: 'Success',
          text: msg,
          timer: 2000,
        });
      },
      swalWarning(msg) {
        return this.$swal({
          icon: 'warning',
          title: 'Failed',
          text: msg,
          timer: 2000,
        });
      },
      swalError(msg) {
        return this.$swal({
          icon: 'error',
          title: 'Error',
          text: msg,
          timer: 2000,
        });
      },
      mdAddOpen() {
        this.form._id = '';
        this.form.id = '';
        this.form.title = '';
        this.form.content = '';
        this.$refs.mdAdd.show();
      },
      mdModOpen(v) {
        this.form._id = v._id;
        this.form.id = v.id;
        this.form.title = v.title;
        this.form.content = v.content;
        this.$refs.mdMod.show();
      },
      mdAddCmtOpen(v) {
        this.formCmt.bd_id = v._id;
        this.formCmt._id = '';
        this.formCmt.id = '';
        this.formCmt.content = '';
        this.$refs.mdAddCmt.show();
      },
      mdModCmtOpen(v) {
        this.formCmt.bd_id = v._id;
        this.formCmt._id = v._id;
        this.formCmt.id = v.id;
        this.formCmt.content = v.content;
        this.$refs.mdModCmt.show();
      },
      ago(t) {
        return this.$moment(t).fromNow();
      },
      id2time(_id) {
        return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString();
      },
      refresh() {
        this.$refs.table.refresh();
      },
      sortingChanged(ctx) {
        this.sortBy = ctx.sortBy;
        this.sortDesc = ctx.sortDesc;
        // if (ctx.sortDesc) this.s.order = -1;
        // else this.s.order = 1;
        this.list();
        // console.log(ctx);
      },
      list(ctx) {
        this.sortBy = ctx.sortBy;
        this.sortDesc = ctx.sortDesc;
        this.isBusy = true;
        const p = this.$axios.get(`${this.$cfg.path.api}data/board`, {
          params: {
            draw: (this.draw += 1),
            search: this.filter,
            skip: this.setSkip,
            limit: this.perPage,
            order: this.sortBy,
            sort: this.setSort,
          },
        });
        return p.then((res) => {
          if (!res.data.success) throw new Error(res.data.msg);
          this.totalRows = res.data.d.cnt;
          this.isBusy = false;
          // const items = res.data.d.ds;
          return res.data.d.ds;
        })
          .catch((err) => {
            this.isBusy = false;
            this.swalError(err.message);
            return [];
          });
      },
      read(r) {
        if (r.detailsShowing) return;
        const _id = r.item._id;
        this.isBusy = true;
        this.$axios.get(`${this.$cfg.path.api}data/board/${_id}`)
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            r.item.cntView = res.data.d.cntView;
            r.item.content = res.data.d.content;
            r.item.cmt_ids = res.data.d.cmt_ids;
            // console.log(res.data.d);
            // console.log(r.item);
            this.isBusy = false;
          })
          .catch((err) => {
            this.isBusy = false;
            this.swalError(err.message);
          });
      },
      add(evt) {
        evt.preventDefault();
        this.$axios.post(`${this.$cfg.path.api}data/board`, this.form)
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Write Complete');
          })
          .then(() => {
            this.$refs.mdAdd.hide();
            this.refresh();
          })
          .catch((err) => {
            this.swalError(err.message);
          });
      },
      mod() {
        this.$swal({
          title: 'Can you modify the content?',
          dangerMode: true,
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Modify',
            },
          },
        })
          .then((sv) => {
            if (!sv) throw new Error('');
            return this.$axios.put(`${this.$cfg.path.api}data/board`, this.form);
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Complete content modification');
          })
          .then(() => {
            this.$refs.mdMod.hide();
            this.refresh();
            // this.list(); // todo: instead one article..
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Cancel content modification');
          });
      },
      del(v) {
        this.$swal({
          title: 'Delete content',
          dangerMode: true,
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Delete',
            },
          },
        })
          .then((sv) => {
            if (!sv) throw new Error('');
            return this.$axios.delete(`${this.$cfg.path.api}data/board`, {
              params: { _id: v._id },
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Complete content delete');
          })
          .then(() => {
            this.refresh();
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Cancel content delete');
          });
      },

      addCmt(evt) {
        evt.preventDefault();
        this.$axios.post(`${this.$cfg.path.api}data/comment`, this.formCmt)
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Add comment complete');
          })
          .then(() => {
            this.$refs.mdAddCmt.hide();
            this.refresh();
          })
          .catch((err) => {
            this.swalError(err.message);
          });
      },
      modCmt() {
        this.$swal({
          title: 'Complete modification',
          dangerMode: true,
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Modify',
            },
          },
        })
          .then((res) => {
            if (!res) throw new Error('');
            return this.$axios.put(`${this.$cfg.path.api}data/comment`, this.formCmt);
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Complete comment modify');
          })
          .then(() => {
            this.$refs.mdModCmt.hide();
            this.refresh();
          })
          .catch((err) => {
            if (err.message) this.swalError(err.message);
            else this.swalWarning('Cancel comment modify');
          });
      },
      delCmt(cmt) {
        this.$swal({
          title: 'Delete comment',
          dangerMode: true,
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Delete',
            },
          },
        })
          .then((res) => {
            if (!res) throw new Error('');
            return this.$axios.delete(`${this.$cfg.path.api}data/comment`, {
              params: { _id: cmt._id },
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Complete comment delete');
          })
          .then(() => {
            this.refresh();
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Cancel comment delete');
          });
      },
    },
  };
</script>

<style scoped>
</style>