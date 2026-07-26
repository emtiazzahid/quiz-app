<template>
  <v-container
    id="user-profile"
    fluid
    class="pa-6"
  >
    <div class="mb-6">
      <h1 class="qa-display" style="font-size:1.6rem">Edit Profile</h1>
      <p class="qa-muted mb-0">Complete your profile.</p>
    </div>

    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-card rounded="xl" class="pa-6">
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <label class="qa-label">Company (disabled)</label>
                <v-text-field disabled hide-details="auto" />
              </v-col>

              <v-col cols="12" md="4">
                <label class="qa-label">User Name</label>
                <v-text-field hide-details="auto" />
              </v-col>

              <v-col cols="12" md="4">
                <label class="qa-label">Email Address</label>
                <v-text-field hide-details="auto" />
              </v-col>

              <v-col cols="12" md="6">
                <label class="qa-label">First Name</label>
                <v-text-field hide-details="auto" />
              </v-col>

              <v-col cols="12" md="6">
                <label class="qa-label">Last Name</label>
                <v-text-field hide-details="auto" />
              </v-col>

              <v-col cols="12">
                <label class="qa-label">Address</label>
                <v-text-field hide-details="auto" />
              </v-col>

              <v-col cols="12" md="4">
                <label class="qa-label">City</label>
                <v-text-field hide-details="auto" />
              </v-col>

              <v-col cols="12" md="4">
                <label class="qa-label">Country</label>
                <v-text-field hide-details="auto" />
              </v-col>

              <v-col cols="12" md="4">
                <label class="qa-label">Postal Code</label>
                <v-text-field type="number" hide-details="auto" />
              </v-col>

              <v-col cols="12">
                <label class="qa-label">About Me</label>
                <v-textarea
                  value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn class="qa-btn-gradient px-6" rounded="lg">
                  Update Profile
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card rounded="xl" class="pa-6 text-center qa-elevate">
          <v-avatar size="112" class="mb-4 qa-avatar-ring">
            <v-img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg" />
          </v-avatar>

          <div class="qa-chip mb-3"><v-icon size="14" icon="mdi-briefcase-outline"/> CEO / CO-FOUNDER</div>

          <h4 class="qa-display mb-3" style="font-size:1.4rem">
            Alec Thompson
          </h4>

          <p class="qa-muted">
            Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
          </p>

          <v-btn
            variant="outlined"
            color="primary"
            rounded="lg"
            prepend-icon="mdi-account-plus-outline"
          >
            Follow
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    //
  }
</script>

<style scoped>
.qa-avatar-ring {
  border: 3px solid #fff;
  box-shadow: 0 0 0 3px #a855f7, 0 12px 28px -10px rgba(139, 92, 246, .5);
}
</style>
