
const ctx = canvas.getContext('2d');
var cPushArray = new Array();
var cStep = 0;

window.addEventListener("load", () =>{
    const canvas = document.querySelector("#canvas");
    ctx.lineWidth = 5;
    
});

drawRect = () => {
    ctx.strokeRect(100, 100, 250, 150);
}

drawPoly = () => {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(250, 100);
    ctx.lineTo(300, 225);
    ctx.lineTo(250, 350);
    ctx.lineTo(100, 350);
    ctx.lineTo(50, 225)
    ctx.closePath();
    ctx.stroke();
}

drawSq = () => {
    ctx.beginPath();
    ctx.strokeRect(150, 150, 150, 150);
}

drawline = () => {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
}

drawtriangle = () => {
    ctx.beginPath();
    ctx.moveTo(200, 375);
    ctx.lineTo(300, 125);
    ctx.lineTo(450, 375);
    ctx.closePath();
    ctx.stroke();
}

drawcircle = () => {
    ctx.beginPath();
    ctx.arc(250, 250, 100, 0, Math.PI * 2, true);
    ctx.stroke();
}
    
drawellipse = () => {
    ctx.beginPath();
    ctx.ellipse(250, 250, 50, 100, Math.PI / 2, 0, 2 * Math.PI);
    ctx.stroke();
}

drawarc = () => {
    ctx.beginPath();
    ctx.moveTo(75, 350)
    ctx.bezierCurveTo(100, 250, 150, 200, 300, 150);
    ctx.stroke();
}

clearcanvas = () => {
    const input = confirm("Are you sure you want to clear the board ?")
    if (input == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

mark = () => {
    let painting = false;

    startPosition = (e) => {
        painting = true;
        draw(e);
    }

    finishedPosition = () => {
        
        painting = false;
        ctx.beginPath();
    }

    draw = (e) => {
        
        if(!painting) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY)
        cPush()
        
        
    }
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener("mousemove", draw)
}



	
cPush = () => {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('canvas').toDataURL());
}

cUndo = () => {
    console.log('run');
    if (cStep >= 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

cRedo = () => {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

savecan = (e) => {
    link = document.getElementById("saveas")
    link.setAttribute('download', 'MintyPaper.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}
