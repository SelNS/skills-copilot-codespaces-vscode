function skillsMember(){
    var member = {
        name: "John",
        age: 25,
        skills: ["C++", "Python", "Java"],
        printSkills: function(){
            this.skills.forEach(function(skill){
                console.log(skill);
            });
        }
    };
    member.printSkills();
}