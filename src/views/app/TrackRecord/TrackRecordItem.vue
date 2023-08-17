<template>
  <div>
    <b-card no-body class="track_record  mb-0">
      <b-card-header class="track_record-header" header-tag="header" role="tab">
        <b-avatar :text="avatarPlaceholder({user_firstname: 'ivan', user_lastname: 'franck'})" />
        <div class="track_record-details">
          <p class="text">
            Admin in this product updated <b-badge variant="light" class="text-dark">
              Name
            </b-badge>  from <b-badge variant="light" class="text-dark">
              Apple IPhone X
            </b-badge> to <b-badge variant="light" class="text-dark">
              Apple Iphone XR
            </b-badge>
          </p>
          <p class="time">
            11:34
          </p>
        </div>
      </b-card-header>

    </b-card>
  </div>
</template>

<script>
import { BCardHeader, BBadge } from 'bootstrap-vue'

export default {
  components: {
    BCardHeader,
    BBadge,
  },
  methods: {
    avatarPlaceholder(user) {
      return user?.user_firstname.charAt(0)
     + user?.user_lastname.charAt(0)
    },
  },

}

</script>

<style scoped>
.track_record{
  border-radius: 0;
  box-shadow: none;
}
.track_record .track_record-header{
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
}

p{
  margin: 0;
  padding: 0;
}

</style>
