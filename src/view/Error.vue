<script>
export default {
    name: 'Error',
    data() {
        return {
            error: this.$route.query.error
        }
    }
}
</script>

<template>
    <div>
        <h1>Error</h1>
        <p>{{ error }}</p>
    </div>
</template>
