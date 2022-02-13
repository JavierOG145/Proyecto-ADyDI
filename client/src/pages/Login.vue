<template>
  <q-page class="flex flex-center" padding>
    <div class="full-width" style="max-width: 400px">
      <h5 class="q-my-sm text-center text-primary">Login</h5>
      <q-card>
        <q-card-section>
          <q-input v-model="Username" square filled label="Usuari" class="q-mb-sm" color="positive" type="username" lazy-rules :rules="[required, short]">
            <template #prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
          <q-input v-model="Password" square filled label="Contrasenya" class="q-mb-sm" color="positive" :type="passwordFieldType" lazy-rules :rules="[required, short]">
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon :name="visibilityIcon" class="cursor-pointer" @click="switchVisibility" />
            </template>
          </q-input>
          <q-btn color="primary" class="full-width" label="Login" @click="login" />
          <div class="q-my-sm text-center">
            No estàs registrat?
            <a href="http://localhost:8080/#/Formulari" class="text-primary"
              >Registra't</a
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar, QSpinnerGears } from 'quasar'
export default defineComponent({
  name: 'Login',
  setup () {
    const $q = useQuasar()
    return {
      login () {
        $q.notify({
          spinner: QSpinnerGears,
          message: 'Conectant',
          color: 'positive',
          timeout: 2000,
          progress: true
        })
      },
      required (val) {
        return (val && val.length > 0) || 'No pot estar buit'
      },
      short (val) {
        return (val && val.length > 5) || 'El valor es massa curt'
      },
      switchVisibility () {
        this.visibility = !this.visibility
        this.passwordFieldType = this.visibility ? 'text' : 'password'
        this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
      }
    }
  },
  data () {
    return {
      Username: '',
      Password: '',
      passwordFieldType: 'password',
      visibility: false,
      visibilityIcon: 'visibility',
      alert: ref(false)
    }
  }
})
</script>
