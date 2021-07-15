const tagsElem = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus() // puts the cursor in the text area when page loads.

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if (e.key === 'Enter') {
        // clear text area
        setTimeout(() => {
            e.target.value = ''
        }, 10)
        // call function to chose choice.
        randomSelect()
    }
})

function createTags(input) {
    // analyses text on each key press.
    //will not create a choice if empty tag between commas.
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

    //clears choices.
    tagsElem.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsElem.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100);

    setTimeout(() => {
        clearInterval(interval)
        // picks a last random tag. Highlights it.
        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)
}

function pickRandomTag() {
    // returns a random tag object
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}