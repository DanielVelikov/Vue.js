export default{
    computed: {
        filteredResumes: function(){
            if(this.search == ""){
                return this.pageResumes.filter((item) => {
                    return item.names.toLowerCase().match(this.search.toLowerCase());
                });
            }

            return this.resumes.filter((item) =>{
                return item.names.toLowerCase().match(this.search.toLowerCase());
            });
        }
    }
};