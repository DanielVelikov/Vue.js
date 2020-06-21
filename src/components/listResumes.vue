<template>
    <b-container>
        <b-row>
            <b-col sm="8">
            <b-form-group
                label=" All Resumes"
                label-align="left"
                label-cols="12"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0">
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group
                label="Enter Names"
                label-for="search-input"
                label-align="right"
                label-cols-md="6"
                label-size="md">
                        <b-form-input id="search-input"
                        class="form-control mr-sm-2"
                        type="search"
                        v-model="search" 
                        placeholder="Search Resumes" >
                        </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row align-h="center">
            <ul class="list-unstyled">
                <b-media tag="li" v-for="item in filteredResumes">
                    <router-link v-bind:to="'/resume' + item.id">
                        <b-card>
                            <b-card-body :title="item.names">
                                <b-card-text> {{ item.description | snippet }} </b-card-text>
                            </b-card-body>
                        </b-card>
                    </router-link>
                </b-media>
            </ul>
        </b-row>
        <b-row align-h="center">
            <b-pagination
                v-model="currentPage"
                v-on:click="updatePages"
                :total-rows="resumeCount"
                :per-page="perPage">
            </b-pagination>
        </b-row>
    </b-container>
</template>

<script>
import searchMixin from '../mixins/searchMixin'

export default {
    data (){
        return {
            resumes: [],
            pageResumes: [],
            search: "",
            perPage: 4,
            currentPage: 1
        }
    },

    computed:{
        resumeCount: function(){
            if(this.search != ""){
                return this.filteredResumes.length;
            }
            return this.resumes.length;
        },

        updatePages: function(){
            var start = this.perPage * this.currentPage - this.perPage;
            this.pageResumes = this.resumes.slice(start, this.currentPage * this.perPage);
        }
    },

    created(){
        this.$http.get("https://sample-8c9b1.firebaseio.com/resumes.json").then(function(data){
            return data.json();
        }).then(function(data){
            var allResumes = []
            for (let key in data)
            {
                data[key].id = key;
                allResumes.push(data[key]);
            }
            this.resumes = allResumes;
            this.pageResumes = this.resumes.slice(0, this.perPage);
        });
    },

    mixins: [searchMixin]
    
}
</script>