<template>
    <b-container>
        <b-card>
            <b-card-body :title="resume.names">
                <b-card-sub-title>
                    Desired Position : {{ resume.positions }}
                </b-card-sub-title>
                <b-card-text>
                    {{ resume.description }}
                </b-card-text>
                <b-button :href="resume.cv" variant="primary"> Download CV </b-button>
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>

export default {
    data () {
        return {
            id: this.$route.params.id,
            resume: {}
        }
    },

    created(){
        console.log(this.id);
        this.$http.get("https://sample-8c9b1.firebaseio.com/resumes/" + this.id + ".json").then(function(data){
            this.resume = data.body;
        });
    }
}
</script>