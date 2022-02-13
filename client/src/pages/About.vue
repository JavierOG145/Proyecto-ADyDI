<template>
  <q-page class="flex flex-center" padding>
    <div class="full-width" style="max-width: 300px">
      <h4 class="q-my-sm text-center text-primary">About</h4>
      <q-card>
        <q-card-section>
          <div class="q-my-sm text-center">
            <div class="text-positive">Creador:</div>
            Javier
            <div class="text-positive">Email:</div>
            javierog145@gmail.com
            <div>
              <q-avatar size="250px" class="q-mt-md">
                <img :src="quasar" />
              </q-avatar>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      quasar: '/icons/dwight.JPG'
    }
  }
}
</script>
