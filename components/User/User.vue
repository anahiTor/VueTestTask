<template>
  <div class="user-card">
    <div>
      <b-avatar :src="avatar" size="15rem"/>
    </div>
    <div>
      <h4>Name: {{ first_name }}</h4>
      <h4>Lastname: {{ last_name }}</h4>
      <h4>Email: {{ email }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
   props: {
    first_name: {
      required: true,
      type: String,
      default: '',
    },
    last_name: {
      required: true,
      type: String,
      default: '',
    },
    avatar: {
      required: true,
      type: String,
      default: '',
    },
    email: {
      required: true,
      type: String,
      default: '',
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/main.scss';

.user-card {
  display: flex;
  max-width: 90%;
  margin: 3rem 0;
  padding: 1rem;
  box-shadow: 2px 5px 23px 4px $BORDERLINE;
  & > div {
    padding: 1rem;
  }
  @include mobile {
    flex-direction: column;
    max-width: 100%;
  }
}

h4 {
  color: $SECONDARY;
  margin-bottom: 1rem;
  @include mobile {
    font-size: 1rem
  }
}
</style>