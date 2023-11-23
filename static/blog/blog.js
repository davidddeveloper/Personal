const selectElement = (selector) => {
    let element = document.querySelector(selector)
    if (element) return element;
    else return "Element no found! Check if selector is correct"
}

const selectElements = (selector) => {
    let elements = document.querySelectorAll(selector)
    if (elements) return elements;
    else return "Elements no found! Check if selector is correct"
}

body = selectElement('body');
mainContent = selectElement('main');

textToSelect = [];
texts = selectElements(".blog-text p") // all paragraphs in blog text.
Ullists = selectElements(".blog-text ul") // all ul in blog text.
Ollists = selectElements(".blog-text ol") // all ol in blog text.

popup = selectElement(".text-is-selected")
copyBtn = selectElement("#copy-btn")
shareBtn = selectElement("#share-btn")
twitterShare = selectElement("#twitter-share");
instagramShare = selectElement("#instagram-share");

makeCommentInput = selectElement("#make-comment")
makeCommentContainer = selectElement(".post-comment-container")

/* ------------------JS for Register and Login form----------------------- */

// Since we're disabling the form when the user is authenticated
// Therefore the form is not presented in the dom
// So we don't to have errors by selecting elements contained in the form
try {
    focusOnForm = selectElement(".focus-on-form")
    closeForm = selectElement(".close-btn")
    popupForm = selectElement(".signup-or-login-form")
    linkToSignup = selectElement(".link-to-signup")
    linkToSignin = selectElement(".link-to-signin")
    signupBtn = selectElement("#signup-btn")
    loginbtn = selectElement("#login-btn")
    emailInput = selectElement("#email")
    confirmPasswordInput = selectElement('#password_confirmation')

    linkToSignup.addEventListener('click', () => {
        signupBtn.style.display='inline-block'
        loginbtn.style.display='none'
        linkToSignin.style.display='inline-block'
        linkToSignup.style.display='none'

        confirmPasswordInput.style.display='inline-block'
        emailInput.style.display = 'inline-block'

        confirmPasswordInput.setAttribute('required', '')
        emailInput.setAttribute('required', '')
    })

    linkToSignin.addEventListener('click', () => {
        signupBtn.style.display='none'
        loginbtn.style.display='inline-block'
        linkToSignin.style.display='none'
        linkToSignup.style.display='inline-block'

        confirmPasswordInput.style.display='none'
        email.style.display = 'none'

        confirmPasswordInput.removeAttribute('required')
        emailInput.removeAttribute('required')
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
}
catch {
    console.log('Form element is not presented in the dom.')

}

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
addToArray(Ullists);

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
            instagramShare.classList.toggle('show')
            twitterShare.classList.toggle('show')
            
        })
        twitterShare.addEventListener('click', () => {
            twitterShare.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedText)}`;
        })
    } else {
        popup.style.display = "none"
        
    }
}

// Update the popup position when the page is scrolled
window.addEventListener('scroll', showPopup);

// Update the popup position when the selection changes
document.addEventListener('selectionchange', () => {
    instagramShare.classList.remove('show')
    twitterShare.classList.remove('show')
});

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

// handling likes and dislikes with AJAX
let likeBtn = selectElement('#like-btn')
let dislikesBtn = selectElement('#dislikes-btn')
let likes = selectElement('.likes')
let dislikes = selectElement('.dislikes')

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