<template>
  <b-container class="p-3">
    <b-card header="Login">
      <b-form @submit="signin">
        <b-form-group label="ID"
                      label-for="f-id"
                      description="You need ID to use app.">
          <b-form-input id="f-id"
                        type="text"
                        v-model="form.id"
                        required
                        placeholder="Fill in please..">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password"
                      label-for="f-pwd">
          <b-form-input id="f-pwd"
                        type="password"
                        v-model="form.pwd"
                        required
                        placeholder="Please enter the password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Log-In</b-button>
        <b-button variant="primary" href="/#/register">Sign-In</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'sign',
  data() {
    return {
      path: 'auth/sign/in',
      form: {
        id: '',
        pwd: '',
      },
    };
  },
  methods: {
    swalSuccess(msg) {
      return this.$swal({
        icon: 'success',
        title: 'Sucess',
        text: msg,
        // timer: 2000,
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
    signin(evt) {
      evt.preventDefault();
      this.$axios.post(`${this.$cfg.path.api}${this.path}`, this.form)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg);
          return this.swalSuccess(`token: ${res.data.token}`);
        })
        .then(() => {
          location.href = '/#/';
        })
        .catch((err) => {
          this.swalError(err.message);
        });
    },
  },
};
</script>