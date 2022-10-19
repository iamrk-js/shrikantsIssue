var cl = console.log;

// JSON  >> javascript object notation

// the only diffrence between js Object and JSON
// keys are strinfied
// there should not be "," after last key:value pair

let person = {
        fname : 'Jhon',
        lname : 'Doe',
        fullName: function(){
                return `${this.fname} ${this.lname}`
        }
}

cl(person);
// localStorage.setItem('personInfo', person)

// js object to JSON >> JSON.stringify(object to convert into JSON)

let jPerson = JSON.stringify(person);
cl(jPerson)
localStorage.setItem("personInfo", jPerson)
// JSON to javascript Object >> JSON.parse(JSON object to be converted into js object)

let p = JSON.parse(jPerson);

cl(p)

