<template>

  <q-page class="flex flex-center" padding>
    <div class="full-width" style="max-width: 400px">
      <h5 class="q-my-sm text-center text-primary">Formulario</h5>
      <q-card>
        <q-card-section>
          <q-input v-model="Nombre" class="q-mb-sm"
            color="positive" lazy-rules :rules="[required, short]" label="Nom y Cognoms"
          >
            <template #prepend>
              <q-icon name="perm_identity" />
            </template>
          </q-input>
          <q-input v-model="DNI" class="q-mb-sm"
            color="positive" lazy-rules :rules="[required, isDNI, short]" label="DNI"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
          <q-input v-model="Usuario" class="q-mb-sm"
            color="positive" lazy-rules :rules="[required, short]" label="Username"
          >
            <template #prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
          <q-input v-model="Contraseña" class="q-mb-sm"
            color="positive" :type="passwordFieldType" lazy-rules :rules="[required, short]" label="Password"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="visibilityIcon"
                class="cursor-pointer"
                @click="switchVisibility"
              />
            </template>
          </q-input>
          <q-input v-model="reContraseña" square filled label="Repeat Password" class="q-mb-sm" placeholder="Repeat Password"
            color="positive" :type="passwordFieldType" lazy-rules :rules="[required, diffPassword, short]" >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="visibilityIcon"
                class="cursor-pointer"
                @click="switchVisibility"
              />
            </template>
          </q-input>
          <q-btn
            class="full-width"
            color="primary"
            label="Aceptar"
            @click="register"
          ></q-btn>
          <div class="q-my-sm text-center">
            Vols iniciar sessio?
            <a href="http://localhost:8080/#/login" class="text-primary"
              >Login</a
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useQuasar, QSpinnerGears } from 'quasar'
export default {
  name: 'Register',
  setup () {
    const $q = useQuasar()
    return {
      register () {
        $q.notify({
          spinner: QSpinnerGears,
          message: 'Registrando...',
          color: 'positive',
          timeout: 2000,
          progress: true
        })
      },
      required (val) {
        return (val && val.length > 0) || 'No pot estar buit'
      },
      diffPassword (val) {
        return (
          (val && val === this.Contraseña) || 'Contrasenyes distintes'
        )
      },
      short (val) {
        return (val && val.length > 5) || 'El valor es massa curt'
      },
      isDNI (val) {
        const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
        const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
        return (
          nifRegex.test(val) ||
          nieRegex.test(val) ||
          'Error DNI/NIE'
        )
      },
      isEmail (val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
        return emailPattern.test(val) || 'Error Email'
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
      Nombre: '',
      DNI: '',
      Usuario: '',
      Contraseña: '',
      reContraseña: '',
      passwordFieldType: 'password',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },
  methods: {}
}
</script>
