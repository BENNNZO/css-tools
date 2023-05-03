import React, { useState, useEffect, useRef, useCallback } from 'react';

import TransparentTexture from '../assets/img/transparent.png'

import '../styles/ColorPicker.scss'

export default function ColorPicker() {
    const COLOR_PICKER_HEIGHT = 300
    const COLOR_PICKER_WIDTH = 500

    const colorRef = useRef()
    const [colorCurosrX, setColorCursorX] = useState(0)
    const [colorCurosrY, setColorCursorY] = useState(0)
    const [colorDrag, setColorDrag] = useState(false)
    const [color, setColor] = useState({ r: 255, g: 255, b: 255 })

    const hueRef = useRef()
    const [hueDrag, setHueDrag] = useState(false)
    const [hueY, setHueY] = useState(0)

    const alphaRef = useRef()
    const [alphaDrag, setAlphaDrag] = useState(false)
    const [alphaY, setAlphaY] = useState(100)


    function translate(oldVal, maxVal, transVal) {
        return ((oldVal / maxVal) * transVal)
    }

    function handleMouseMove(e) {
        if (colorDrag) {
            if (colorRef.current.offsetTop <= e.pageY && e.pageY < colorRef.current.offsetHeight + colorRef.current.offsetTop) {
                setColorCursorY(e.pageY - colorRef.current.offsetTop)
            } else if (colorRef.current.offsetTop > e.pageY) {
                setColorCursorY(0)
            } else if (colorRef.current.offsetHeight + colorRef.current.offsetTop < e.pageX) {
                setColorCursorY(colorRef.current.offsetHeight)
            }

            if (colorRef.current.offsetLeft < e.pageX && e.pageX < colorRef.current.offsetWidth + colorRef.current.offsetLeft) {
                setColorCursorX(e.pageX - colorRef.current.offsetLeft)
            } else if (colorRef.current.offsetLeft > e.pageX) {
                setColorCursorX(0)
            } else if (colorRef.current.offsetWidth + colorRef.current.offsetLeft < e.pageX) {
                setColorCursorX(colorRef.current.offsetWidth)
            }
            genColor(colorCurosrX, Math.abs(colorCurosrY - colorRef.current.offsetHeight), hueY * 3.6)
        }
        if (hueDrag) {
            if (hueRef.current.offsetTop < e.pageY && e.pageY < hueRef.current.offsetHeight + hueRef.current.offsetTop) {
                setHueY(translate(e.pageY - hueRef.current.offsetTop, COLOR_PICKER_HEIGHT, 100))
            } else if (hueRef.current.offsetTop > e.pageY) {
                setHueY(0)
            } else if (e.pageY > hueRef.current.offsetHeight + hueRef.current.offsetTop) {
                setHueY(100)
            }
            genColor(colorCurosrX, Math.abs(colorCurosrY - colorRef.current.offsetHeight), hueY * 3.6)
        }
        if (alphaDrag) {
            if (alphaRef.current.offsetTop < e.pageY && e.pageY < alphaRef.current.offsetHeight + alphaRef.current.offsetTop) {
                setAlphaY(translate(e.pageY - alphaRef.current.offsetTop, COLOR_PICKER_HEIGHT, 100))
            } else if (alphaRef.current.offsetTop > e.pageY) {
                setAlphaY(0)
            } else if (e.pageY > alphaRef.current.offsetHeight + alphaRef.current.offsetTop) {
                setAlphaY(100)
            }
            genColor(colorCurosrX, Math.abs(colorCurosrY - colorRef.current.offsetHeight), hueY * 3.6)
        }
    }

    function genColor(x, y, hue) {
        let M = 255 * Math.abs(translate(y, COLOR_PICKER_HEIGHT, 1))
        let m = M * (1 - Math.abs(translate(x, COLOR_PICKER_WIDTH, 1)))
        let z = (M - m) * (1 - Math.abs(((hue / 60) % 2) - 1))

        if (0 <= hue && hue < 60) {           // 1
            setColor({ r: Math.round(M), g: Math.round(z + m), b: Math.round(m) })
        } else if (60 <= hue && hue < 120) {  // 2
            setColor({ r: Math.round(z + m), g: Math.round(M), b: Math.round(m) })
        } else if (120 <= hue && hue < 180) { // 3
            setColor({ r: Math.round(m), g: Math.round(M), b: Math.round(z + m) })
        } else if (180 <= hue && hue < 240) { // 4
            setColor({ r: Math.round(m), g: Math.round(z + m), b: Math.round(M) })
        } else if (240 <= hue && hue < 300) { // 5
            setColor({ r: Math.round(z + m), g: Math.round(m), b: Math.round(M) })
        } else if (300 <= hue && hue < 366) { // 6
            setColor({ r: Math.round(M), g: Math.round(m), b: Math.round(z + m) })
        } else {
            throw new Error('cant generate values for the changeColor function');
        }
    }

    const handleMouseDownColor = useCallback(() => {
        console.log('color')
        setColorDrag(true)
        setHueDrag(false)
        setAlphaDrag(false)
        document.addEventListener('mouseup', () => setColorDrag(false), { once: true })
    }, []);

    const handleMouseDownHue = useCallback(() => {
        setHueDrag(true)
        setColorDrag(false)
        setAlphaDrag(false)
        document.addEventListener('mouseup', () => setHueDrag(false), { once: true })
    }, []);

    const handleMouseDownAlpha = useCallback(() => {
        setAlphaDrag(true)
        setColorDrag(false)
        setHueDrag(false)
        document.addEventListener('mouseup', () => setAlphaDrag(false), { once: true })
    }, []);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b, a) {
        if (componentToHex(a) === '64') {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        } else {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
        }
    }

    return (
        <section className='wrapper-color-picker' onMouseMove={handleMouseMove}>
            <div className='color-sample'>
                <span className='color-swatch-background' />
                <span className='color-swatch' style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.round(alphaY) / 100})` }} />
            </div>
            <div className="color" ref={colorRef} onMouseDown={handleMouseDownColor} style={{ width: `${COLOR_PICKER_WIDTH}px`, height: `${COLOR_PICKER_HEIGHT}px` }}>
                <span className='gradient-1' style={{ backgroundImage: `linear-gradient(to left, hsl(${hueY * 3.6}, 100%, 50%), white)` }} />
                <span className='gradient-2' />
                <span className='cursor' style={{ transform: `translate(calc(${colorCurosrX}px - 50%), calc(${colorCurosrY}px - 50%))`, backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }} />
            </div>
            <div className="hue" ref={hueRef} onMouseDown={handleMouseDownHue}>
                <span className='hue-gradient' />
                <span className='cursor' style={{ top: `${hueY}%`, backgroundColor: `hsl(${hueY * 3.6}, 100%, 50%)` }} />
            </div>
            <div className="alpha" ref={alphaRef} onMouseDown={handleMouseDownAlpha}>
                <span className='alpha-background' style={{ backgroundImage: `url(${TransparentTexture})` }} />
                <span className='alpha-gradient' style={{ backgroundImage: `linear-gradient(to top, rgb(${color.r}, ${color.g}, ${color.b}), transparent)` }} />
                <span className='cursor' style={{ top: `${alphaY}%`, backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }} />
            </div>
            <div>
                <p className='copy-title'>Click to Copy</p>
                <p
                    onClick={() => navigator.clipboard.writeText(`rgb(${color.r}, ${color.g}, ${color.b}, ${Math.round(alphaY) / 100});`)}
                    className='copy'
                >
                    rgb({color.r}, {color.g}, {color.b}{(Math.round(alphaY) / 100 === 1) ? '' : `, ${Math.round(alphaY) / 100}`});
                </p>
                <p
                    onClick={() => navigator.clipboard.writeText(`${rgbToHex(color.r, color.g, color.b, Math.round(alphaY))};`)}
                    className='copy'
                >
                    {rgbToHex(color.r, color.g, color.b, Math.round(alphaY))};
                </p>
            </div>
        </section>
    )
}