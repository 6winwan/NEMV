<<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="secondary">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">
        nembv
        <!--<img src="../../assets/logo.png" alt="logo" width="100"/>-->
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Setting">
            <topItem link="company" icon="sss">
              Company manage
            </topItem>
            <topItem link="group" icon="sss">
              Group manage
            </topItem>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="test">
            <topItem link="test" icon="sss">
              test
            </topItem>
            <topItem link="hello" icon="sss">
              hello-vue
            </topItem>
          </b-nav-item-dropdown>
          <b-nav-item href="#" disabled>Comming soon</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">English</b-dropdown-item>
            <b-dropdown-item href="#">French</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <b-breadcrumb :items="this.$route.meta.breadcrumb"/>
  </div>
</template>

<script>
  import topItem from './topItem';

  export default {
    name: 'top',
    components: { topItem },
  };
</script>

<style scoped>
</style>