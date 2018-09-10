<template>
  <div>
   	<b-row class="mb-4">
      <b-col cols="4">
   		<input type="text" v-model="search" class="form-control" id="input-text" placeholder="Company Search">
   	  </b-col>
   		<b-cole>
   		</b-cole>
   	  </b-row>
   	<b-alert variant="warning" show v-if="!d.ds.length">
   	  <h4><icon name="info"></icon> Welcome, Please register company</h4>
   	  <p>Please start 'Add Company'</p>
   	</b-alert>
   	<b-card-group deck class="mb-3" v-else>
   	  <b-card no-body
   		v-for="(v, i) in d.ds"
   		:sub-title="v.rmk"
   		:key="v._id">
   		<b-card-header>
   		<h4>{{ v.name }}</h4>
   		</b-card-header>
   		<b-card-body>
   	      <p class="card-text">{{v.rmk}}</p>
   		<gmap-map
   		  :id="'map' + i.toString()"
   		  :center="v.pos"
   		  :zoom="12"
   		  style="height: 300px">
   		  <gmap-maker :position="v.pos" :icon="markerIcon"></gmap-maker>
   		  <gmap-circle
   			:center="v.pos"
   			:radius="100"
   		    :options"circleOptions"
   			></gmap-circle>
   			<!--<gmap-marker v-for="(w, j) in v.sgr_ids" :key="w._id" v-for="(x, k) in w.sdv_ids" :key="x._id" :position="x.r.pos" :icon="markerIcon"></gmap-marker>-->
         	</gmap-map>
         </b-card-body>
       	 	<!--<b-list-group flush>-->
         	<!--<b-list-group-item v-for="(w, j) in v.gr_ids" :key="w._id" class="d-flex justify-content-between align-items-center">-->
           	<!--<span> {{ w.name }} </span>-->
        	<!--</b-list-group-item>-->
        	 <!--</b-list-group>-->
        <b-list-group flush>
          <b-list-group-item v-for="(gr, j) in v.gr_ids" :key="gr._id">
            <span> {{ gr.name }} </span>
            <b-button-group class="float-right" size="sm">
              <b-btn variant="outline-warning" @click="modGr(gr)"><icon name="pencil-alt"></icon></b-btn>
              <b-btn variant="outline-danger" @click="delGr(gr)"><icon name="trash"></icon></b-btn>
            </b-button-group>
          </b-list-group-item>
          <b-list-group-item>
            <span> Add New Group </span>
            <b-button-group class="float-right" size="sm">
              <b-btn variant="outline-success" @click="addGr(v)"><icon name="plus"></icon></b-btn>
            </b-button-group>
          </b-list-group-item>

        </b-list-group>

        <b-card-footer>
          <p>
            <small class="text-muted"> Updated:{{ ago(v.ut) }}</small>
            <b-button-group class="float-right">
              <b-btn variant="outline-warning" @click="modalOpen(v)"><icon name="pencil-alt"></icon></b-btn>
              <b-btn variant="outline-danger" @click="del(v)"><icon name="trash"></icon></b-btn>
            </b-button-group>
          </p>
        </b-card-footer>
      </b-card>
    </b-card-group>

    <b-row>
      <b-col>
        <b-btn variant="info" @click="list">Refresh</b-btn>
        <b-btn variant="success" @click="add" >Add Company</b-btn>
      </b-col>
      <b-col>
        <b-pagination align="right" size="md" @input="list" :total-rows="d.cnt" v-model="page" :per-page="s.limit">
        </b-pagination>
      </b-col>
    </b-row>


    <b-modal ref="mdRef" :title="md.set.name">
      <b-row class="mb-2">
        <b-col>
          <b-input-group prepend="Company name">
            <b-form-input type="text" v-model="md.set.name"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col>
          <b-input-group prepend="Explanation">
            <b-form-input type="text" v-model="md.set.rmk"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <gmap-map
        :center="md.set.pos"
        :zoom="12"
        style="height: 250px"
        @click="mdSetPos">
        <gmap-marker :position="md.set.pos"></gmap-marker>
      </gmap-map>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="mod(md.set)">
          Save
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>

  export default {
    name: 'company',
    data() {
      return {
        page: 1,
        search: '',
        s: {
          draw: 0,
          skip: 0,
          limit: 3,
          order: 'name',
          sort: 1,
        },
        d: {
          draw: 0,
          cnt: 0,
          ds: [],
        },
        md: {
          set: {
            _id: '',
            name: '',
            rmk: '',
            pos: {
              lat: 51,
              lng: 114,
            },
          },
          // name: 'def',
        },
        markerIcon: {
          path: this.$fam.BUILDING_O,
          scale: 0.4,
          strokeWeight: 0.0,
          strokeColor: 'black',
          strokeOpacity: 1,
          fillColor: '#3276B1',
          fillOpacity: 0.9,
        },
        circleOptions: {
          strokeColor: '#1cc3ff',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#99fdff',
          fillOpacity: 0.35,
        },
      };
    },
    mounted() {
      this.list();
    },
    computed: {
      setSkip() {
        if (this.page <= 0) return 0;
        return (this.page - 1) * this.s.limit;
      },
    },
    methods: {
      swalSuccess(msg) {
        return this.$swal({
          icon: 'success',
          // button: false,
          title: 'Sucess',
          text: msg,
          timer: 2000,
        });
      },
      swalWarning(msg) {
        return this.$swal({
          icon: 'warning',
          // button: false,
          title: 'failed',
          text: msg,
          timer: 2000,
        });
      },
      swalError(msg) {
        return this.$swal({
          icon: 'error',
          // button: false,
          title: 'error',
          text: msg,
          timer: 2000,
        });
      },
      modalOpen(v) {
        this.md.set = v;
        this.$refs.mdRef.show();
      },
      ago(t) {
        return this.$moment(t).fromNow();
      },
      mdSetPos(m) {
        this.md.set.pos = m.latLng;
      },
      list() {
        this.$axios.get(`${this.$cfg.path.api}data/company`, {
          params: {
            draw: (this.s.draw += 1),
            search: this.search,
            skip: this.setSkip,
            limit: this.s.limit,
            order: this.s.order,
            sort: this.s.sort,
          },
        })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            this.d = res.data.d;
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Cannot road the list.');
          });
      },
      add() {
        this.$swal({
          title: 'Add Compnay',
          content: 'input',
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Add',
            },
          },
        })
          .then((res) => {
            if (!res) throw new Error('');
            return this.$axios.post(`${this.$cfg.path.api}data/company`, {
              name: res,
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Adding compnay complete');
          })
          .then(() => {
            this.list();
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Please enter the name of compnay');
          });
      },
      del(v) {
        this.$swal({
          title: 'Remove Compnay',
          dangerMode: true,
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Remove',
            },
          },
        })
          .then((sv) => {
            if (!sv) throw new Error('');
            return this.$axios.delete(`${this.$cfg.path.api}data/company`, {
              params: { id: v._id },
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Remove company complete');
          })
          .then(() => {
            this.list();
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('remove company cancel');
          });
      },
      mod(v) {
        this.$swal({
          title: 'company info',
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
            return this.$axios.put(`${this.$cfg.path.api}data/company`, {
              _id: v._id,
              name: v.name,
              rmk: v.rmk,
              pos: v.pos,
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            this.$refs.mdRef.hide();
            return this.swalSuccess('Company info changed');
          })
          .then(() => {
            this.list();
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Cancel modify compnay');
          });
      },
      addGr(cp) {
        this.$swal({
          title: 'Add Group',
          content: {
            element: 'input',
            attribu: {
              placeholder: 'Calgary',
            },
          },
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Add',
            },
          },
        })
          .then((res) => {
            if (!res) throw new Error(''); // return; // swal('canceled');
            return this.$axios.post(`${this.$cfg.path.api}data/group`, {
              name: res,
              cp_id: cp._id,
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Add Group complete');
          })
          .then(() => {
            this.list();
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Enter the name of Group');
          });
      },
      modGr(gr) {
        this.$swal({
          title: 'Group name change',
          // dangerMode: true,
          content: {
            element: 'input',
            attributes: {
              placeholder: 'Gouop1',
              value: gr.name,
            },
          },
          buttons: {
            cancel: {
              text: 'cancel',
              visible: true,
            },
            confirm: {
              className: 'red-bg',
              text: 'modify',
            },
          },
        })
          .then((res) => {
            if (!res) throw new Error('');
            return this.$axios.put(`${this.$cfg.path.api}data/group`, {
              _id: gr._id,
              name: res,
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Group modify complete');
          })
          .then(() => {
            this.list();
          })
          .catch((err) => {
            if (err.message) this.swalError(err.message);
            else this.swalWarning('Cancel group modify');
          });
      },
      delGr(gr) {
        this.$swal({
          title: 'Remove Group',
          dangerMode: true,
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true,
            },
            confirm: {
              text: 'Remove',
            },
          },
        })
          .then((res) => {
            if (!res) throw new Error('');
            return this.$axios.delete(`${this.$cfg.path.api}data/group`, {
              params: { _id: gr._id },
            });
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.msg);
            return this.swalSuccess('Remove Group complete');
          })
          .then(() => {
            this.list();
          })
          .catch((err) => {
            if (err.message) return this.swalError(err.message);
            this.swalWarning('Cancel Group remove');
          });
      },
    },
    watch: {
      search() {
        // this.inputSync();
        this.list();
      },
    },
    destroyed() {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>