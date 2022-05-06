import React, { useState } from 'react'
import { Snackbar, IconButton, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import './Calculator.scss'

const Calculator = () => {
    const [calc, setCalc] = useState("")
    const [result, setResult] = useState("")
    const [finalCalc, setFinalCalc] = useState({ cal: '', res: '' })
    const [errorMsg, setErrorMsg] = useState('')
    const [open, setOpen] = useState(false);
    const operator = ["+", "-", "*", "/", ".", "%"]

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    }

    const updateCalc = (oprs) => {
        if ((operator.includes(oprs) && calc === '') || (operator.includes(oprs) && operator.includes(calc.slice(-1)))) {
            setErrorMsg('Cannot Add Operator')
            handleClick()
            return;
        }
        setCalc(calc + oprs)

        if (oprs === '%') {
            if (operator.includes(calc.slice(-1))) {
                setErrorMsg('Cannot Add Operator')
                handleClick()
            } else {
                let temp = { op: '', inx: 0 }
                operator.forEach(opr => {
                    if (calc.lastIndexOf(opr) > temp.inx) {
                        temp.op = opr
                        temp.inx = calc.lastIndexOf(opr)
                    }
                })
                const evalString = eval(calc.substring(0, temp.inx))
                const finalString = eval(evalString + temp.op + (evalString * (calc.substring(temp.inx + 1) / 100)))
                setResult(finalString)
                setFinalCalc({ cal: calc, res: finalString })
            }
        }
    }

    const calcResult = () => {
        if (calc === '')
            return;

        if (!operator.includes(calc.slice(-1))) {
            setResult(eval(calc).toString())
            setFinalCalc({ cal: calc, res: eval(calc).toString() })
        } else {
            setErrorMsg('Invalid Expression')
            handleClick()
        }
    }

    const clearCalc = () => {
        setCalc("")
        setResult("")
    }

    const toggleValueSign = () => {
        if (calc === '')
            return;

        if (calc.slice(0, 1) === '-')
            setCalc(calc.slice(1))
        else
            setCalc('-' + calc)
    }


    return (
        <div className="calculator__component">
            <div className="calculator__body">
                <div className="upper__body">
                    <div className="display__box">
                        <div>{finalCalc.cal || ''}</div>
                        <div>{finalCalc.res || ''}</div>
                        <div className="onnum-enter">{calc || '0'}</div>
                        <div className="final-res">{result || '0'}</div>
                    </div>
                </div>
                <div className="lower__body">
                    <div className="button__container">
                        <button onClick={() => clearCalc()} className="clear__all">C</button>
                        <button onClick={() => toggleValueSign()} className="excep-signs"><sup>+</sup>/<sub>-</sub></button>
                        <button onClick={() => updateCalc('%')} className="excep-signs">%</button>
                        <button onClick={() => updateCalc('/')} className="operators">÷</button>
                    </div>
                    <div className="button__container">
                        <button onClick={() => updateCalc('7')} className="numeric-values">7</button>
                        <button onClick={() => updateCalc('8')} className="numeric-values">8</button>
                        <button onClick={() => updateCalc('9')} className="numeric-values">9</button>
                        <button onClick={() => updateCalc('*')} className="operators">×</button>
                    </div>
                    <div className="button__container">
                        <button onClick={() => updateCalc('4')} className="numeric-values">4</button>
                        <button onClick={() => updateCalc('5')} className="numeric-values">5</button>
                        <button onClick={() => updateCalc('6')} className="numeric-values">6</button>
                        <button onClick={() => updateCalc('-')} className="operators">-</button>
                    </div>
                    <div className="button__container">
                        <button onClick={() => updateCalc('1')} className="numeric-values">1</button>
                        <button onClick={() => updateCalc('2')} className="numeric-values">2</button>
                        <button onClick={() => updateCalc('3')} className="numeric-values">3</button>
                        <button onClick={() => updateCalc('+')} className="operators">+</button>
                    </div>
                    <div className="button__container">
                        <button onClick={() => updateCalc('0')} className='numeric-values div1'>0</button>
                        <button onClick={() => updateCalc('.')} className="numeric-values">.</button>
                        <button onClick={() => calcResult()} className="equals-operator">=</button>
                    </div>
                    <div className="button__container"></div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert severity='error' onClick={handleClose}>
                    <Typography variant='subtitle2'>{errorMsg}</Typography>
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Calculator