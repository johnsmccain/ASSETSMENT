import { useState } from 'react';
import domtoimage from "dom-to-image";
import './app.scss';
import one from "./assets/one.jpg";
import two from "./assets/two.jpg";
import three from "./assets/three.jpg";
import four from "./assets/four.jpg";
 
interface GenericFunction {
  (): Promise<void>
}

function App() {

  const [photos, setPhotos] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>();
  const [name, setName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const generatePhotos: GenericFunction = async () => {

    setPhoto("")
    setLoading(true)
    let temp: string[] = []
  
    let i:number = 4;
    while (i){
      let res = await fetch("https://source.unsplash.com/random/300x300");
      temp.push(res.url);
      // console.log(res.url)
      i--
    }
    setPhotos(temp)
    // setPhotos([one, two, three, four])
    setLoading(false)
    return
  }

  const savePhoto: GenericFunction = async () => {
    const preview:any = document.querySelector(".preview")
    domtoimage.toJpeg(preview, { quality: 0.95 })
    .then(function (dataUrl) {
      var a: HTMLAnchorElement = document.createElement('a');
      a.download = `${name}-${Date.now()}`;
      a.href = dataUrl;
      a.click();
    });

  }
  return (
    <div className="App">
      <div className="wrapper">
        <div className={`${loading ? "overlay" : "hide" }`}>
          <div className="overlay-spinner"></div>
        </div>
        <div className="wrapper-box">
            {
              photo? 
                <div className="preview">
                  <div className="preview-text">
                    <p className="top text">Thank You</p>
                    <p className="bottom text">{name}</p>
                  </div>
                  <img className='preview-img' src={photo} alt="gift card" />
                </div>
              : photos.length > 0 ? 
                <div className='images'>
                  {photos.map((img, i) => (
                    <img key={i} onClick={() => setPhoto(img)} src={img} alt="random"/>)
                  )}
                </div>
              : 
                <>
                  <p className='text init'>
                    {
                      loading ? "Loading..."
                      : "Oops, click to generate new photos"
                    }
                  </p>
                  <button 
                    onClick={generatePhotos}
                    disabled={loading}
                  >
                    {
                      !loading ? "Generate" : "Please Wait"
                    }
                  </button>
                </>
            } 
        </div>
        { photo && 
          <div className="row">
            <button 
              onClick={generatePhotos} 
              className="col reset btn"
            >
              Reset
            </button>
            <input 
              type="text" 
              className="caption col" 
              maxLength={12}
              placeholder='Name here...' 
              onChange={(e)=> setName(e.target.value)}
            />
            <button 
              onClick={savePhoto} 
              className='download btn col'
            >
              download
            </button>
          </div>
        }
    </div>
    <footer>
      <a 
        className='footer link' 
        href="https://github.com/johnsmccain/ASSETSMENT" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Source Code
      </a>
    </footer>
  </div>
)}
export default App
