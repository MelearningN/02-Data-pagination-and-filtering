
const showPage=(number, pageNumber)=>{
   const ul = document.querySelector('.student-list')
   while (ul.firstChild) {
      ul.removeChild(ul.lastChild);
    }
   /* ul.removeChild(lastChild) */
for (let i = number*9; i < (number+1)*9; i++) {
   if(data[i]){
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

const totalButtons=Math.ceil(data.length/9)
console.log('toal', totalButtons)
const ulPagination = document.querySelector('.link-list')
const nextSteps=(e, paginationButton)=>{
for(let j=0; j<totalButtons; j++){
   console.log(ulPagination.children[j].childNodes.className='')
   //ulPagination.children[j].className=''
   ulPagination.children[j].childNodes.className=''
if(e.target.textContent==j+1){
   paginationButton.className='active'
}

}
}

const addPagination=(totalButtons)=>{

for(let i=0; i<totalButtons; i++){
   const listButton= document.createElement('li')
   const paginationButton=document.createElement('button')
   paginationButton.type = 'button'
   paginationButton.textContent=i+1
   //pageNumber=i+1
   listButton.appendChild(paginationButton)
   paginationButton.addEventListener('click', (e)=>{
      showPage(i)
   })
  
   ulPagination.appendChild(listButton)
}


return ulPagination
}

addPagination(totalButtons);
