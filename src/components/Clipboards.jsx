import React, { useState } from 'react';

import ClipboardIcon from '../assets/svg/clipboard-outline.svg'
import CheckIcon from '../assets/svg/checkmark-outline.svg'

import '../styles/Clipboards.scss'

export default function Clipboards() {

    const [clipboards, setClipboards] = useState([
        {
            title: 'CSS Index',
            clipped: false,
            text: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, p, a, li {
    font-family: 'Inter', sans-serif;
}

pre {
    font-family: 'Source Code Pro', monospace;
}

ol,
ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}

button {
    border: none;
}

html {
    background-color: rgb(40, 40, 40);
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: #949494 rgb(40, 40, 40);
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 20px;
}

*::-webkit-scrollbar-track {
    background: rgb(40, 40, 40);
}

*::-webkit-scrollbar-thumb {
    background-color: #949494;
    border-radius: 20px;
    border: 5px solid rgb(40, 40, 40);
}
`

        },
        {
            title: 'Quick Git Push',
            clipped: false,
            text: `git add -A
git commit -am.
git push origin main
`
        },
        {
            title: 'Quick Git Deploy',
            clipped: false,
            text: `git subtree push --prefix dist origin gh-pages
`
        }
    ])

    function handleClip(i) {
        setClipboards(oldArr => {
            let newArr = [...oldArr]
            newArr[i].clipped = true
            return newArr
        })
        console.log(clipboards)
        setTimeout(() => {
            console.log(clipboards)
            setClipboards(oldArr => {
                let newArr = [...oldArr]
                newArr[i].clipped = false
                return newArr
            })
            console.log(clipboards)
        }, 3000)
        navigator.clipboard.writeText(clipboards[i].text)
    }


    return (
        <section className='wrapper-clipboards'>
            {clipboards.map((e, i) => {
                return (
                    <div className="clipboard">
                        <div className="header">
                            <h2>{e.title}</h2>
                            <img src={`${e.clipped ? CheckIcon : ClipboardIcon}`} alt="copy snipped of code" onClick={() => handleClip(i)}/>
                        </div>
                        <div className='pre'>
                            <pre>{e.text}</pre>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}