<template>
    <div class="alert alert-danger">{{ msg }}</div>
</template>

<script>
export default {
    props:['msg']
}
</script>

<style>
.alert{
    border-radius: 0px
}
.alert-danger{
    background: red;
    color : white
}
</style>
