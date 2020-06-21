<template>
    <b-container>
        <b-row align-h="center">
            <b-col sm="7" align-h="center">
                <b-form @submit="post" @reset="reset" v-if="!submitted">
                        <b-form-group
                            label-cols-lg="12"
                            label="Applicant Resume"
                            label-size="lg"
                            label-class="font-weight-bold pt-0"
                            label-align="center"
                            class="mb-0">
                        </b-form-group>

                    <b-form-group 
                        label="Applicant Names"
                        label-cols-sm="4"
                        label-align="left"
                        label-for="applicant-names"
                        description="Please enter First and Last names">
                        
                        <b-form-input id="applicant-names"
                            v-model.lazy="resume.names" 
                            placeholder="Enter Full Name" 
                            required
                            :state="namesState">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Applicant Description"
                        label-cols-sm="4"
                        label-align="left"
                        label-for="applicant-description"
                        description="Skills, experiance and expectations">

                        <b-form-textarea 
                            id="applicant-description"
                            v-model.lazy.trim="resume.description"
                            no-resize
                            rows = "4"
                            max-rows="8"
                            :state="resume.description.length > 80"
                            placeholder="Please enter Applicant Description here"
                            required>
                        </b-form-textarea>
                    </b-form-group>

                    <b-form-group
                        label="Postions of interest"
                        label-align="left"
                        description="Please Select Desired positions"
                        label-for="position-radio">

                        <b-form-radio-group
                            id="position-radio"
                            v-model="resume.positions"
                            :options="availablePositions"
                            class="mb-3"
                            value-field="value"
                            text-field="text"
                            disabled-field="disabled"
                            :state="radioState"
                            stacked
                            required>
                        </b-form-radio-group>
                    </b-form-group>

                    <b-form-select
                        v-model="resume.experiance"
                        :options="experianceLevels"
                        class="mb-3"
                        value-field="value"
                        text-field="text"
                        disabled-field="disabled"
                        :state="experianceState"
                        required>

                        <template v-slot:first>
                            <b-form-select-option value="" disabled>-- Please select experiance level --</b-form-select-option>
                        </template>
                    </b-form-select>

                    <b-form-group>
                        <b-form-file
                            v-model="cv"
                            :state="cvState"
                            placeholder="CV file"
                            drop-placeholder="Drop Files here"
                            accept=".pdf, .docx, .doc"
                            required>
                        </b-form-file>
                    </b-form-group>

                    <b-button type="submit" variant="primary"> Add Resume </b-button>
                    <b-button type="reset" variant="danger"> Reset Data </b-button>
                </b-form>
                
                <b-card align="center" title="Posted!" v-if="submitted">
                    <b-card-body>
                        <b-card-text> Thank you for your Application!</b-card-text>
                        <b-button v-on:click="reset">Add a new resume</b-button>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import firebase from 'firebase'

export default {
    data (){
        return {
            resume: {
                names: "",
                description: "",
                positions: "",
                experiance: "",
                cv: null
            },
            cv: null,
            submitted: false,
            experianceLevels: {},
            availablePositions: {}
        }
    },

    methods: {
        post: function(event){
            event.preventDefault();
            if(this.resume.names.length < 5){
                this.$alert("Name must be at least 6 charecters long!");
            }else {
                this.submit(event);
            }
        },

        submit: function(event){
            event.preventDefault();

            var self = this;
            var storageRef = firebase.storage().ref();

            var task = storageRef.child(this.cv.name).put(this.cv)
            .then(function(data){
                return data.ref.getDownloadURL();
            }).then(function(url){
                    self.resume.cv = url;
                    self.$http.post("https://sample-8c9b1.firebaseio.com/resumes.json", self.resume).then(function(data){
                    console.log(data);
                    self.submitted = true;
                    });
            });
            
        },

        reset:function(event){
            event.preventDefault();

            this.submitted = false;
            this.resume.names = "";
            this.resume.description = "";
            this.resume.positions = "";
            this.resume.experiance = "";
            this.resume.cv = null;
            this.cv = null
        },
    },

    computed: {
        namesState: function(){
            return this.resume.names.length > 5;
        },
        radioState: function(){
            return this.resume.positions.length > 0;
        },
        experianceState: function(){
            return this.resume.experiance != "";
        },
        cvState: function(){
            return this.cv != null;
        }
    },

    created() {
        var self = this;
        firebase.database().ref("positions").once("value", function(data){
            // if there is more than 1 item in the response, there would need to be a loop for record of each object getting its contents
            // in that case it would be easier to just use an array locally as that way we would avoide conflicts
            // Object.assing(json1, json2) is not an optiion -> json 2 { item1 : {}} would override json 1 {item1 :{}}
            for(let key in data.val()){
                self.availablePositions = data.val()[key];
            }
        });

        firebase.database().ref("experianceLevels").once("value", function(data){
            for(let key in data.val()){
                self.experianceLevels = data.val()[key];
            }
        });
    }
}
</script>

<style scoped>

</style>