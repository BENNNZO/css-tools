import React from 'react';

import ClipboardIcon from '../assets/svg/clipboard-outline.svg'

import '../styles/Clipboards.scss'

export default function Clipboards() {
    const clipboards = [
        {
            title: 'CSS Index',
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

ol, ul, li {
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
`
        },
        {
            title: 'Quick Git Push',
            text: `git add -A
git commit -am.
git push origin main
 `
        },
        {
            title: 'Quick Git Deploy',
            text: `git subtree push --prefix dist origin gh-pages
 `
        }
    ]


    return (
        <section className='wrapper-clipboards'>
            {clipboards.map(e => {
                return (
                    <div className="clipboard">
                        <div className="header">
                            <h2>{e.title}</h2>
                            <img src={ClipboardIcon} alt="copy snipped of code" onClick={() => navigator.clipboard.writeText(e.text)}/>
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