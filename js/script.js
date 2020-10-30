const studentsHeader = document.querySelector('.header')
const studentSearchLabel = document.createElement('studentSearchLabel')
studentSearchLabel.className = 'student-search'
const studentSearchInput = document.createElement('input')
studentSearchInput.type = 'text'
studentSearchInput.placeholder = 'Search by name...'
const studentSearchButton = document.createElement('button')
const imageSearch = document.createElement('img')
imageSearch.src = 'img/icn-search.svg'
imageSearch.alt = 'Search icon'
studentSearchButton.appendChild(imageSearch)
studentSearchLabel.appendChild(studentSearchInput)
studentSearchLabel.appendChild(studentSearchButton)
studentsHeader.appendChild(studentSearchLabel)
studentSearchInput.addEventListener('input', (e) => {
    showPage(0, e.target.value)
})
const paginatedButtonsList = document.querySelector('.link-list')
const studentList = document.querySelector('.student-list')

// runs only one time in the beginning
function showFirstPage() {
    showPage(0)
    let numberOfPages = Math.ceil(data.length / 9)
    addPagination(numberOfPages, 1)
}

// removes all the child nodes
function removeChildrenNodes(parentName) {
    while (parentName.firstChild) {
        parentName.removeChild(parentName.lastChild);
    }
}

// creats individual student details card
function createStudentTiles(studentsArray, i) {
    const studentListItem = document.createElement('li')
    studentListItem.className = 'student-item cf'
    const studentDetails = document.createElement('div')
    studentDetails.className = 'student-details'
    const studentAvatar = document.createElement('img')
    studentAvatar.className = 'avatar'
    studentAvatar.src = studentsArray[i].picture.large
    studentAvatar.alt = 'Profile Picture'
    const studentName = document.createElement('h3')
    studentName.textContent = `${
        studentsArray[i].name.title
    } ${
        studentsArray[i].name.first
    } ${
        studentsArray[i].name.last
    }`
    const studentEmail = document.createElement('span')
    studentEmail.className = 'email'
    studentEmail.textContent = studentsArray[i].email
    const studentJoinedDetails = document.createElement('div')
    studentJoinedDetails.className = 'joined-details'
    const joinedDate = document.createElement('span')
    joinedDate.className = 'date'
    joinedDate.textContent = `Joined ${
        studentsArray[i].registered.date
    }`
    studentDetails.appendChild(studentAvatar)
    studentDetails.appendChild(studentName)
    studentDetails.appendChild(studentEmail)
    studentJoinedDetails.appendChild(joinedDate)
    studentListItem.appendChild(studentDetails)
    studentListItem.appendChild(studentJoinedDetails)
    studentList.appendChild(studentListItem)
    return studentList
}

// show students page based on different conditions
function showPage(pageNumber, searchStudent) {
    removeChildrenNodes(studentList)
    if (searchStudent) {
        let searchArray = data.filter(students => students.name.first.toLowerCase().includes(searchStudent) || students.name.last.toLowerCase().includes(searchStudent))
        if (searchArray.length > 0) {
            for (let i = pageNumber * 9; i < (pageNumber + 1) * 9; i++) {
                let numberOfPages = Math.ceil(searchArray.length / 9)
                addPagination(numberOfPages, 1, searchStudent)
                if (searchArray[i]) {
                    createStudentTiles(searchArray, i)
                }
            }
        } else {
            removeChildrenNodes(paginatedButtonsList)
            studentList.textContent = 'Sorry no result found!'
        }
    } else {
        let numberOfPages = Math.ceil(data.length / 9)
        addPagination(numberOfPages, 1)
        for (let i = pageNumber * 9; i < (pageNumber + 1) * 9; i++) {
            if (data[i]) {
                createStudentTiles(data, i)
            }
        }
    }
}

// render next page
function showNextPage(pageNumber, currentButton, numberOfPages, searchStudent) {
    showPage(pageNumber, searchStudent)
    removeChildrenNodes(paginatedButtonsList)
    addPagination(numberOfPages, currentButton, searchStudent)
}

// adding pagination
function addPagination(numberOfPages, currentPage, searchStudent) {
    removeChildrenNodes(paginatedButtonsList)
    for (let i = 0; i < numberOfPages; i++) {
        const listButton = document.createElement('li')
        const paginationButton = document.createElement('button')
        paginationButton.type = 'button'
        paginationButton.textContent = i + 1
        if (currentPage == i + 1) {
            paginationButton.className = 'active'
        }
        listButton.appendChild(paginationButton)
        paginationButton.addEventListener('click', (event) => {
            showNextPage(i, event.target.textContent, numberOfPages, searchStudent)
        })
        paginatedButtonsList.appendChild(listButton)
    }
    return paginatedButtonsList
}

showFirstPage()
