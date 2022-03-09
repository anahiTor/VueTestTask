<template>
  <div>
    <b-button @click="$bvModal.show('createUserModal')">Create user</b-button>
     <b-modal id="createUserModal" title="Create user" @ok="createUser">
      <b-form-group>
        <b-form-input
          id="firstName"
          v-model="newUser.name"
          type="text"
          placeholder="Firstname"
          required
          size="lg"
          class="input"
        />
          <b-form-input
          id="lastName"
          v-model="newUser.job"
          type="text"
          placeholder="Lastname"
          required
          size="lg"
          class="input"
        />
      </b-form-group>
    </b-modal>
    <table-row
      v-for="(user, index) in users"
      :key="user.id"
      v-bind="user"
      :index='index + 1'
    />
    <b-button v-if="canShowMore" @click="handlePagination">Show more</b-button>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { mapState } from 'vuex'
import TableRow from '~/components/Table/TableRow.vue';
export default {
  name: 'Table',
  components: {
    TableRow,
  },
  props: {
    users: {
      required: true,
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  data() {
    return {
      newUser: {
        name: '',
        job: ''
      }
    }
  },
  computed: {
    ...mapState({ pagination: 'pagination' }),
    canShowMore() {
     return this.pagination.page < this.pagination.totalPages
    }
  },
  methods: {
    handlePagination() {
      this.$store.dispatch('handlePagination')
    },
    createUser() {
      this.$store.dispatch('createUser', this.$data.newUser)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/main.scss';

.input {
  margin-bottom: 1rem;
}

::v-deep {
  .btn {
    background-color: $PRIMARY;
    &.btn-secondary {
      background-color: $SECONDARY;
    }
  }
}

</style>
