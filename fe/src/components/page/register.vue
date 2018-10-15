<template>
  <b-container class="p-3">
    <b-card header="Sign-In">
      <b-form @submit="register">
        <b-form-group label="ID"
                      label-for="f-id"
                      description="Please register your ID.">
          <b-form-input id="f-id"
                        type="text"
                        v-model="form.id"
                        required
                        placeholder="Fill in..">
          </b-form-input>
        </b-form-group>
        <b-form-group label="E-mail"
                      label-for="f-email"
                      description="For your password.">
          <b-form-input id="f-email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Fill in..">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password"
                      label-for="f-pwd">
          <b-form-input id="f-pwd"
                        type="password"
                        v-model="form.pwd"
                        required
                        placeholder="Password Please">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Sign-In</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      path: 'auth/register',
      form: {
        id: '',
        email: '',
        pwd: '',
      },
    };
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
        title: 'err',
        text: msg,
        timer: 2000,
      });
    },
    register(evt) {
      evt.preventDefault();
      this.$axios.post(`${this.$cfg.path.api}${this.path}`, this.form)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg);
          return this.swalSuccess('Sucess');
        })
        .then(() => {
          location.href = '/#/sign';
        })
        .catch((err) => {
          this.swalError(err.message);
        });
    },
  },
};
</script>