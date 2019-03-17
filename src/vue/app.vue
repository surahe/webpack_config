<template>
  <div>
    <span ref="text">{{ '2018-09-14 01:05' | formaDate('MM/dd') }}</span>
    <button @click="add">
      haha
    </button>
    <button @click="goA('a')">
      goA
    </button>
    <button @click="goA('b')">
      goB
    </button>
    <RouterView />
    <span>{{ userProfile.age }}</span>
    <TestB />
  </div>
</template>

<script>
import TestB from './b'

export default {
  components: {
    TestB
  },
  data () {
    return {
      msg: 'Hello world!',
      obj: {
        a: '  ss   s  '
      },
      userProfile: {
        suq: false
      }
    }
  },
  watch: {
    obj: {
      handler: function(newVal, oldVal) {
        console.log(newVal)
      }
      // deep: true,
      // immediate: true
    }
  },
  beforeCreate() {
    console.log('APP beforeCreat')
  },
  created() {
    console.log('APP created')
  },
  beforeMount() {
    console.log('APP beforeMount')
  },
  mounted() {
    this.userProfile = Object.assign({}, this.userProfile, {
      age: 27,
      favoriteColor: 'Vue Green'
    })
    console.log('APP mounted')
  },
  beforeDestroy() {
    console.log('APP beforeDestroy')
  },
  destroyed() {
    console.log('APP destroyed')
  },
  methods: {
    add () {
      this.obj.a++
    },
    goA (params) {
      this.$router.push({ name: params })
    }
  }
}
</script>

<style lang="scss">
.red {
  color: red;
  .bold {
    font-weight: bold;
  }
}
</style>
