var branches = []; // Array to store branch information

document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission

  // Get form inputs
  var branch = document.getElementById('branch').value;
  var name = document.getElementById('name').value;
  var marks = document.getElementById('marks').value;

  // Create student object
  var student = {
    name: name,
    marks: marks
  };

  // Find the branch object in the branches array
  var branchObj = branches.find(function(branchObj) {
    return branchObj.branch === branch;
  });

  // If the branch already exists, add the student to it
  if (branchObj) {
    branchObj.students.push(student);
  } else {
    // If the branch doesn't exist, create a new branch object
    branchObj = {
      branch: branch,
      students: [student]
    };
    branches.push(branchObj);
  }

  // Clear form inputs
  document.getElementById('branch').value = '';
  document.getElementById('name').value = '';
  document.getElementById('marks').value = '';

  // Display branch list
  displayBranchList();
});

function displayBranchList() {
  var branchList = document.getElementById('branchList');
  branchList.innerHTML = ''; // Clear the previous content of the list

  // Loop through the branches array and create branch containers
  for (var i = 0; i < branches.length; i++) {
    var branch = branches[i];

    // Create branch container
    var branchContainer = document.createElement('div');
    branchContainer.classList.add('branch');

    // Create branch heading with a show/hide button
    var branchHeading = document.createElement('h2');
    branchHeading.innerHTML = branch.branch + ' (' + branch.students.length + ' students) ';
    var showHideButton = document.createElement('button');
    showHideButton.textContent = 'Show/Hide';
    showHideButton.addEventListener('click', toggleStudentList);
    branchHeading.appendChild(showHideButton);
    branchContainer.appendChild(branchHeading);

    // Create student list container
    var studentListContainer = document.createElement('div');
    studentListContainer.style.display = 'none'; // Initially hide the student list
    branchContainer.appendChild(studentListContainer);

    // Create student list
    var studentList = document.createElement('ul');

    // Loop through the students in the branch and create list items
    for (var j = 0; j < branch.students.length; j++) {
      var student = branch.students[j];

      // Create a string with student information
      var studentInfo = student.name + ' : ' + student.marks + ' marks';

      // Create a list item
      var listItem = document.createElement('li');
      listItem.textContent = studentInfo;

      // Append the list item to the student list
      studentList.appendChild(listItem);
    }

    // Append the student list to the student list container
    studentListContainer.appendChild(studentList);

    // Append the branch container to the branch list
    branchList.appendChild(branchContainer);
  }
}

function toggleStudentList(e) {
  var studentListContainer = e.target.parentNode.nextSibling;
  studentListContainer.style.display = (studentListContainer.style.display === 'none') ? 'block' : 'none';
}

// Display initial branch list
displayBranchList();
