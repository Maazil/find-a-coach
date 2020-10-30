<template>
  <section>
    <base-card>
      <h2>Register as a coach now</h2>
      <coach-from @save-data="saveData"></coach-from>
    </base-card>
  </section>
</template>

<script>
import CoachFrom from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachFrom
  },
  methods:{
      saveData(data){
          this.$store.dispatch('coaches/registerCoach', data);
          this.$router.replace('/coaches');
      }
  },

};
</script>
