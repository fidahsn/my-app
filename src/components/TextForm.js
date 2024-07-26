import React, {useState} from 'react'

export default function TextForm(props) {
  const [text, setText] = useState('');
  //text="new text";//wrong way to change the state
  //setText("new text");//correct way to set the text 
  const handleUpClick = ()=>{
    //console.log("Uppercase was clicked");
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert("Converted to uppercase!", "success");
  }  
  const handleLoClick = ()=>{
    //console.log("LowerCase was clicked");
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert("Converted to lowercase!", "success");
  }  
  const handleClClick = ()=>{
    let newText = "";
    setText(newText)
  }

  const handleAlClick = ()=>{
    let c=0;
    let newText='';
    let array = text.split('');
    //console.log("LowerCase was clicked");
    for(let i =0;i<text.length;i++){
      if(c%2===0){
        newText = newText+(array[i]).toUpperCase();
      }
      else{
        newText = newText+(array[i]).toLowerCase();
      }
      c++;  
    }
    setText(newText)
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  const handleCyClick = () =>{
    var text = document.getElementById("myBox");
    text.select();//selects whole text
    navigator.clipboard.writeText(text.value);//use of navigator interface to copy text
  }

  const handleExtraSpaces = () =>{
    let newText = text.split(/[ ]+/);//use of regex funtion to remove one or more spaces and it forms array
    setText(newText.join(" "))
  }

  const handleOnChange = (event)=>{
    //console.log("On Change");
    setText(event.target.value);
  }  
 
  return (
    <>
    <div className="container" style={{color: props.mode==='dark'? 'white':'#042743'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} style={{backgroundColor: props.mode==='dark'? 'grey':'white', color: props.mode==='dark'? 'white':'#042743'}} onChange={handleOnChange} id="myBox" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Covert to Uppercase</button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>Covert to Lowercase</button>
        <button className="btn btn-primary mx-1" onClick={handleClClick}>Clear Text</button>
        <button className="btn btn-primary mx-1" onClick={handleAlClick}>Alternate Text</button>
        <button className="btn btn-primary mx-1" onClick={handleCyClick}>Copy Text</button>
        <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
    </div>
    <div className="container my-3" style={{color: props.mode==='dark'? 'white':'#042743'}}>
        <h2>Your text summary</h2>
        <p>{text.trim().split(/\s+/).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} Minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>

    </div>
    </>
  )
}
