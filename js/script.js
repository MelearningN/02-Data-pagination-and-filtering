const ulPagination = document.querySelector('.link-list')

const firstPage = () => {
    showPage(0)
    let totalButtons = Math.ceil(data.length / 9)
    addPagination(totalButtons, 1)
} firstPage()

function showPage(number, search) {
    const ul = document.querySelector('.student-list')
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    }
    if (search) {
        let searchArray = data.filter(names => names.name.first.toLowerCase().includes(search) || names.name.last.toLowerCase().includes(search))
        for (let j = number * 9; j < (number + 1) * 9; j++) {
            let totalButtons = Math.ceil(searchArray.length / 9)
            addPagination(totalButtons, 1, search)
            if (searchArray[j]) {
                const li = document.createElement('li')
                li.className = 'student-item cf'
                const div = document.createElement('div')
                div.className = 'student-details'
                const img = document.createElement('img')
                img.className = 'avatar'
                img.src = searchArray[j].picture.large
                img.alt = 'Profile Picture'
                const h3 = document.createElement('h3')
                h3.textContent = `${
                    searchArray[j].name.title
                } ${
                    searchArray[j].name.first
                } ${
                    searchArray[j].name.last
                }`
                const span = document.createElement('span')
                span.className = 'email'
                span.textContent = searchArray[j].email
                const joinedDate = document.createElement('div')
                joinedDate.className = 'joined-details'
                const date = document.createElement('span')
                date.className = 'date'
                date.textContent = searchArray[j].registered.date
                div.appendChild(img)
                div.appendChild(h3)
                div.appendChild(span)
                joinedDate.appendChild(date)
                li.appendChild(div)
                li.appendChild(joinedDate)
                ul.appendChild(li)
            }
        }
    } else {
        let totalButtons = Math.ceil(data.length / 9)
        addPagination(totalButtons, 1)
        for (let i = number * 9; i < (number + 1) * 9; i++) {
            if (data[i]) {
                const li = document.createElement('li')
                li.className = 'student-item cf'
                const div = document.createElement('div')
                div.className = 'student-details'
                const img = document.createElement('img')
                img.className = 'avatar'
                img.src = data[i].picture.large
                img.alt = 'Profile Picture'
                const h3 = document.createElement('h3')
                h3.textContent = `${
                    data[i].name.title
                } ${
                    data[i].name.first
                } ${
                    data[i].name.last
                }`
                const span = document.createElement('span')
                span.className = 'email'
                span.textContent = data[i].email
                const joinedDate = document.createElement('div')
                joinedDate.className = 'joined-details'
                const date = document.createElement('span')
                date.className = 'date'
                date.textContent = data[i].registered.date
                div.appendChild(img)
                div.appendChild(h3)
                div.appendChild(span)
                joinedDate.appendChild(date)
                li.appendChild(div)
                li.appendChild(joinedDate)
                ul.appendChild(li)
            }
        }
        return ul
    }
}


const nextSteps = (i, e, totalButtons, search) => {
    showPage(i, search)

    while (ulPagination.firstChild) {
        ulPagination.removeChild(ulPagination.lastChild);
    }
    addPagination(totalButtons, e.target.textContent, search)
}

function addPagination(totalButtons, butt, search) {
    while (ulPagination.firstChild) {
        ulPagination.removeChild(ulPagination.lastChild);
    }
    for (let i = 0; i < totalButtons; i++) {
        const listButton = document.createElement('li')
        const paginationButton = document.createElement('button')
        paginationButton.type = 'button'
        paginationButton.textContent = i + 1
        if (butt == i + 1) {
            paginationButton.className = 'active'
        }
        listButton.appendChild(paginationButton)
        paginationButton.addEventListener('click', (e) => {
            nextSteps(i, e, totalButtons, search)
        })

        ulPagination.appendChild(listButton)
    }
    return ulPagination
}

const headerH2 = document.querySelector('.header')
const label = document.createElement('label')
label.className = 'student-search'
const input = document.createElement('input')
input.type = 'text'
input.placeholder = 'Search by name...'
const headerButton = document.createElement('button')
const imageSearch = document.createElement('img')
imageSearch.src = 'img/icn-search.svg'
imageSearch.alt = 'Search icon'
headerButton.appendChild(imageSearch)
label.appendChild(input)
label.appendChild(headerButton)
headerH2.appendChild(label)
input.addEventListener('input', (e) => {
    showPage(0, e.target.value)
})
