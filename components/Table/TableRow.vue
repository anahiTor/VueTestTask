<template>
  <div>
    <div class="user">
      <div class="column">{{ index }}</div>
      <nuxt-link :to="`users/${id}`" class="column">
        <b-avatar variant="info" :src="avatar"/>
      </nuxt-link>
      <nuxt-link :to="`users/${id}`" class="column">{{ fullName }}</nuxt-link>
      <span class="column">{{ email }}</span>
      <div class="actions column">
        <b-button
          @click="$bvModal.show(`editUser${id}`)"
          type="button">
            Edit
        </b-button>
        <b-button  @click="$bvModal.show(`deleteUser${id}`)" type="button">Delete</b-button>
      </div>
    </div>
    <b-modal :id="`editUser${id}`" title="Edit user" ok-only @ok="submitChanges">
      <b-form-group>
        <b-form-input
          id="firstName"
          v-model="user.name"
          type="text"
          placeholder="Firstname"
          required
          size="lg"
          class="input"
        />
          <b-form-input
          id="lastName"
          v-model="user.job"
          type="text"
          placeholder="Lastname"
          required
          size="lg"
          class="input"
        />
      </b-form-group>
    </b-modal>
    <b-modal :id="`deleteUser${id}`" title="Delete user?" @ok="deleteUser">
      You can't undo this action
    </b-modal>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    index: {
      required: true,
      type: Number,
      default: 0,
    },
    id: {
      required: true,
      type: [Number, String],
      default: 0,
    },
    first_name: {
      type: String,
      default: '',
    },
    last_name: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      user: {
        name: this.first_name,
        job: 'zion resident',
      }
    }
  },
  computed: {
    fullName() {
      return `${this.last_name} ${this.first_name}`
    }
  },
  methods: {
    async submitChanges() {
      await this.$store.dispatch('updateUser', {...this.$data.user, id: this.$props.id})
      this.makeToast('User successfully updated')
    },
    async deleteUser() {
      await this.$store.dispatch('deleteUser', this.$props.id)
      this.makeToast('User successfully deleted')

    },
    makeToast(title: string) {
      this.$bvToast.toast('Changes saved', {
        title,
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/main.scss';

.user {
  display: grid;
  grid-template-columns:.5fr 1fr 2fr 2fr 3fr;
  margin: 2rem 0;
  padding: 1rem;
  box-shadow: 2px 5px 23px 4px $BORDERLINE;
  @include mobile {
    display: flex;
    flex-direction: column;
  }
  .column {
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      justify-content: flex-start;
      @include mobile {
       justify-content: center;
      }
    }
    &:last-child {
      justify-content: flex-end;
      @include mobile {
       justify-content: center;
      }
    }
  }
  .actions {
    .btn {
      margin-right: .5rem;
    }
  }
}
.input {
  margin-bottom: 1rem;
}

</style>
