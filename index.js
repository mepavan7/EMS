document.addEventListener('DOMContentLoaded', function () {
    const employeeTable = document.getElementById('employeeTable');
    const employeeData = document.getElementById('employeeData');
    const departmentFilter = document.getElementById('departmentFilter');
    const genderFilter = document.getElementById('genderFilter');
    const salarySort = document.getElementById('salarySort');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentPage = 1;
    const limit = 10;
  
    function fetchData() {
      const filterByDepartment = departmentFilter.value;
      const filterByGender = genderFilter.value;
      const sort = salarySort.value;
      const order = sort === 'asc' ? 'asc' : 'desc';
  
      const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${currentPage}&limit=${limit}&filterBy=${filterByDepartment ? 'department' : 'gender'}&filterValue=${filterByDepartment ? filterByDepartment : filterByGender}&sort=salary&order=${order}`;
  
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          renderData(data.data); 
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function renderData(data) {
      employeeData.innerHTML = '';
      data.forEach(employee => {
        const row = `<tr>
                      <td>${employee.id}</td>
                      <td>${employee.name}</td>
                      <td>${employee.gender}</td>
                      <td>${employee.department}</td>
                      <td>${employee.salary}</td>
                    </tr>`;
        employeeData.innerHTML += row;
      });
    }
  
    function updatePaginationButtons(totalPages) {
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    }
  
    prevBtn.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        fetchData();
      }
    });
  
    nextBtn.addEventListener('click', function () {
      currentPage++;
      fetchData();
    });
  
    departmentFilter.addEventListener('change', function () {
      currentPage = 1;
      fetchData();
    });
  
    genderFilter.addEventListener('change', function () {
      currentPage = 1;
      fetchData();
    });
  
    salarySort.addEventListener('change', function () {
      fetchData();
    });
  
    fetchData();
  });