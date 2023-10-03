body = document.querySelector('body');
mainContent = document.querySelector('main');

textToSelect = [];
texts = document.querySelectorAll(".blog-text p") // all paragraphs in blog text.
Ullists = document.querySelectorAll(".blog-text ul") // all ul in blog text.
Ollists = document.querySelector(".blog-text ol") // all ol in blog text.

popup = document.querySelector(".text-is-selected")
copyBtn = document.querySelector("#copy-btn")
shareBtn = document.querySelector("#share-btn")
twitterShare = document.querySelector("#twitter-share");
instagramShare = document.querySelector("#instagram-share");

makeCommentInput = document.querySelector("#make-comment")
makeCommentContainer = document.querySelector(".post-comment-container")

focusOnForm = document.querySelector(".focus-on-form")
closeForm = document.querySelector(".close-btn")
popupForm = document.querySelector(".signup-or-login-form")
linkToSignup = document.querySelector(".link-to-signup")
linkToSignin = document.querySelector(".link-to-signin")
signupBtn = document.querySelector("#signup-btn")
loginbtn = document.querySelector("#login-btn")
confirmPasswordInput = document.querySelector('#password_confirmation')

linkToSignup.addEventListener('click', () => {
    signupBtn.style.display='inline-block'
    loginbtn.style.display='none'
    linkToSignin.style.display='inline-block'
    linkToSignup.style.display='none'
    confirmPasswordInput.style.display='inline-block'

})

linkToSignin.addEventListener('click', () => {
    signupBtn.style.display='none'
    loginbtn.style.display='inline-block'
    linkToSignin.style.display='none'
    linkToSignup.style.display='inline-block'
    confirmPasswordInput.style.display='none'

})

//adding ul text into texts array
//so that the popup will be show when selected
const addToArray = (array) => {
    if (array != null) {
        array.forEach(item => {
            textToSelect.push(item)
        })
    }
}
addToArray(Ullists);
addToArray(Ollists);
addToArray(Ullists)

// JavaScript code to show the popup above and in the middle of the selected text
function showPopup() {
    const selectedText = window.getSelection();
    if (selectedText.toString().length > 0) {
        const range = selectedText.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const popup = document.getElementById('popup');

        // Calculate the position for the popup
        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        const xPos = rect.left + rect.width / 2 - popupWidth / 2;
        const yPos = rect.top - popupHeight;

        // Set the position of the popup
        popup.style.left = xPos + 'px';
        popup.style.top = yPos + 'px';

        // Show the popup
        popup.style.display = 'flex';

        //functionality for the copy btn
        copyBtn.addEventListener('click', () => {
            document.execCommand("copy");
        })
        //functionality for the share btn
        shareBtn.addEventListener('click', () => {
            instagramShare.style.display = "block"
            twitterShare.style.display = "block"
            instagramShare.classList.add('show')
            twitterShare.classList.add('show')
        })
        twitterShare.addEventListener('click', () => {
            twitterShare.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedText)}`;
        })
    } else {
        popup.style.display = "none"
        instagramShare.style.display = "none"
        twitterShare.style.display = "none"
    }
}

// Update the popup position when the page is scrolled
window.addEventListener('scroll', showPopup);

// Update the popup position when the selection changes
document.addEventListener('selectionchange', showPopup);

// adding all p tag into text array
texts.forEach(text => {
    textToSelect.push(text);
})
textToSelect.forEach((text) => {
    text.addEventListener('mouseup', (e) => {
        showPopup();
    })
})

//to reset all other eventlistener
mainContent.addEventListener('click', () => {
    //makeCommentContainer.classList.remove('visibility')
    //popupForm.style.display = 'none'

})

//when we focus on our textarea 
//we want to show some visual feedback
makeCommentInput.addEventListener('click', () => {
    makeCommentContainer.classList.add('visibility')
})

//Popup form 
document.addEventListener('DOMContentLoaded', () => {
    popupForm.style.display = 'block'
    focusOnForm.classList.add('show')
})

//close popup form when click on the closebutton
closeForm.addEventListener('click', (e) => {
    e.preventDefault()
    popupForm.style.display = 'none'
    focusOnForm.classList.remove('show')

})

// close popup form when we clicked anywhere on the screen
// but outside the the popupform
focusOnForm.addEventListener('click', () => {
    popupForm.style.display = 'none'
    focusOnForm.classList.remove('show')
})

// handling likes and dislikes with AJAX
let likeBtn = document.querySelector('#like-btn')
let dislikesBtn = document.querySelector('#dislikes-btn')
let likes = document.querySelector('.likes')
let dislikes = document.querySelector('.dislikes')

const likesAndDislikes = (action, blogId) => {
    const httpRequest = new XMLHttpRequest()

    // the response
    httpRequest.onreadystatechange = () => {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            data = JSON.parse(httpRequest.responseText);
            likes.textContent = data.likes
            dislikes.textContent = data.dislikes
        }
    }
    // make a get reqest to a django route
    httpRequest.open('GET', `http://127.0.0.1:8000/${blogId}/${action}`, true)
    httpRequest.send()



}

// call likes and dislikes function anytime like button is click
// or dislike button is click
likeBtn.addEventListener('click', (e) => { //Get action and blog id;
    let action, blogId;

    action = e.target.dataset.action
    blogId = e.target.dataset.blogId
    likesAndDislikes(action, blogId)
})

dislikesBtn.addEventListener('click', (e) => { //Get action action and blog id;
    let action, blogId;

    action = e.target.dataset.action;
    blogId = e.target.dataset.blogId;
    likesAndDislikes(action, blogId)
})