

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./App.css";
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [openModel, setOpenModal] = useState(false);
  const sigCanvas = useRef();
  const [penColor, setPenColor] = useState('#000000');
  const colors = ["#000000", "#00FF00", "#FF0000"];
  const [imageURL, setImageURL] = useState(null);

  
  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    setOpenModal(false);
  };

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL(null);
  };

  const download = () => {
    const dlink = document.createElement("a");
    dlink.setAttribute("href", imageURL);
    dlink.setAttribute("download", "signature.png");
    dlink.click();
  };

  return (
    <>
    <div className="app">
      <Button onClick={() => setOpenModal(true)}>Create Signature</Button>
      <br />

      {openModel && (

        <div className="modalContainer">
          <div className="modal">
            <div className="modal__bottom">
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="sigPadContainer">
        <SignatureCanvas
          penColor={penColor}
          canvasProps={{ className: "sigCanvas" }}
          ref={sigCanvas}
        />
      </div>

      <hr />

      <Button  variant="outlined" color="error" onClick={clear}>Clear</Button>

      <div className="sigPad__penColors">
        <p>Pen Color:</p>
        <input
          type="color"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
        />
        {colors.map((color) => (
          <span
            key={color}
            style={{
              backgroundColor: color,
              border: `${color === penColor ? `2px solid ${color}` : ""}`,
            }}
            onClick={() => setPenColor(color)}
          ></span>
        ))}
      </div>


      <Button variant="contained" disableElevation className="create" onClick={create}>
      Create
      </Button>
      <br />
      {imageURL && (
        <>
          <img src={imageURL} alt="signature" className="signature" />
        </>
      )}

      <Button variant="contained" color="success"   onClick={download} style={{ padding: '5px', marginTop: '5px' }}>
        Download
      </Button>
    </div>

    </>

    
    
  );
}

export default App;
