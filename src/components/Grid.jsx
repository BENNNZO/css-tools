import React, { useState } from 'react';

export default function Grid() {
    const HEIGHT = 20
    const WIDTH = 20
    const TILE_SIZE = 25

    const [tileArray, setTileArray] = useState([])

    function generateGrid(e) {
        e.preventDefault()
        console.log('generating')
        setTileArray([])
        for (let i = 0; i < HEIGHT ; i++) {
            let row = []
            for (let j = 0; j < WIDTH; j++) {
                row.push(j)
            }
            setTileArray(old => {
                old.push(row)
                return old
            })
        }
        console.log(tileArray)
    }

    function translate(oldVal, maxVal, transVal) {
        return ((oldVal / maxVal) * transVal)
    }

    function genColor(x, y) {
        // let tx = Math.abs(translate(x, WIDTH, 100))
        // let ty = Math.abs(translate(y, HEIGHT, 100))
        // let h = 0
        // let s = (tx > ty) ? tx : ty
        // let l = translate(y, HEIGHT, (Math.abs(translate(x, WIDTH, 50) - 100)))
        // let a = 1
        // return `hsl(${h}, ${s}%, ${l}%)`


        // let s = Math.abs(translate(x, WIDTH, 100))
        // let v = Math.abs(translate(y, HEIGHT, 100))
        // let h = 0
        // let a = 1
        // return `hsl(${h}, ${s}%, ${v}%)`


        let h = 0
        let s = Math.abs(translate(x, WIDTH, 1))
        let v = Math.abs(translate(y, HEIGHT, 1))
        let M = 255 * v
        let m = M * (1 - s)
        let z = (M - m) * (1 - Math.abs(((h / 60) % 2) - 1))
        let a = 1
        return `rgb(${M}, ${z + m}, ${m})`
    }

    return (
        <>
            <section className='wrapper-grid' style={{ height: `${HEIGHT * TILE_SIZE}px`, width: `${WIDTH * TILE_SIZE}px`, backgroundColor: 'rgb(240, 240, 240)', display: 'flex', flexDirection: 'column', transform: 'rotate(-90deg' }}>
                {tileArray.map((e1, i1) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {e1.map((e2, i2) => {
                                return (
                                    <span style={{ backgroundColor: genColor(i1, i2), width: `${TILE_SIZE}px`, aspectRatio: 1, display: 'inline-block' }}/>
                                )
                            })}
                        </div>
                    )
                })}
            </section>
            <button onClick={generateGrid} style={{ height: '50px', padding: '10px 20px', cursor: 'pointer', border: '1px solid grey', margin: '10px' }}>Generate Grid</button>
        </>
    )
}