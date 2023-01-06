import { SetStateAction } from "react";

export default async (setPhotos:Function, setPhoto:Function, setLoading:Function ) => {

    setPhoto("")
    setLoading(true)
    let temp: string[] = []
  
    let i = 4;
    while (i){
      let res = await fetch("https://source.unsplash.com/random/300x300");
      temp.push(res.url);
      console.log(res.url)
      i--
    }
    setLoading(false)
    setPhotos(temp)
    // setPhotos([one, two, three, four]);
}