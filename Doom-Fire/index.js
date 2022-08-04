const FirePixelsArray=[]
const Firewidth=40
const FireHeight=40

const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]



function start(){
createFireDataStructure()
createFireSource()
renderFire()

setInterval(calculateFirePropagation,0.1)

}

function createFireDataStructure(){
const numberOfpixels= Firewidth*FireHeight 
for(let i=0;i<numberOfpixels;i++){
    FirePixelsArray[i]=0
}


}

 function renderFire(){

    let html= '<table cellpadding=0 cellspacing=0>'
    for(let row=0;row<FireHeight;row++){
        html+='<tr>'
for(let column=0;column<Firewidth;column++){
    const pixelIndex= column +(Firewidth*row)
    const FireIntensity=FirePixelsArray[pixelIndex]

    debug=false
if(debug===true){

    html+='<td>'
    html+=`<div class="pixel-index">${pixelIndex}</div>`
    html+=FireIntensity
    html+='</td>'
}
else{
const color=fireColorsPalette[FireIntensity]
    const colorString= `${color.r},${color.g},${color.b}`
    html+=`<td class="pixel" style=" background-color:rgba(${colorString}")>`
    html+='</td>'}

}

        html+='</tr>'
    }
html+='</table>'

document.querySelector('#Firecanvas').innerHTML=html
 }

function createFireSource(){
for( let column=0;column<=Firewidth;column++){
const overFlowPixelIndex=FireHeight*Firewidth
const pixelIndex= (overFlowPixelIndex-Firewidth)+column
FirePixelsArray[pixelIndex]=36
}

}

function calculateFirePropagation(){

    for(let column=0;column<Firewidth;column++){
        for(let row=0;row<FireHeight;row++){
            const pixelIndex=column+(Firewidth*row)
            updateFireIntesityPerPixel(pixelIndex)
        }
    }
    renderFire() 
}

function updateFireIntesityPerPixel(currentPixelIndex){

    const belowPixelIndex= currentPixelIndex+ Firewidth

    if(belowPixelIndex>= FireHeight* Firewidth){
        return
    }
const decay=Math.floor(Math.random()*3)
const belowPixelFireIntesity= FirePixelsArray[belowPixelIndex]
const newFireIntesity= belowPixelFireIntesity-decay >= 0 ? belowPixelFireIntesity-decay : 0

FirePixelsArray[currentPixelIndex+decay]= newFireIntesity

}

 start()