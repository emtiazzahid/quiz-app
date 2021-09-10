<template>
  <v-container id="add-quiz" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Add Quiz
            </div>

            <div class="subtitle-1 font-weight-light">
              Add new quiz
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field class="purple-input" label="Title"/>
                </v-col>

                <v-col cols="12">
                  <v-textarea class="purple-input" label="Description"/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="Time limit (Sec.)"/>
                </v-col>
                <v-col cols="12" md="12">
                  <h3>Questions</h3>
                  <p>Minimum two options is required for each question</p>
                </v-col>

                <v-col cols="12" md="12">
                  <v-textarea class="purple-input" label="Question 1"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input" label="Option 1"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input" label="Option 2"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input" label="Option 3"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input" label="Option 4"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field class="purple-input" label="Current Answer Number (Example: 2)"/>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0">
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {

  }
</script>
