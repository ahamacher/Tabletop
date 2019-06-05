// canvas grid: https://medium.com/@xon5/flexible-canvas-grid-without-blurred-lines-907fcadf5bfc

import React from 'react';
import GridContainer from './grid_container';

class GameCanvas extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.drawGrid(canvas, ctx);
    }

    drawGrid(canvas, ctx) {
        let s = 36
        let nX = Math.floor(canvas.width / s) - 2
        let nY = Math.floor(canvas.height / s) - 2
        let pX = canvas.width - nX * s
        let pY = canvas.height - nY * s
        let pL = Math.ceil(pX / 2) - 0.5
        let pT = Math.ceil(pY / 2) - 0.5
        let pR = canvas.width - nX * s - pL
        let pB = canvas.height - nY * s - pT

        ctx.strokeStyle = 'lightgrey'
        ctx.beginPath()
        for (var x = pL; x <= canvas.width - pR; x += s) {
            ctx.moveTo(x, pT)
            ctx.lineTo(x, canvas.height - pB)
        }
        for (var y = pT; y <= canvas.height - pB; y += s) {
            ctx.moveTo(pL, y)
            ctx.lineTo(canvas.width - pR, y)
        }
        ctx.stroke()
    }

    render() {
        return (
            <div style={{position: "relative", height: "900px", width: "900px"}}>
                <canvas ref="canvas" height="900" width="900">
                </canvas>
                <GridContainer messageDisplay={this.props.messageDisplay} />
            </div>

        );
    }
}

export default GameCanvas;