(async function(){
    const data = await fetch("./data.json")
    const res = await data.json();
    const employees = res;
    let selectedEmployee = employees[0];
    let selectedEmployeeId = employees[0].id;

    const employeeListRef = document.querySelector('.employees__names--list');
    const employeeSingleRef = document.querySelector('.employees__single--info')
    renderEmployeeList();
   // <-- Render Employee List Start -->
    function renderEmployeeList(){
        employeeListRef.innerHTML=""
        employees.forEach((element) => {
            const employee = document.createElement("span");
            employee.classList.add("employees__names--item")
            if(parseInt(selectedEmployeeId,10) === element.id){
                employee.classList.add("selected");
            }
            employee.dataset.id = element.id;
            employee.innerHTML = `${element.firstName} ${element.lastName} <i class="employeeDelete">❌</i>`;
            employeeListRef.append(employee)
        });
    }
      // <-- Render Employee List End -->
      // <-- Selection of Employee from List Start -->
    employeeListRef.addEventListener('click',(event)=>{
        if(event.target.tagName === "SPAN" & selectedEmployeeId != event.target.dataset.id){
            selectedEmployeeId = event.target.dataset.id;
            selectedEmployee = employees[employees.findIndex(emp => Number(emp.id) === Number(selectedEmployeeId))]
            renderEmployeeList();
            renderSingleEmployee();
        }
         // <-- Selection of Employee from List End -->
        if(event.target.tagName ==="I"){
            deleteEmployee(event);
        }
    })
    // <--Delete Employee Logic Start-->
    const deleteEmployee = (event) =>{
        const selectedEmployeeId = event.target.parentElement.dataset.id;
         const index = employees.findIndex((emp) => Number(emp.id) == Number(selectedEmployeeId));
         console.log(index);
         employees.splice(index,1);
         renderEmployeeList();
    }
     // <--Delete Employee Logic Ends-->

    //<-- Render Single Employee Start -->
    const renderSingleEmployee = () =>{
        employeeSingleRef.innerHTML=`
        <img src="${selectedEmployee.imageUrl}">
        <span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName}(${selectedEmployee.age})</span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
        `;
    }
    //<-- Render Single Employee Ends -->
    //<-- Add Employee Logic Starts -->
    const createRef = document.querySelector('header button');
    const createModelRef = document.querySelector('.addEmployee')
    createRef.addEventListener('click',(event) =>{
        createModelRef.style.display = "flex";
    })
    createModelRef.addEventListener('click',(event)=>{
        if(event.target.className === "addEmployee"){
            createModelRef.style.display="none"
        }
    })

    const addEmployeeFormRef = document.querySelector('.addEmployee_create')
    addEmployeeFormRef.addEventListener('submit',(event) =>{
        event.preventDefault();
        const formData = new FormData(addEmployeeFormRef);
        const values = [...formData.entries()]
        const empData = {};
        values.forEach((val) =>{
            empData[val[0]] = val[1];
        })
        empData.id = ((employees[employees.length - 1].id)+1)
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0,4),10);
        empData.imageUrl = empData.imageUrl|| "https://cdn-icons-png.flaticon.com/512/0/93.png";
        console.log(empData)
        employees.push(empData);
        renderEmployeeList();
        createModelRef.style.display="none";
    })
    //<-- Add Employee Logic Ends -->
})()

