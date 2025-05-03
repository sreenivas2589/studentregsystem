document.addEventListener("DOMContentLoaded", () => {

    //converting text into javascript object using JSON.parse if "Students" key is present in localStorage else assign an empty Array
    let students = JSON.parse(localStorage.getItem("students")) || []
    let studIndex = -1

    //get form object using getElementById
    const studentForm = document.getElementById("form")
    const submitButton = studentForm.querySelector('button[type="submit"]')

    // Check existing student data in localStorage during edit Mode
    const editStudentRecord = JSON.parse(localStorage.getItem("editStudent"))

    // If existing student data is present, it means that the edit button is clicked, then the form will be populated with the existing student data and updated accordingly.
    if (editStudentRecord) {
        populateForm(editStudentRecord)
        studIndex = editStudentRecord.index
    }

    //function to populate form fields with existing student data and the button value will be changed to "Update" instead of "Register" because the edit mode is activated
    function populateForm(student) {
        document.getElementById("student-name").value = student.name
        document.getElementById("student-id").value = student.id
        document.getElementById("class-id").value = student.class
        document.getElementById("email-id").value = student.email
        document.getElementById("contact-no").value = student.contact

        submitButton.innerHTML = "Update"
    }



    function addStudentRecord(student) {
        if (studIndex >= 0) {
            students[studIndex] = student
            studIndex = -1
        } else {
            students.push(student)
        }
        saveStudentsRecord()
        studentForm.reset()
        submitButton.innerHTML = "Register"
        localStorage.removeItem("editStudent")
        window.location.href = `index.html`
    }

    //function to save student data list to localStorage and we are using JSON.stringify to convert javascript object into string,because localStorage only accepts string
    function saveStudentsRecord() {
        localStorage.setItem("students", JSON.stringify(students))
    }

    // this function is executed when the form is submitted 
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault()
        //trim function is used to remove the leading and trailing spaces from the string(empty spaces before and after string if there are any)
        const studentName = document.getElementById("student-name").value.trim()
        const studentId = document.getElementById("student-id").value.trim()
        const emailId = document.getElementById("email-id").value.trim()
        const classId = document.getElementById("class-id").value.trim()
        const contactNo = document.getElementById("contact-no").value.trim()

        // checks if all the values are entered
        if (studentName && studentId && emailId && classId && contactNo ) {
            // if all the values are present,create new student record
            const student = {
                name: studentName,
                id: studentId,
                email: emailId,
                contact: contactNo,
                class:classId
            }
            //call the addStudentRecord function to add the above values
            addStudentRecord(student)
        } else {
            // if not all values are present display a alert message(this may be not be needed because i already have the required attribute for all input fields)
            alert("All fields are required.")
        }
    })

        
    const recordsContainer = document.getElementById("table")

    // function to save student data list to localStorage
    function saveStudentsRecord() {
        localStorage.setItem("students", JSON.stringify(students))
    }

    // function to update students data list
    const StudentsUpdation = () => {
        recordsContainer.innerHTML = ""
        document.getElementById("table").innerHTML = `<tr>
                    <th>Serial No</th>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Email ID</th>
                    <th>Student Class</th>
                    <th>Contact No</th>
                    <th>Edit/Delete</th>
                </tr>`
        students.forEach((student, index) => {
            const studentRow = document.createElement("tr")
            studentRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.class}</td>
                <td>${student.contact}</td>
                
                <td id="editbtn">
                    <button type="button" onclick="editStudentRecord(${index})">Edit</button>
                    <button type="button" onclick="deleteStudentRecord(${index})">Delete</button>
                </td>
            `
            recordsContainer.append(studentRow)
            if (editStudentRecord) {
                document.querySelectorAll("#editbtn")[index].innerHTML = ""
            }

        })

       
    }

    // function to edit student data
    window.editStudentRecord = (index) => {
        const student = students[index]
        // populate the form with the student data and also the current index which is being edited by the user
        localStorage.setItem("editStudent", JSON.stringify({ ...student, index }))
        window.location.href = "index.html"
        
        
        
    }

    // function to delete student data
    window.deleteStudentRecord = (index) => {
        students.splice(index, 1)
        saveStudentsRecord()
        StudentsUpdation()
    }

    // update newly students data in UI
    StudentsUpdation()

})
