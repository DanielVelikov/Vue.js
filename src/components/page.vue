<template>
<b-card title="Header Card" no-body>
    <b-card-header header-tag="nav">
        <b-nav card-header tabs>
            <b-nav-item to="/" exact exact-active-class="active">Resumes</b-nav-item>
            <b-nav-item to="/add" exact exact-active-class="active"> Add a Resume </b-nav-item>
        </b-nav>
    </b-card-header>
    <b-card-body>
        <router-view></router-view>
    </b-card-body>
</b-card>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>